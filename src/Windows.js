import { taskbar } from './task.js'; 
import { startup } from './stup.js'; 
import { desktop } from './desk.js'; 

let Wind = C('div', { id: 'Windows10' }); 

customElements.define('task-bar', taskbar);
customElements.define('start-up', startup);
customElements.define('desk-top', desktop);

document.resource = {
  taskbar : C('task-bar'),
  startup : C('start-up'),
  desktop : C('desk-top')
}

for(let elem in document.resource) {
  Wind.appendChild(document.resource[elem]);
}

A(document.body, [ Wind ]);

// function createWindow(src) {
//     let win = C('window-class');
//     win.register(src); 
//     document.resource.Windows.appendChild(win);
// }

/**********************************************************/

// let stup = document.resource.StartUp; 

// stup.addGroup('HTML/CSS');
// stup.addStupBtn();
// stup.addStupBtn();
// stup.addStupBtn();
// stup.addStupBtn();
// stup.addStupBtn();
// stup.addStupBtn();

// stup.addList('#');
// stup.addList('123');
// stup.addList('456');

// let desk = document.resource.DeskTop;

// for( var j = 1; j<= 1 ; j++) {
//   for( var i = 1; i<= 8; i++) {
//     desk.addIcon({x:j, y:i, name:'ICON', img_src:'./img/edge.png', src:"http://n4082n.dothome.co.kr"});
//   }
// }


// let task = document.resource.TaskBar;


// task.addTask(); 


// import './stup.js';
// import './wind.js';
// import './desk.js';