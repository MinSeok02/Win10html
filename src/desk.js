function createWindow(src) {
    let win = C('window-class');
    win.register(src); 
    document.resource.Windows.appendChild(win);
}

function drag(event) {
    let rect  = document.resource.DeskTop.rect;
    let { x, y } = document.resource.Windows.getBoundingClientRect();

    let prevX = event.clientX - x; 
    let prevY = event.clientY - y; 
    rect.style.left = prevX + 'px';
    rect.style.top  = prevY + 'px'; 
    
    function move(event) {
        rect.style.display = 'block';

        let nextX = event.clientX - x; 
        let nextY = event.clientY - y; 
        let width  = rect.style.width.slice(0, -2);
        let height = rect.style.height.slice(0, -2);
        
        rect.style.width  = parseInt(width)  + (nextX - prevX) + 'px';
        rect.style.height = parseInt(height) + (nextY - prevY) + 'px';
        console.log(rect.style.width);

        prevX = nextX;
        prevY = nextY;
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

class Desktop extends HTMLElement{
    constructor() {
        super();
        
        this.wrap = C('table', { class:'wrap' }); 
        this.icon = [];

        for(var i = 0; i < 8; i++) 
        {
            let tr = C('tr'); 
            for(var j = 0; j < 17; j++) 
            {
                tr.appendChild(C('td'));
            }
            this.wrap.appendChild(tr);
        }

        document.addEventListener('mousedown', (event)=>{this.unselect(event)});
        document.addEventListener('mousedown', drag); 
        
        this.rect = C('div', { class:'select-rect', style:'width:0px; height:0px;'}); 

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/desk.css'}),
            this.wrap,
            this.rect 
        ])
    }

    addIcon(x, y, name, img_src, src) {
        let icon  = C('div', { class:'icon' }); 
        let img   = C('img', { src:img_src  }); 
        let title = C('p');  title.innerHTML += name; 

        icon.selected = false; 
        icon.addEventListener('click', ()=>{
            if (icon.selected) return; 

            icon.selected = true; 
            icon.style.border = 'var(--icon-bd)';
            icon.style.backgroundColor = 'var(--icon-hv)';

            icon.fn = ()=> { 
                createWindow(src); 
                icon.selected = false; 
            }

            icon.addEventListener('click', icon.fn);
            setTimeout(()=>{ 
                icon.removeEventListener('click', icon.fn);
                icon.selected = false; 
            }, 800); 
        });

        this.icon.push(icon); 
        A(icon, [img, title]);
        return this.at(x, y).appendChild(icon);
    }

    at(x, y) {
        return this.wrap.children[y-1].children[x-1]; 
    }

    unselect(event) {
        for(let icon of document.resource.DeskTop.icon) { 
            icon.style = "";
            icon.selected = false; 
            icon.removeEventListener('click', icon.fn);
        }
    }
}

customElements.define('desk-top', Desktop); 