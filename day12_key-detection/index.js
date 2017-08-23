const konamiSequence = 'rm5';
let enteredSequence = [];

var checkKonami = function(key){
	enteredSequence.push(key);
	if(enteredSequence.length > konamiSequence.length){
		enteredSequence.splice(0,1);
	}
	
	if(konamiSequence===enteredSequence.join('')) {
		cornify_add();
		enteredSequence = [];
		return;
	}
	return;
}

window.addEventListener('keydown', (e)=>checkKonami(e.key));







// code from day 3
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