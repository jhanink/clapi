var data = [
  {author: "Pete Hunt", text: "This is one comment", key:0},
  {author: "Jordan Walke", text: "This is *another* comment", key:1},
  {author: "Maker Bots", text: "Comment 3", key:3}
];

React.render(
    <IndexComponent name="Clapi" data={data}/>, document.getElementById("container-main")
);

