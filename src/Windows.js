T('head')[0].appendChild(C('link', { rel:"stylesheet", href:"./css/init.css" }));

import { taskbar } from './taskbar.js';
import { startup } from './startup.js';
import { desktop } from './desktop.js';
import { winpool } from './winpool.js';

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

for( var j = 1; j<= 1 ; j++) {
  for( var i = 1; i<= 8; i++) {
    document.resource.desktop.addIcon({x:j, y:i, name:'ICON', img_src:'./img/edge.png', src:"http://n4082n.dothome.co.kr"});
  }
}





let stup = document.resource.startup;
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

// task.addTask();