
class desktop extends HTMLElement{

    constructor() {
        super();
        
        this.wrap = C('table', { class:'wrap' }); 

        this.icon = [];
        this.iconPool = []; 

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
            if(event.target == this) return; 
            for(let elem of this.icon) {
                elem.outFocus(); 
            }
            this.iconPool.length = 0; 
        });

        document.addEventListener('mousedown', drag); 

        this.rect = C('div', { class:'select-rect', style:'width:0px; height:0px;'}); 

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/desk.css'}),
            this.wrap,
            this.rect 
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
}

class Icon {
    constructor(i) {
        this.me = C('div', { class:'icon' });
        this.x  = i.x;
        this.y  = i.y; 
        this.src = i.src;
        this.selected = document.resource; 

        let img   = C('img', { src:i.img_src  }); 
        let title = C('p');  title.innerHTML += i.name; 
        
        A(this.me, [img, title]);

        this.me.addEventListener('click', function() {
            this.addEventListener('click', this.active); 
            setTimeout(()=>{ this.removeEventListener('click', this.active); }, 1000);
        }); 
        
        this.me.onclick = ()=>{this.focus()};
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

    active() {
        alert('create window');        
    }
}


function drag(event) {
    let rect  = document.resource.desktop.rect;
    let { x, y } = document.resource.Windows.getBoundingClientRect();

    let prevX = event.clientX - x; 
    let prevY = event.clientY - y; 
    rect.style.left = prevX + 'px';
    rect.style.top  = prevY + 'px'; 

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
    }

    function up() {
        rect.style.display = 'none';
        
        rect.style.width  = '0px';
        rect.style.height = '0px';

        document.removeEventListener('mouseup', up);
        document.removeEventListener('mousemove', move);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
}

export { desktop }; 