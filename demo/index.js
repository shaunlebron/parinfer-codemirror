
var cm = CodeMirror(document.body);

cm.setValue(`
(defn foo
  "hello, this is a docstring"
  [a b]
  (let [sum (+ a b)
        prod (* a b)]
     {:sum sum
      :prod prod}))
`);

activate(cm);
