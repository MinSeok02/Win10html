export class browser { 
  constructor(window) {

    this.tabs    = window.nav_handle; 
    this.mani    = C('div', { class:'mani'});
    this.back    = C('div', { class:'btn' }, [ C('img', {src:'../img/right-arrow.png', style:'transform:rotate(180deg)'}) ]); 
    this.front   = C('div', { class:'btn' }, [ C('img', {src:'../img/right-arrow.png'}) ]); 
    this.refresh = C('div', { class:'btn' }, [ C('img', {src:'../img/refresh.png'}) ]); 
    this.home    = C('div', { class:'btn' }, [ C('img', {src:'../img/home.png'}) ]); 
    this.etc     = C('div', { class:'btn' }, [ C('img', {src:'../img/etc.png'}) ]); 
    this.search  = C('div', { class:'bar' }); 
    this.iframe= C('iframe', { src: window.info.src });

    
    let search_icon  = C('img', { src: './img/info.png'});
    this.search_input = C('input', { type: 'text'});
    A(this.search, [search_icon, this.search_input]);

    this.newtab('./test.html');

    A(this.mani, [this.back, this.front, this.refresh, this.home, this.search, this.etc]);
    A(window.wind, [this.mani, this.iframe]);

    console.log(this.iframe);
    console.log(this.iframe.contentDocument);
  }

  newtab(src) {

    this.iframe.src = src; 
    let tab  = C('div', { class: 'tab'  });
    tab.appendChild(C('img', { src: './img/document.png'}));

    let title = C('p'); 

    this.tabs.appendChild(tab);
    this.search_input.value = src;
  }
}