class DeskTop extends HTMLElement{
    constructor() {
        super();
        
        this.wrap = C('table', { class:'wrap' }); 

        this.icon = [];
        this.selected = []; 
        this.dragBlock = false;

        for(var i = 0; i < 8; i++) 
        {
            let tr = C('tr'); 
            for(var j = 0; j < 17; j++) 
            {
                tr.appendChild(C('td'));
            }
            this.wrap.appendChild(tr);
        }

        document.addEventListener('mousedown', (event)=>{
            if (this.dragBlock) return;
            for (let icon of this.selected) 
                icon.outFocus(); 
            this.selected.length = 0; 
        });
        
        document.addEventListener('mousedown', this.drag); 

        this.rect = C('div', { class:'select-rect', style:'width:0px; height:0px;'}); 

        // <test>
        this.testPoint = C('div', { style:`
            position:absolute; 
            width: 5px;
            height: 5px; 
            background-color: blue; 
        `});
        this.wrap.appendChild(this.testPoint);
        // </test>

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/desk.css'}),
            this.wrap,
            this.rect,
        ])


    }

    addIcon(iconInfo) {
        let icon = new Icon(iconInfo);
        this.icon.push(icon);     
        this.at(icon.x, icon.y).appendChild(icon.get());
    }

    at(x, y) {
        return this.wrap.children[y-1].children[x-1]; 
    }

    drag(event) {
        let desktop = document.resource.desktop; 
        let winpool = document.resource.winpool;
        if (event.target != desktop) return; 
        if (desktop.dragBlock) return; 
        
        let rect  = desktop.rect;
        let { x, y } = document.Windows10.getBoundingClientRect();
    
        let prevX = event.clientX - x; 
        let prevY = event.clientY - y; 
        rect.style.left = prevX + 'px';
        rect.style.top  = prevY + 'px'; 
        
        let desk_rect = desktop.wrap.getBoundingClientRect(); 
        let height    = desk_rect.height; 
        let width     = desk_rect.width; 

        // <test>
        console.log("height: " + height + "  width: " + width );
        console.log(desk_rect);

        // X-unit 6.25 % 
        // Y-unit 2.94 %

        
        // </test>


        winpool.cover(true); 
        
        function move(event) {
            rect.style.display = 'block';
     
            let nextX = event.clientX - x; 
            let nextY = event.clientY - y; 
            let dw = nextX - prevX; 
            let dh = nextY - prevY;
            
            rect.style.width  = Math.abs(dw) + 'px';
            rect.style.height = Math.abs(dh) + 'px';
            
            if (dw < 0) rect.style.left = (prevX + dw) + 'px';
            if (dh < 0) rect.style.top  = (prevY + dh) + 'px';

            
            // <test>
            let testPoint = document.resource.desktop.testPoint; 
            testPoint.style.left = nextX / width  * 100 + '%'; 
            testPoint.style.top  = nextY / height * 100 + '%'; 
            // </test>
        }
    
        function up(event) {
            rect.style.display = 'none';
            
            rect.style.width  = '0px';
            rect.style.height = '0px';
    
            document.removeEventListener('mouseup', up);
            document.removeEventListener('mousemove', move);

            winpool.cover(false); 

            let nextX = event.clientX - x; 
            let nextY = event.clientY - y; 

            // <test>
            console.log("prev : " + prevX + ' ' + prevY);
            console.log("next : " + nextX + ' ' + nextY);

            let unitX = nextX / width  * 100 + '%'; 
            let unitY = nextY / height * 100 + '%'; 
            console.log("X: " + unitX + "  Y: " + unitY); 
            // </test>
        }
    
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    }
}

class Icon {
    constructor(i) {
        this.me = C('div', { class:'icon' });
        this.x  = i.x;
        this.y  = i.y; 
        this.src = i.src;
        this.pool = document.resource.desktop.selected; 

        let img   = C('img', { src:i.img_src  }); 
        let title = C('p');  title.innerHTML += i.name;
        let activeCover = C('div', { class:'activecover' }); 

        this.me.addEventListener('click', ()=>{
            activeCover.style.display = 'block';
            activeCover.onclick = ()=>{
                document.resource.winpool.createWindow(i); 
            }

            setTimeout(()=>{ 
                activeCover.style.display = 'none';
            }, 500);
        }); 
        
        this.me.onclick = ()=>{
            this.focus();
            for (let icon of this.pool) {
                if(this == icon) continue; 
                icon.outFocus(); 
            }
            this.pool.length = 0;
            this.pool.push(this); 
        };

        this.me.onmouseenter = ()=>{
            document.resource.desktop.dragBlock = true;
        }

        this.me.onmouseleave = ()=>{
            activeCover.style.display = 'none';
            document.resource.desktop.dragBlock = false;
        }

        A(this.me, [img, title, activeCover]);
    }

    focus() {
        this.me.style.border = 'var(--icon-bd)';
        this.me.style.backgroundColor = 'var(--icon-hv)';
    }

    outFocus() {
        this.me.style = '';
        this.me.removeEventListener('click', this.active);
    }

    get() {
        return this.me;
    }
}



customElements.define('desk-top', DeskTop);
export let desktop = C('desk-top'); 
