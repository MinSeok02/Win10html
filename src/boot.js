let stup = document.resource.StartUp; 

stup.addGroup();
stup.addStupBtn();
stup.addStupBtn();
stup.addStupBtn();

for(var i = 0; i < 5; i++) {
  stup.addList();
}

let desk = document.resource.DeskTop;


for( var i = 1; i<= 7; i++) {
  desk.addIcon(1, i, 'ICON', '../img/edge.png');
}
desk.addIcon(2, 1, 'ICON', '../img/edge.png');