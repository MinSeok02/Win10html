function createWindow(src) {
    alert()
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

class Desktop extends HTMLElement{
    constructor() {
        super();
        
        this.wrap = C('table', { class:'wrap' }); 
        this.select;

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
            if (event.target != this) this.unselect(); 
        });

        document.addEventListener('mousedown', drag); 

        this.wrap.addEventListener('click', (event)=> {
            console.log(event);
            console.log(event.target);
        })

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

        icon.onclick = ()=>{
            if (icon == this.select) {
                alert()
            }

            icon.style.border = 'var(--icon-bd)';
            icon.style.backgroundColor = 'var(--icon-hv)';

            
            this.select = icon;
        }

            // icon.fn = ()=> { 
            //     createWindow(src); 
            // }

            // icon.addEventListener('click', icon.fn);
            // setTimeout(()=>{ 
            //     icon.removeEventListener('click', icon.fn);
            // }, 800); 

        A(icon, [img, title]);
        return this.at(x, y).appendChild(icon);
    }

    at(x, y) {
        return this.wrap.children[y-1].children[x-1]; 
    }

    unselect() {
        let icons = this.wrap.getElementsByClassName('icon'); 
        console.log(icons)
        for(let icon of icons) { 
            icon.style = "";
        }
    }
}

customElements.define('desk-top', Desktop); 