class TaskBar extends HTMLElement {
    constructor() {
        super();

        this.wrap = C('div',  { class:'wrap' }); 

        this.start = C('div', 
        { 
            class:        "start",
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
            C('input', { tpye:'text', placeholder: 'Search' })
        ])

        let tail = C('div', 
        { 
            class:'tail',
            onclick: 'this.viewBG()',
        })

        tail.viewBG = ()=>{ if ( document.resource.startup.visible ) document.resource.startup.show() }

        let time_wrap = C('div', { class:'time' })
        let time = C('p');
        time_wrap.appendChild(time);

        setInterval(()=>{
            let now   = new Date(); 
            let year  = now.getFullYear();
            let month = String(now.getMonth()).padStart(2, '0'); 
            let date  = String(now.getDate()).padStart(2, '0'); 
            
            let hour = String(now.getHours() % 12).padStart(2, '0'); 
            let min  = String(now.getMinutes()).padStart(2, '0');
            let ampm = (now.getHours() + 1) > 12 ? 'PM' : 'AM'; 

            time.innerHTML = `${ampm} ${hour}:${min}`;
        }, 1000);

        A(this.wrap, [this.start,search, time_wrap, tail]);

        A(this.attachShadow({mode : 'open'}),
        [
            C('link', { rel:'stylesheet', href:'./css/task.css'}),
            this.wrap,
        ])
    }

    addTask(info) {
        return new task(info);
    }
}

class task {
    constructor(info) {
        this.root = document.resource.taskbar; 

        console.log(info); 
        
        this.me = C('div', 
            { class: 'task' }, 
            [ C('img', { src: info.img_src, style: 'height: 60%;'})]
        );

        this.root.wrap.appendChild(this.me); 
    }

    quit() {
        this.root.wrap.removeChild(this.me); 
    }
}

customElements.define('task-bar', TaskBar);
export let taskbar = C('task-bar'); 

