function createWindow(src) {
    let win = C('window-class');
    win.register(src); 
    document.resource.Windows.appendChild(win);
}

class Desktop extends HTMLElement{
    constructor() {
        super();
        
        this.wrap = C('table', { class:'wrap' }); 
        this.selected = [];

        for(var i = 0; i < 8; i++) 
        {
            let tr = C('tr'); 
            for(var j = 0; j < 17; j++) 
            {
                tr.appendChild(C('td'));
            }
            this.wrap.appendChild(tr);
        }

        document.addEventListener('mousedown', (event)=>{this.clear(event)});

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/desk.css'}),
            this.wrap
        ])
    }

    addIcon(x, y, name, img_src, src) {
        let icon  = C('div', { class:'icon' }); 
        let img   = C('img', { src:img_src  }); 
        let title = C('p');  title.innerHTML += name; 

        icon.onclick = ()=>{
            for (let i of this.selected) { this.unselect(i) } 

            icon.style.border = 'var(--icon-bd)';
            icon.style.backgroundColor = 'var(--icon-hv)';

            this.selected.push(icon);

            icon.addEventListener('click', ()=>{createWindow(src)});
            setTimeout(()=>{ icon.removeEventListener('click', createWindow); }, 1000); 
        }; 

        A(icon, [img, title]);
        return this.at(x, y).appendChild(icon);
    }

    at(x, y) {
        return this.wrap.children[y-1].children[x-1]; 
    }

    unselect(icon) {
        icon.select = false;
        icon.style = "";
    }

    clear(event) {
        if(event.target != this.wrap) {
            for (let i of this.selected) {
                this.unselect(i);
            }
        }
    }
}

customElements.define('desk-top', Desktop); 