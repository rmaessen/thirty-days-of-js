const panels = document.querySelectorAll('.gallery__panel'); 
var transition = function(e){
	if(e.propertyName.includes('flex')){
		this.classList.toggle('gallery__panel--open-active')
	}
}
panels.forEach(panel => panel.addEventListener('click', () => panel.classList.toggle('gallery__panel--selected') ));
panels.forEach(panel => panel.addEventListener('transitionend', transition ));
