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

let stup = document.resource.startup;
stup.addGroup('생산성');
stup.addStupBtn('./img/edge.png', 'Microsoft Edge');

let cls = [
  { date: '315', desc: 'html_list', week: 2 },
  { date: '321', desc: 'html_table', week: 3 },
  { date: '328', desc: 'html_link', week: 4 },
  { date: '329', desc: 'css', week: 4 },
  { date: '404', desc: 'html_form', week: 5 },
  { date: '405', desc: 'css', week: 5 },
  { date: '411', desc: 'css', week: 6 },
  { date: '412', desc: 'css', week: 6 },
  { date: '502', desc: 'css', week: 9 },
  { date: '503', desc: 'css', week: 9 },
  { date: '510', desc: 'css', week: 10},
  { date: '516', desc: 'css', week: 11},
  { date: '517', desc: 'css', week: 11},
  { date: '523', desc: 'css', week: 12},
  { date: '524', desc: 'css', week: 13},
  { date: '531', desc: 'css', week: 13},
  { date: '607', desc: 'javascript', week: 14},
  { date: '615', desc: 'javascript', week: 15},
]

let week = 1; 
for(let htm of cls) {
  if ( week < htm.week ) {
    stup.addList('&nbsp;&nbsp;' + htm.week + '주차');
    week = htm.week ; 
  } 

  stup.addList(`230${htm.date}_${htm.desc}`, './img/html.png', {
    type: browser, 
    src:`./htm/C${htm.date}.html`,
    img_src:'./img/edge.png', 
    title: htm.desc
  });
}

let desk = document.resource.desktop; 
let row = 1, col = 1; 
week = 1; 
let nth = 1; 
for(let htm of cls) {
  if( row > 8 ) {  row = 1; col++;  }

  if ( week < htm.week ) {
    nth = 1;
  } else if ( week == htm.week ) {
    nth = 2; 
  }

  desk.addIcon({
    type: browser, 
    x: col, y: row, 
    name: `${htm.week}주차(${nth})`,
    img_src:'./img/edge.png', 
    src:`./htm/C${htm.date}.html`,
    title: htm.desc
  });

  row++;
  week = htm.week;
}

