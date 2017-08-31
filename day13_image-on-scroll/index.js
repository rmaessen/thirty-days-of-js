const images = document.querySelectorAll('.js-slide-in');
const imageShowClass = 'layout__image--show';
var showImages = function(){
	images.forEach(image=>{
		const slideInAt = window.scrollY + window.innerHeight - (0.5*image.height);
		const imageBottom = image.offsetTop + image.height;
		if(image.offsetTop < slideInAt && window.scrollY <= imageBottom){
			image.classList.add(imageShowClass)
		} 
		else{
			image.classList.remove(imageShowClass);
		}
	});
}

var debounce = function(fn, delay = 20) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

document.addEventListener('scroll', debounce(showImages));

