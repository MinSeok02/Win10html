let stup = document.resource.StartUp; 

stup.addGroup('HTML/CSS');
stup.addStupBtn();
stup.addStupBtn();
stup.addStupBtn();
stup.addStupBtn();
stup.addStupBtn();
stup.addStupBtn();

for(var i = 0; i < 5; i++) {
  stup.addList();
}

let desk = document.resource.DeskTop;

for( var j = 1; j<= 1 ; j++) {
  for( var i = 1; i<= 8; i++) {
    desk.addIcon(j, i, 'ICON', '../img/edge.png');
  }
}