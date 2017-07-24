//
// Parinfer for CodeMirror 1.0.0
//
// Copyright 2017 © Shaun Lebron
// MIT License
//

//------------------------------------------------------------------------------
// JS Module Boilerplate
//------------------------------------------------------------------------------

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
  else {
    root.parinferCodeMirror = factory();
  }
}(this, function() { // start module anonymous scope
"use strict";

//------------------------------------------------------------------------------
// Main
//------------------------------------------------------------------------------

function activate(cm) {
  var cursorTimeout;
  var monitorCursor = true;

  var prevCursorX;
  var prevCursorLine;

  function convertChanges(changes) {
    return changes.map(function(change) {
      return {
        x: change.from.ch,
        lineNo: change.from.line,
        oldText: change.removed.join('\n'),
        newText: change.text.join('\n')
      };
    });
  }

  var errorClassName = 'parinfer-error';
  function clearErrorMarks() {
    var i;
    var marks = cm.getAllMarks();
    for (i=0; i<marks.length; i++) {
      if (marks[i].className === errorClassName) {
        marks[i].clear();
      }
    }
  }

  function addErrorMark(lineNo, x) {
    var from = {line: lineNo, ch: x};
    var to = {line: lineNo, ch: x+1};
    cm.markText(from, to, {className: errorClassName});
  }

  function updateError(error) {
    clearErrorMarks();
    if (error) {
      addErrorMark(error.lineNo, error.x);
      if (error.extra) {
        addErrorMark(error.extra.lineNo, error.extra.x);
      }
    }
  }

  function fixText(changes) {
    // if (changes) {
    //   console.log('processing after change');
    // } else {
    //   console.log('processing after cursor movement');
    // }

    var text = cm.getValue();
    var hasSelection = cm.somethingSelected();
    var selections = cm.listSelections();
    var cursor = cm.getCursor();
    var scroller = cm.getScrollerElement();

    var options = {
      cursorLine: cursor.line,
      cursorX: cursor.ch,
      prevCursorLine: prevCursorLine,
      prevCursorX: prevCursorX
    };
    if (changes) {
      options.changes = convertChanges(changes);
    }
    var result = parinfer.smartMode(text, options);
    updateError(result.error);
    if (text === result.text) {
      return;
    }
    cm.setValue(result.text);

    monitorCursor = false;
    if (hasSelection) {
      cm.setSelections(selections);
    } else {
      cm.setCursor(result.cursorLine, result.cursorX);
    }
    setTimeout(function(){ monitorCursor = true; }, 0);

    cm.scrollTo(scroller.scrollLeft, scroller.scrollTop);

    prevCursorLine = result.cursorLine;
    prevCursorX = result.cursorX;
  }

  cm.on('cursorActivity', function(cm) {
    clearTimeout(cursorTimeout);
    if (monitorCursor) {
      cursorTimeout = setTimeout(function () { fixText(); }, 0);
    }
  });
  cm.on('changes', function(cm, changes) {
    if (changes[0].origin !== 'setValue') {
      clearTimeout(cursorTimeout);
      fixText(changes);
    }
  });
}

var API = {
  version: "1.0.0",
  activate: activate
};

return API;

})); // end module anonymous scope
