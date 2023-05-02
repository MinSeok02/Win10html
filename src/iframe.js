
const StartUp = window.parent.document.resource.StartUp;

function onclick() {
  if ( StartUp.visible ) { StartUp.show(); }

}

document.addEventListener('mousedown', onclick);
