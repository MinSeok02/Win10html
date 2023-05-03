
function move(event, target, body = target) {

    function getMousePos(event) {
        let base = document.resource.Windows.getBoundingClientRect(); 
        return { x:(event.clientX - base.left), y:(event.clientY  - base.top) }; 
    }
    
    function getObjectPos(obj) {
        let base  = document.resource.Windows.getBoundingClientRect(); 
        let tRect = obj.getBoundingClientRect();
        return { x:(tRect.left - base.left), y:(tRect.top  - base.top) }; 
    }
    
    function objmove(event, obj, shift) {
        let pos = getMousePos(event);
        obj.style.left  = (pos.x - shift.x) + 'px';
        obj.style.top   = (pos.y - shift.y) + 'px';
    };

    let mouse = getMousePos(event);
    let obj   = getObjectPos(target);
    let shift = { x:(mouse.x - obj.x), y:(mouse.y  - obj.y) };
    let eventFn = (event)=>{ objmove(event, body, shift); };

    document.addEventListener('mousemove', eventFn); 

    body.cover.style.display = "block"; 

    target.onmouseup = ()=> {
        document.removeEventListener('mousemove', eventFn);
        target.onmouseup = null;
        body.cover.style.display = "none"; 
    }
}; 



/*
1. 드래그 가능
2. 리사이즈 가능
3. 최소화, 최대화, 닫기 
4. 포커싱

window class {
    iframe src, 
    
}
 */

class Window extends HTMLElement {
    constructor() {
        super(); 

        this.idx = document.resource.WinClass.length; 

        this.wrap       = C('div', { class:'wrap' });
        this.wrap.cover = C('div', { class:'cover'});

        this.nav = C('div', { class:'nav'  }); 
        
        window.addEventListener('resize', ()=> { this.fix() });

        this.nav.onmousedown = (event)=>{ move(event, this.nav, this.wrap) };

        this.close = C('div', 
        { 
            class: 'btn',
            onmouseover: "this.firstChild.style.filter = 'var(--white-filter)'", 
            onmouseout:  "this.firstChild.style.filter = 'none'"
        }, 
        [ C('img', { src:'../img/close.png' }) ]);

        this.maximize = C('div', 
        { 
            class: 'btn',
            onclick: 'alert()', 
        }, 
        [ C('img', { src:'../img/maximize.png' }) ]);
        
        this.minimize = C('div', 
        { 
            class: 'btn',
            style: 'margin-left:auto;',
            onclick: 'alert()', 
        }, 
        [ C('img', { src:'../img/minimize.png' }) ]);

        this.iframe = C('iframe', { src: '../test.html'});
        this.iframe.onload = ()=>{ this.iframe.contentDocument.querySelector('head').appendChild(C('script', { src: '../src/iframe.js'})) };
         
        A(this.nav, [this.minimize, this.maximize, this.close]);

        A(this.wrap, 
        [
            C('div', {class:'resizer top'}),
            C('div', {class:'resizer bottom'}),
            C('div', {class:'resizer left'}),
            C('div', {class:'resizer right'}),
            C('div', {class:'resizer top-left'}),
            C('div', {class:'resizer top-right'}),
            C('div', {class:'resizer bottom-left'}),
            C('div', {class:'resizer bottom-right'}),
            this.nav, 
            this.wrap.cover,
            this.iframe, 
        ]);
         
        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/wind.css'}),
            this.wrap, 
        ]);
    }

    fix() {
        if(this.wrap.style.left.slice(-1) == '%') return;

        let wrect = document.resource.Windows.getBoundingClientRect();
        let x = parseInt(this.wrap.style.left.slice(0, -2)) / wrect.width  * 100;
        let y = parseInt(this.wrap.style.top.slice(0, -2))  / wrect.height * 100;

        this.wrap.style.left = x + '%';
        this.wrap.style.top  = y + '%';
    }
}

customElements.define('window-class', Window); 

//     minimize window
//     max.onclick = function() {
//         window.style.height = '95%';
//         window.style.width  = '100%';
//         window.style.top    = '0';
//         window.style.left   = '0';
//     }

//     window.min = min;
//     window.max = max;
//     window.close = close;
//     window.body = body;
//     return window;

//     initTabs() {
//         let tabs = A('div', 'tabs', this.nav);
//         A('div', 'tab', tabs).innerHTML += "title";
//     }
    
//     initMani() {
//         let mani = A('div', 'mani', this.nav);
//         let back = A('img', '', A('div', 'btn', mani));
//         back.src = '../img/right-arrow.png';
//         back.style.transform = 'rotateY(180deg)';

//         let refresh = A('img', '');
//         refresh.src = '../img/refresh.png';
//         refresh.style.height = '48%';
//         A('div', 'btn', mani).appendChild(refresh);

//         A('img', '', A('div', 'btn', mani)).src = '../img/home.png';
//         let bar = A('input', 'bar', mani).type = "text";
        

//     }
// }


function resize(event) {
    let shiftX = event.clientX - window.getBoundingClientRect().left;

    function mousemove(event) {
        window.style.left  = (event.clientX - WINDOWS.getBoundingClientRect().left - shiftX) + 'px';
        window.style.width = (window.style.width.slice(0, -2) - shiftX) + 'px'; 
    }

    function clearmove() {
        document.removeEventListener('mousemove', mousemove);
        this.onmouseup = null;
    }

    this.onmouseup  = clearmove;
    this.onmouseout = clearmove;

    document.addEventListener('mousemove', mousemove); 
}

