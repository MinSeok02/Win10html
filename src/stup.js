function stupDown(event) {
    if (event.target == document.resource.TaskBar ||
        event.target == document.resource.StartUp ) {
        return;
    }

    if (document.resource.StartUp.visible) {
        document.resource.StartUp.show();
    }
}

class Startup extends HTMLElement {
    constructor() {
        super();

        this.visible = false;
        this.wrap = C('div', { class:'wrap' });

        this.li = 
        [
            C('div', { class: 'li1' }),
            C('div', { class: 'li2' }),
            C('div', { class: 'li3' }),
        ]

        A(this.wrap, [...this.li]);

        this.li[0].onmouseenter = unfold;
        this.li[0].onmouseleave = fold;
        this.li[0].unfold       = unfold; 

        A(this.li[0], [
            C('div', { class: 'btn' }, [C('img', { src:'../img/power.png'})]),
            C('div', { class: 'btn' }, [C('img', { src:'../img/gear.png'})]),
            C('div', { class: 'btn' }, [C('img', { src:'../img/image.png'})]),
            C('div', { class: 'btn' }, [C('img', { src:'../img/document.png'})]),
            C('div', { class: 'btn' }, [C('img', { src:'../img/user.png'})]),
            C('div', { class: 'btn start' }, [C('img', { src:'../img/hamburger.png'})]),
        ]);

        let t = ['전원', '설정', '사진', '문서', '강민석', '시작'];
        let c = this.li[0].children;
        for(let i in t) { c[i].appendChild(C('p')).textContent = t[i]; }

        document.addEventListener('mousedown', stupDown);

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/stup.css'}),
            this.wrap
        ])
    }

    addGroup(name) {
        let txt  = C('p'); txt.textContent = name;
        let slot = C('div', { class:'slot' }, [ txt, C('img', { src: './img/hamburger2.png'}) ]);
        slot.onmouseover = ()=>{ slot.lastChild.style.display = 'block' };
        slot.onmouseout  = ()=>{ slot.lastChild.style.display = 'none'  };
        A(this.li[2], [C('div', { class:'group' },[ slot, C('div', { class:'content'})]) ]);
    }

    addStupBtn() {
        let content = this.li[2].getElementsByClassName('content');
        content[content.length - 1].appendChild(C('div', {class:'btn'}));
    }

    addList(txt) {
        let list = C('p', { class:'list' });
        list.textContent = txt;
        this.li[1].appendChild(list);
    }

    show() {
        let style = this.wrap.style;
        let start = document.resource.TaskBar.start;

        if(this.visible) {
            start.style.backgroundColor = 'var(--theme-color)';
            style.height    = '0px';
            style.animation = 'none';

            for(let li of this.li) {
                li.style.animation = 'none';
            }

            this.visible = false;
        } else {
            start.style.backgroundColor = 'var(--hover-color)';
            style.height = '80%';
            style.animation = 'up 0.15s alternate';

            for(let li of this.li) {
                li.style.animation = 'up-tems 0.15s alternate';
            }

            this.visible = true;
        }
    }
}

customElements.define('start-up', Startup);

function unfold() {
    this.value = 
    setTimeout(()=>{
        this.style.animation       = 'unfold 0.15s';
        this.style.backdropFilter  = 'blur(15px)';
        this.style.backgroundColor = 'var(--fold-bg)';
        this.style.boxShadow       = 'var(--fold-sh)';

        setTimeout(()=>{ this.style.width = '40%' }, 120);
    }, 750);
};

function fold() {
    clearTimeout(this.value);
    this.style.animation = 'fold 0.1s';

    setTimeout(()=>{ 
        this.style.width = '7.5%' 
        this.style.backdropFilter  = '';
        this.style.backgroundColor = '';
        this.style.boxShadow       = '';
    }, 60);
};
