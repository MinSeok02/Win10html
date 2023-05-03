

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

