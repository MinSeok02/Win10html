T('head')[0].appendChild(C('link', { rel:"stylesheet", href:"./css/init.css" }));

import { taskbar } from './taskbar.js';
import { startup } from './startup.js';
import { desktop } from './desktop.js';
import { winpool } from './winpool.js';
import { browser } from './browser.js';


document.resource = { taskbar, startup, desktop };

document.Windows10 = C('div', { id: 'Windows10' });

for(let elem in document.resource)
  document.Windows10.appendChild(document.resource[elem]);

document.resource.winpool = winpool;
A(document.body, [ document.Windows10 ]);

/*
1. 드래그 가능
2. 리사이즈 가능
3. 최소화, 최대화, 닫기
4. 포커싱
 */

/**********************************************************/
let desk = document.resource.desktop; 

desk.addIcon({type: browser, x:1, y:5, name:'Icon', img_src:'./img/edge.png', src:"http://n4082n.dothome.co.kr"});


let stup = document.resource.startup;
stup.addGroup('HTML/CSS');
stup.addStupBtn();
stup.addStupBtn();

stup.addList('1학기');
stup.addList('1주차 - ');
stup.addList('2주차 - ');

// task.addTask();