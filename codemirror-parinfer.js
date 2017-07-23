
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

  function fixText(cm, changes) {
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
      cursorTimeout = setTimeout(function () { fixText(cm); }, 0);
    }
  });
  cm.on('changes', function(cm, changes) {
    if (changes[0].origin !== 'setValue') {
      clearTimeout(cursorTimeout);
      fixText(cm, changes);
    }
  });
}
