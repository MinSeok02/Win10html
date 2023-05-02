
class Taskbar extends HTMLElement {
    constructor() {
        super();

        this.start   = C('div', { class:'btn task' }, [
            C('img', { src:'../img/windows.png' })
        ]); 

        this.start.onmouseenter = ()=> { this.start.firstChild.style.filter = 'var(--blue-filter)'};
        this.start.onmouseleave = ()=> { this.start.firstChild.style.filter = 'none'};
        this.start.onclick      = ()=> { document.resource.StartUp.show(); }; 

        let search  = C('div', { class:'search' }, [
            C('img',   { src:'../img/search.png' }),
            C('input', { tpye:'text' })
        ]); 

        let tail    = C('div', { class:'btn tail'}); 
        let time    = C('div', { class:'btn time'});

        tail.onclick = ()=> { 
            if ( document.resource.StartUp.visible ) { 
                document.resource.StartUp.show();
            }
        };

        // setInterval(()=>{
        //     console.log(new Date())
        // }, 1000);

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/task.css'}),
            C('div', { class:'wrap' }, [this.start,search, time, tail])
        ])
    }

    addTask(task) {
        
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