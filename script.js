var comment = [
  { name: "Juhan Oks", date: "29 Nov, 2022", body: "1st comment" },
];

for (var i = 0; i < comment.length; i++) {
  var html =
    "<div class='commentBox'><div class='leftPanelImg'><img src='https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?cs=srgb&dl=pexels-pixabay-262508.jpg&fm=jpg'>";
  $("#container").append(html);
}
