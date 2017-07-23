
function activate(cm) {
  var cursorTimeout;
  var monitorCursor = true;

  function fixText(cm, changes) {
    if (changes) {
      console.log('processing after change');
    } else {
      console.log('processing after cursor movement');
    }

    var text = cm.getValue();
    var hasSelection = cm.somethingSelected();
    var selections = cm.listSelections();
    var cursor = cm.getCursor();
    var scroller = cm.getScrollerElement();

    var options = {
      cursorLine: cursor.line,
      cursorX: cursor.ch,
      // prevCursorLine:
      // prevCursorX:
      // changes: convertChanges(changes),
    };
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
    monitorCursor = true;

    cm.scrollTo(scroller.scrollLeft, scroller.scrollTop);
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
