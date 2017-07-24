> __NOTE__ work in progress

# Parinfer for CodeMirror

A [Parinfer] layer for the browser-based [CodeMirror] editor.

It is intended to be the canonical editor for demonstrating the behavior of
Parinfer in its official online [demo editor]. (It is currently not using this
implementation yet)

[demo editor]:http://shaunlebron.github.io/parinfer/demo

## Usage

Attach Parinfer to a CodeMirror instance.  See [demo.html] for working example.

[demo.html]:demo.html

```js
parinferCodeMirror.init(cm);
```

__NOTE__: If the CodeMirror editor has unbalanced code when running `init`, the
editor will be suspended in a "correction" mode (i.e. Paren Mode) until the
highlighted errors are fixed—after which the editor enters the originally
intended mode as expected.

## API

```js
parinferCodeMirror.init(cm, mode, options);
// `mode` is 'paren', 'indent', or 'smart'
// `options` is passed to Parinfer

parinferCodeMirror.enable(cm);
parinferCodeMirror.disable(cm);
parinferCodeMirror.setMode(cm, mode);
parinferCodeMirror.setOptions(cm, options);
```

All of the API functions above will return a boolean indicating if the text was
successfully processed without errors. (`disable` not included)

## History

The original implementation used for the [Parinfer] website was rushed for the
sake of proving the idea in an animated way.  This standalone version simplifies
the implementation, removes the custom internal hacks, and improves the
integration required by new Parinfer features.

[Parinfer]:http://shaunlebron.github.io/parinfer/
[CodeMirror]:http://codemirror.net/
