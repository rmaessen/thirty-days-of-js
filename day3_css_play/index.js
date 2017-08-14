const sizeRange = document.getElementById('size-range'), 
	  color = document.getElementById('color'), 
	  width = document.getElementById('width');

sizeRange.addEventListener('change', function(){
	document.documentElement.style.setProperty('--size', sizeRange.value + 'px');
});

color.addEventListener('change', function(){
	document.documentElement.style.setProperty('--color', color.value);
});

document.addEventListener('change', function(){
	document.documentElement.style.setProperty('--width', width.value + 'px');
});