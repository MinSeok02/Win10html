
function viewBG() {
    if ( document.resource.StartUp.visible ) { 
        document.resource.StartUp.show();
    }
}

class Taskbar extends HTMLElement {
    constructor() {
        super();

        this.wrap = C('div',  { class:'wrap' }); 

        this.start = C('div', 
        { 
            class:'btn task',
            onmouseenter: "this.firstChild.style.filter = 'var(--blue-filter)'",
            onmouseleave: "this.firstChild.style.filter = 'none'",
            onclick:      "document.resource.StartUp.show()",
        }, 
        [ C('img', { src:'./img/windows.png' })])

        let search  = C('div', 
        { 
            class:'search',
        }, 
        [
            C('img',   { src:'./img/search.png' }),
            C('input', { tpye:'text' })
        ])

        let tail = C('div', 
        { 
            class:'btn tail',
            onclick: 'viewBG()',
        })

        let time = C('div', 
        { 
            class:'btn time'
        })

        // setInterval(()=>{
        //     console.log(new Date())
        // }, 1000);

        A(this.wrap, [this.start,search, time, tail]);

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/task.css'}),
            this.wrap,
        ])
    }

    addTask(wnd) {
        let task = C('div', { class: 'task' });
        
        this.wrap.appendChild(task); 
    }
}

customElements.define('task-bar', Taskbar);

// 1. window-class 
// 1. running 
// 1. generating 

class Task {
    constructor() {
        this.me = C('div', { class: 'task' });

    }

    get() {
        return this.me; 
    }
}