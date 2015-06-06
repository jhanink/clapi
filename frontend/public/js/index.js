var data = [
  {author: "Pete Hunt", text: "This is one comment", key:0},
  {author: "Jordan Walke", text: "This is *another* comment", key:1}
];

React.render(
    <IndexComponent name="Clapi" data={data}/>, document.getElementById("container-main")
);
