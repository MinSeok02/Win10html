
// 마우스 포인터 위치
function getMousePos(event) {
    let base = document.resource.Windows.getBoundingClientRect(); 
    return { x:(event.clientX - base.left), y:(event.clientY  - base.top) }; 
}

// 윈도우 위치
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

function move(event, target, body = target) {

    let mouse = getMousePos(event);
    let obj   = getObjectPos(target);
    let shift = { x:(mouse.x - obj.x), y:(mouse.y  - obj.y) };
    let eventFn = (event)=>{ objmove(event, body, shift); };

    document.addEventListener('mousemove', eventFn); 

    target.onmouseup = ()=> {
        document.removeEventListener('mousemove', eventFn);
        target.onmouseup = null;
    }
}; 

class Window extends HTMLElement {
    constructor() {
        super(); 
        let wrap = C('div', { class:'wrap' });
        wrap.style.left = '10px';
        wrap.style.top  = '10px';

        window.addEventListener('resize', ()=>{
            if(wrap.style.left.slice(-1) == '%') return;

            let wrect = document.resource.Windows.getBoundingClientRect();
            let x = parseInt(wrap.style.left.slice(0, -2)) / wrect.width  * 100;
            let y = parseInt(wrap.style.top.slice(0, -2))  / wrect.height * 100;

            wrap.style.left = x + '%';
            wrap.style.top  = y + '%';
        });

        let nav  = C('div', { class:'nav'  }); 
        nav.onmousedown = (event)=>{ move(event, nav, wrap) };

        let img = C('img', {src:'../img/close.png'}); 
        let close = C('div', { class: 'btn' }, [img]);
        close.onmouseover = ()=>{ img.style.filter = 'var(--white-filter)' }
        close.onmouseout  = ()=>{ img.style.filter = 'none' }

        let iframe = C('iframe', { src: '../test.html'});
        iframe.onload = ()=>{ iframe.contentDocument.querySelector('head').appendChild(C('script', { src: '../src/iframe.js'})) };
         
        A(nav, [
            C('div', { class: 'btn', style:'margin-left:auto' },
                [C('img', {src:'../img/minimize.png'})]),
            C('div', { class: 'btn'},
                [C('img', {src:'../img/maximize.png'})]),
            close
        ]);

        A(wrap, 
        [
            nav,
            iframe,
            C('div', {class:'resizer top'}),
            C('div', {class:'resizer bottom'}),
            C('div', {class:'resizer left'}),
            C('div', {class:'resizer right'}),
            C('div', {class:'resizer top-left'}),
            C('div', {class:'resizer top-right'}),
            C('div', {class:'resizer bottom-left'}),
            C('div', {class:'resizer bottom-right'}),
        ]);
         
        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/wind.css'}),
            wrap, 
        ]);
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

