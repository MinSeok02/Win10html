export class browser { 
  constructor(window) {

    this.mani    = C('div', { class:'mani'});
    this.back    = C('div', { class:'btn' }, [ C('img', {src:'../img/right-arrow.png', style:'transform:rotate(180deg)'}) ]); 
    this.front   = C('div', { class:'btn' }, [ C('img', {src:'../img/right-arrow.png'}) ]); 
    this.refresh = C('div', { class:'btn' }, [ C('img', {src:'../img/refresh.png'}) ]); 
    this.home    = C('div', { class:'btn' }, [ C('img', {src:'../img/home.png'}) ]); 
    this.search  = C('input', { class:'bar' }); 
    
    this.iframe= C('iframe', { src: window.info.src });

    A(this.mani, [this.back, this.front, this.refresh, this.home, this.search]);
    A(window.wind, [this.mani, this.iframe]);
  }

  newtab(src) {
    this.iframe.src = src; 
    let tab  = C('div', { class: 'tab'  });
    console.log(this.iframe.contentDocument);
    document.test = this.iframe.contentDocument; 
    this.tabs.appendChild(tab);
  }
}