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
    desk.addIcon({x:j, y:i, name:'ICON', img_src:'./img/edge.png', src:"http://n4082n.dothome.co.kr"});
  }
}


let task = document.resource.TaskBar;


task.addTask(); 
