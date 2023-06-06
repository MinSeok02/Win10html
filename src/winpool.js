class WinPool { 
    constructor() {
        this.pool = []; 
    }

    createWindow(src) {
        let win = C('win-class');
        document.Windows10.appendChild(win);
        win.open(src); 
        this.pool.push(win);
    }

    coverAll(bool) {
        for(let win of this.pool) {
            win.wrap.cover.style.display = bool ? "block" : "none";
        }
    }
}

class Window extends HTMLElement {
    constructor() {
        super();

        this.Win = document.Windows10; 
        this.prior = 0; 

        this.wrap = C('div', 
        { 
            class:'wrap',
            style: "width:50%; height: 50%;"
        });
        this.wrap.cover = C('div', { class:'cover'});

        this.nav = C('div', { class:'nav'  });

        window.addEventListener('resize', ()=> { this.fix_pos() });

        this.nav.onmousedown = (event)=>{ this.move(event) };

        this.close = C('div',
        {
            class: 'btn',
            onmouseover: "this.firstChild.style.filter = 'var(--white-filter)'",
            onmouseout:  "this.firstChild.style.filter = 'none'",
        },
        [ C('img', { src:'./img/close.png' }) ]);

        this.close.onclick = ()=> { this.Win.removeChild(this) };

        this.max = C('div',
        {
            class: 'btn',
        },
        [ C('img', { src:'./img/maximize.png' }) ]);

        this.max.onclick = ()=>{ this.maximize() };

        this.min = C('div',
        {
            class: 'btn',
            style: 'margin-left:auto;',
        },
        [ C('img', { src:'./img/minimize.png' }) ]);

        this.min.onclick = ()=>{ this.minimize() };

        this.iframe = C('iframe');
        
        A(this.nav, [this.min, this.max, this.close]);

        let resizer = [
            C('div', {class:'resizer top',          style:'cursor:ns-resize;'}),
            C('div', {class:'resizer bottom',       style:'cursor:ns-resize;'}),
            C('div', {class:'resizer left',         style:'cursor: ew-resize;'}),
            C('div', {class:'resizer right',        style:'cursor: ew-resize;'}),
            C('div', {class:'resizer top-left',     style:'cursor: nw-resize;'}),
            C('div', {class:'resizer top-right',    style:'cursor: ne-resize;'}),
            C('div', {class:'resizer bottom-left',  style:'cursor: sw-resize;'}),
            C('div', {class:'resizer bottom-right', style:'cursor: se-resize;'}),
        ];

        for(let i of resizer) { i.onmousedown = this.resize }

        A(this.wrap,
        [
            ...resizer,
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

    fix_pos() {
        if(this.wrap.style.left.slice(-1) == '%') return;

        let wrect = document.resource.Windows.getBoundingClientRect();
        let x = parseInt(this.wrap.style.left.slice(0, -2)) / wrect.width  * 100;
        let y = parseInt(this.wrap.style.top.slice(0, -2))  / wrect.height * 100;

        this.wrap.style.left = x + '%';
        this.wrap.style.top  = y + '%';
    }

    maximize() {
        this.wrap.style.left = '0%';
        this.wrap.style.top  = '0%';
        this.wrap.style.width = '100%';
        this.wrap.style.height = '95%';
    }

    minimize() {
        this.wrap.style.display = 'none';
    }

    resize(event) {
        let Win   = document.Windows10; 
        let wrect = Win.getBoundingClientRect();  
        let wrap  = this.parentElement;
        let dir   = this.className.split(' ')[1].split('-'); 

        wrap.cover.style.display = "block";

        Win.ptrX = event.clientX;
        Win.ptrY = event.clientY;
        Win.style.cursor = this.style.cursor; 

        function resize(event) {
            let rect = wrap.getBoundingClientRect();

            let deltaX = (Win.ptrX - event.clientX); 
            let deltaY = (Win.ptrY - event.clientY); 

            for(let i of dir) {

                switch(i) {
                    case 'left': 
                        wrap.style.width  = rect.width + deltaX + 'px';
                        wrap.style.left   = rect.x     - deltaX - wrect.x + 'px';
                    break;  
                    case 'right':
                        wrap.style.width  = rect.width - deltaX + 'px';
                        break;
                    case 'top':
                        wrap.style.height = rect.height + deltaY + 'px';
                        wrap.style.top    = rect.y      - deltaY - wrect.y + 'px';
                        break;
                    case 'bottom':
                        wrap.style.height = rect.height - deltaY + 'px';
                        break;
                }
            }

            Win.ptrX = event.clientX;
            Win.ptrY = event.clientY;
        }

        function cancel() {

            Win.style.cursor = 'default'; 

            let wrect = Win.getBoundingClientRect();    

            if(wrap.style.width.slice(-1)  != '%') {
                let x = parseInt(wrap.style.width.slice(0, -2))  / wrect.width  * 100;
                wrap.style.width  = x + '%';
            }
            if(wrap.style.height.slice(-1) != '%') {
                let y = parseInt(wrap.style.height.slice(0, -2))  / wrect.height * 100;
                wrap.style.height = y + '%';
            }

            Win.removeEventListener('mouseup',    cancel);
            Win.removeEventListener('mousemove',  resize);
            Win.removeEventListener('mouseleave', leave);
            wrap.cover.style.display = "none";
        }

        function leave() { cancel(); }

        Win.addEventListener('mousemove',  resize);
        Win.addEventListener('mouseup',    cancel);
        Win.addEventListener('mouseleave', leave);
    }

    move(event) {
        let Win = this.Win; 
        function getMousePos(event) {
            let base = Win.getBoundingClientRect();
            return { x:(event.clientX - base.left), y:(event.clientY  - base.top) };
        }
    
        function getObjectPos(obj) {
            let base  = Win.getBoundingClientRect();
            let tRect = obj.getBoundingClientRect();
            return { x:(tRect.left - base.left), y:(tRect.top  - base.top) };
        }
    
        function objmove(event, obj, shift) {
            let pos = getMousePos(event);
            obj.style.left  = (pos.x - shift.x) + 'px';
            obj.style.top   = (pos.y - shift.y) + 'px';
        };
    
        let mouse = getMousePos(event);
        let obj   = getObjectPos(this.nav);
        let shift = { x:(mouse.x - obj.x), y:(mouse.y  - obj.y) };
        let eventFn = (event)=>{ objmove(event, this.wrap, shift); };
    
        document.addEventListener('mousemove', eventFn);
    
        this.wrap.cover.style.display = "block";
    
        this.nav.onmouseup = ()=> {
            document.removeEventListener('mousemove', eventFn);
            this.nav.onmouseup = null;
            this.wrap.cover.style.display = "none";
        }
    };

    open(src) {
        this.iframe.src = src; 
    }
}

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

customElements.define('win-class', Window);
export let winpool = new WinPool(); 