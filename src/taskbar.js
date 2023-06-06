class TaskBar extends HTMLElement {
    constructor() {
        super();

        this.wrap = C('div',  { class:'wrap' }); 

        this.start = C('div', 
        { 
            class:        "btn task",
            onmouseenter: "this.firstChild.style.filter = 'var(--blue-filter)'",
            onmouseleave: "this.firstChild.style.filter = 'none'",
            onclick:      "document.resource.startup.show()",
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
            onclick: 'this.viewBG()',
        })

        tail.viewBG = ()=>{ if ( document.resource.startup.visible ) document.resource.startup.show() }

        let time = C('div', 
        { 
            class:'btn time'
        })

        setInterval(()=>{
            let now   = new Date(); 
            let year  = now.getFullYear();
            let month = now.getMonth(); 
            let date  = now.getDate(); 
            
            let day   = now.getDay(); 

            time.innerHTML = 
            `<br>${year}-${month}-${date}`;

        }, 1000);

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

class task {
    constructor() {
        this.me = C('div', { class: 'task' });

    }

    get() {
        return this.me; 
    }
}

customElements.define('task-bar', TaskBar);
export let taskbar = C('task-bar'); 

