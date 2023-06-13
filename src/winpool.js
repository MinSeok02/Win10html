class WinPool { 
    constructor() {
        this.pool = [];
        this.focus = null;
    }

    createWindow(info) {
        let window = C('win-class');
        
        window.info = info;
        window.program = new (info.type)(window);
        
        this.pool.push(window);
        
        if(this.focus == null) {
            window.wind.style.zIndex = '100'; 
            this.focus = window; 
            this.focus.wind.cover.style.display = "none";
            
            console.log(this.focus.wind.style.zIndex)
        }
        else {
            this.swap_focus(window); 
        }

        document.Windows10.appendChild(window);
        document.resource.taskbar.addTask(info);
    }

    cover(bool) {
        this.focus.wind.cover.style.display = bool ? "block" : "none";
    }

    swap_focus(target) {
        if (target == this.focus) return;
        
        target.wind.style.zIndex = this.focus.wind.style.zIndex;

        this.focus.wind.cover.style.display = "block";
        this.focus.wind.style.zIndex = ''; 
        this.focus = target; 
    }
}

class Window extends HTMLElement {
    constructor() {
        super();

        this.root = document.Windows10; 

        this.wind = C('div', 
        { 
            class: 'wind',
            style: "width:50%; height: 50%;"
        });
        this.wind.cover = C('div', { class: 'cover'});

        this.nav        = C('div', { class: 'nav'  });
        this.nav_handle = C('div', { class: 'handle' });

        // <Events> 
        window.addEventListener('resize', ()=> { this.fix_pos() });
        this.wind.addEventListener('mousedown', ()=> {
            document.resource.winpool.swap_focus(this);
        });
        // </Events> 

        this.nav_handle.onmousedown = (event)=>{ this.move(event) };

        // <Buttons> 
        this.close = C('div',
        {
            class: 'btn',
            onmouseover: "this.firstChild.style.filter = 'var(--white-filter)'",
            onmouseout:  "this.firstChild.style.filter = 'none'",
        },
        [ C('img', { src:'./img/close.png' }) ]);

        this.close.onclick = ()=>{ this.quit(); };

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
        // </Buttons> 

        A(this.nav, [this.nav_handle, this.min, this.max, this.close]);

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

        A(this.wind,
        [
            ...resizer,
            this.nav,
            this.wind.cover
        ]);

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/brow.css'}),
            this.wind,
        ]);
    }

    fix_pos() {
        if(this.wind.style.left.slice(-1) == '%') return;

        let wrect = document.Windows10.getBoundingClientRect();
        let x = parseInt(this.wind.style.left.slice(0, -2)) / wrect.width  * 100;
        let y = parseInt(this.wind.style.top.slice(0, -2))  / wrect.height * 100;

        this.wind.style.left = x + '%';
        this.wind.style.top  = y + '%';
    }

    maximize() {
        this.wind.style.left = '0%';
        this.wind.style.top  = '0%';
        this.wind.style.width = '100%';
        this.wind.style.height = '95%';
    }

    minimize() {
        this.wind.style.display = 'none';
    }

    resize(event) {
        let root  = document.Windows10; 
        let wrect = root.getBoundingClientRect();  
        let wind  = this.parentElement;
        let dir   = this.className.split(' ')[1].split('-'); 

        winpool.cover(true); 

        root.ptrX = event.clientX;
        root.ptrY = event.clientY;
        root.style.cursor = this.style.cursor; 

        function resize(event) {

            let rect = wind.getBoundingClientRect();

            let deltaX = (root.ptrX - event.clientX); 
            let deltaY = (root.ptrY - event.clientY); 

            for(let i of dir) {

                switch(i) {
                    case 'left': 
                        if ( rect.width + deltaX < 400) { continue; } 
                        wind.style.width  = rect.width + deltaX + 'px';
                        wind.style.left   = rect.x     - deltaX - wrect.x + 'px';
                        break;  
                    case 'right':
                        if ( rect.width - deltaX < 400) {  continue; } 
                        wind.style.width  = rect.width - deltaX + 'px';
                        break;
                    case 'top':
                        if ( rect.height + deltaY < 100) { continue; } 
                        wind.style.height = rect.height + deltaY + 'px';
                        wind.style.top    = rect.y      - deltaY - wrect.y + 'px';
                        break;
                    case 'bottom':
                        if ( rect.height - deltaY < 100) { continue; } 
                        wind.style.height = rect.height - deltaY + 'px';
                        break;
                }
                
                root.ptrX = event.clientX;
                root.ptrY = event.clientY;
            }
        }

        function cancel() {

            root.style.cursor = 'default'; 

            let wrect = root.getBoundingClientRect();    

            if(wind.style.width.slice(-1)  != '%') {
                let x = parseInt(wind.style.width.slice(0, -2))  / wrect.width  * 100;
                wind.style.width  = x + '%';
            }
            if(wind.style.height.slice(-1) != '%') {
                let y = parseInt(wind.style.height.slice(0, -2))  / wrect.height * 100;
                wind.style.height = y + '%';
            }

            root.removeEventListener('mouseup',    cancel);
            root.removeEventListener('mousemove',  resize);
            root.removeEventListener('mouseleave', leave);
            winpool.cover(false); 
        }

        function leave() { cancel(); }

        root.addEventListener('mousemove',  resize);
        root.addEventListener('mouseup',    cancel);
        root.addEventListener('mouseleave', leave);
    }

    move(event) {
        let root = this.root; 
        function getMousePos(event) {
            let base = root.getBoundingClientRect();
            return { x:(event.clientX - base.left), y:(event.clientY  - base.top) };
        }
    
        function getObjectPos(obj) {
            let base  = root.getBoundingClientRect();
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
        let eventFn = (event)=>{ objmove(event, this.wind, shift); };
    
        document.addEventListener('mousemove', eventFn);
    
        winpool.cover(true); 
    
        this.nav.onmouseup = ()=> {
            document.removeEventListener('mousemove', eventFn);
            this.nav.onmouseup = null;
            winpool.cover(false); 
        }
    };

    quit() {
        this.root.removeChild(this);

    }
}

customElements.define('win-class', Window);
export let winpool = new WinPool(); 