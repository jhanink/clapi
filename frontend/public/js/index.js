require.config({
  paths: {
    "react": "../lib/react",
    "JSXTransformer": "../lib/JSXTransformer",
    "jsx": ""
  }
});

require(["react", "JSXTransformer"], function (React) {

  React.renderComponent(<IndexComponent name="Clapi" />, document.getElementById("container-main"))

});