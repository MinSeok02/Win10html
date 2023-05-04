let stup = document.resource.StartUp; 

stup.addGroup('HTML/CSS');
stup.addStupBtn();
stup.addStupBtn();
stup.addStupBtn();
stup.addStupBtn();
stup.addStupBtn();
stup.addStupBtn();

stup.addList('#');
stup.addList('123');
stup.addList('456');

let desk = document.resource.DeskTop;

for( var j = 1; j<= 1 ; j++) {
  for( var i = 1; i<= 8; i++) {
    desk.addIcon(j, i, 'ICON', '../img/edge.png');
  }
}

desk.addIcon(5, 5, '시발', '../img/edge.png');


let task = document.resource.TaskBar;


task.addTask(); 
