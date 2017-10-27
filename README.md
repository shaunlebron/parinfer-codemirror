<img align="right" src="http://codemirror.net/doc/logo.png">

# Parinfer for CodeMirror

A [Parinfer] layer for the browser-based [CodeMirror] editor.

_used by Parinfer's official [demo editor] and [website] to demonstrate
canonical plugin behavior_

<img width="340" src="https://user-images.githubusercontent.com/116838/28585541-1dd63352-7136-11e7-96a9-077e6e9a0699.gif">

[demo editor]:http://shaunlebron.github.io/parinfer/demo
[website]:http://shaunlebron.github.io/parinfer/

## Demo

Run `npm install` and open [demo.html] for working example.

## Usage

Attach Parinfer to a CodeMirror instance:

```js
parinferCodeMirror.init(cm);
```

__NOTE__: To ensure your code structure is preserved when enabling Parinfer, the
editor will be suspended in a "correction" mode (i.e. Paren Mode) if the editor
has unbalanced code. Once the highlighted errors are fixed, the editor resumes
the originally intended mode as expected.

## Styling

Style the following class names.  Those from [demo.html] shown below:

- `.parinfer-error` - erroneous characters (unbalanced quotes or parens)

  <img width="280" alt="parinfercm-error" src="https://user-images.githubusercontent.com/116838/28577098-6e92f674-711b-11e7-8abd-5797841fe542.png">

- `.parinfer-paren-trail` - parens at end of a line (dim to subtly show they are inferred)

  <img width="584" alt="parinfercm-paren-trail" src="https://user-images.githubusercontent.com/116838/28577699-1c031798-711d-11e7-9500-dfaa283afadd.png">


## API

```js
parinferCodeMirror.init(cm, mode, options);
// `mode` is 'paren', 'indent', or 'smart'
// `options` is passed to Parinfer

parinferCodeMirror.disable(cm); // disable Parinfer's effects on the editor
parinferCodeMirror.enable(cm);  // re-enable after disabling

parinferCodeMirror.setMode(cm, mode);
parinferCodeMirror.setOptions(cm, options);
```

The only [Parinfer options] you should pass is `{forceBalance: true}`, but only
if you want aggressively-balanced parens.  It is off by default since some
edge-cases make this undesirable.  When turned off, unmatched parens that
cannot be safely resolved are highlighted rather than removed.

[Parinfer options]:https://github.com/shaunlebron/parinfer/tree/master/lib#api

All of the API functions above will __return a boolean__ indicating if the text was
successfully processed without errors.

## History

The original implementation used for the [Parinfer] website was rushed for the
sake of proving the idea in an animated way.  This standalone version simplifies
the implementation, removes the custom internal hacks, and improves the
integration required by new Parinfer features.

[Parinfer]:http://shaunlebron.github.io/parinfer/
[CodeMirror]:http://codemirror.net/
[demo.html]:demo.html
