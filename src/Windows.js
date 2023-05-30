const Q = (s)=>{ return document.querySelector(s) };
const I = (s)=>{ return document.getElementById(s) };
const $ = (s)=>{ return document.getElementsByClassName(s) };
const T = (s)=>{ return document.getElementsByTagName(s) }; 
const A = function(parent, childs = null) {
  if(!childs) return;
  for(let c of childs) {
    parent.appendChild(c); 
  }
}

const C = function(tag, properties = null, childs = null) {
    let elem = document.createElement(tag); 
    for (let i in properties) {
        elem.setAttribute(i, properties[i]);
    }

    A(elem, childs); 
    return elem; 
} 

document.resource = {
  Windows:  I('Windows10'),
  TaskBar:  T('task-bar')[0],
  StartUp:  T('start-up')[0],
  DeskTop:  T('desk-top')[0], 
  WinClass: T('window-class'),
}

import './task.js';
import './stup.js';
import './wind.js';
import './desk.js';

function createWindow(src) {
    let win = C('window-class');
    win.register(src); 
    document.resource.Windows.appendChild(win);
}

/**********************************************************/

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

