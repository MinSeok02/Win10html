export class browser { 
  constructor(window) {

    this.mani    = C('div', { class:'mani'});
    this.iframe= C('iframe', { src: window.info.src });
    
    A(window.wind, [this.mani, this.iframe]);
    
    this.tabs    = window.nav_handle; 
    this.back    = C('div', { class:'btn' }, [ C('img', {src:'../img/right-arrow.png', style:'transform:rotate(180deg)'}) ]); 
    this.front   = C('div', { class:'btn' }, [ C('img', {src:'../img/right-arrow.png'}) ]); 
    this.refresh = C('div', { class:'btn' }, [ C('img', {src:'../img/refresh.png'}) ]); 
    this.home    = C('div', { class:'btn' }, [ C('img', {src:'../img/home.png'}) ]); 
    this.etc     = C('div', { class:'btn' }, [ C('img', {src:'../img/etc.png'}) ]); 
    this.search  = C('div', { class:'bar' }); 

    this.search_info  = C('div', { class: 'info' }, [ C('img', { src: './img/info.png'}) ]);
    this.search_input = C('input', { type: 'text'});
    A(this.search, [this.search_info, this.search_input]);

    this.open_new_tab = C('a', { class: 'open_new_tab', target:'_blank', href: window.info.src }); 
    this.open_new_tab.textContent = '새 창으로 열기'; 
    
    A(this.mani, [this.back, this.front, this.refresh, this.home, this.search, this.open_new_tab, this.etc]);
  }

  newtab(src, title = '') {
    this.iframe.src = src; 

    let titl = C('p'); titl.textContent = title;
    let tab  = C('div', { class: 'tab' }, 
    [ 
      titl,
      C('div', { class: 'shadow_cleaner'}),
      
    ]);

    A(this.tabs, [tab]); 
    this.search_input.value = src;
  }
}