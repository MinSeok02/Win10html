

function unselect(icon) {
    icon.select = false;
    icon.style = "";
}

function createWindow() {
    alert();
}

class Desktop extends HTMLElement{
    constructor() {
        super();
        
        this.wrap = C('table', { class:'wrap' }); 
        this.selected = [];

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/desk.css'}),
            this.wrap
        ])

        for(var i = 0; i < 8; i++) {
            let tr = C('tr'); 
            for(var j = 0; j < 17; j++) {
                tr.appendChild(C('td'));
            }
            this.wrap.appendChild(tr);
        }

        document.addEventListener('mousedown', (event)=>{
            if(event.target != this.wrap) {
                for (let i of this.selected) {
                    unselect(i);
                }
            }
        })
    }

    addIcon(x, y, name, img_src, wnd) {
        let icon  = C('div', { class:'icon' }); 
        let img   = C('img', { src:img_src  }); 
        let title = C('p');  title.innerHTML += name; 

        icon.onclick = ()=>{

            for (let i of this.selected) { unselect(i) } 

            icon.style.border = 'var(--icon-bd)';
            icon.style.backgroundColor = 'var(--icon-hv)';
            this.selected.push(icon);

            icon.addEventListener('click', createWindow);

            setTimeout(()=>{
                icon.removeEventListener('click', createWindow); 
            }, 1000); 
        }; 

        A(icon, [img, title]);
        return this.at(x, y).appendChild(icon);
    }

    at(x, y) {
        return this.wrap.children[y-1].children[x-1]; 
    }
}

customElements.define('desk-top', Desktop); 

class Icon {
    constructor() {

    }
}

// Resource.EXPLRORER.addIcon('../cls/C3_15.html', './img/html.png', '2주차 수업')
// Resource.EXPLRORER.addIcon('../cls/C3_21.html', './img/html.png', '3주차 수업')
// Resource.EXPLRORER.addIcon('../cls/C3_28.html', './img/html.png', '4주차 수업(1)')
// Resource.EXPLRORER.addIcon('../cls/C3_29.html', './img/html.png', '4주차 수업(2)')
// Resource.EXPLRORER.addIcon('../cls/C4_04.html', './img/html.png', '5주차 수업(1)')
// Resource.EXPLRORER.addIcon('../cls/C4_05.html', './img/html.png', '5주차 수업(2)')
// Resource.EXPLRORER.addIcon('../cls/C4_11.html', './img/html.png', '6주차 수업')