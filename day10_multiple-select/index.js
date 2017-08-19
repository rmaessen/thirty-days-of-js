let lastChecked = null;
let shiftDown = false;
let inBetween = false;
let checkboxes = document.querySelectorAll('.checklist__checkbox');
document.addEventListener('keydown', e => shiftDown = e.shiftKey);
document.addEventListener('keyup', e => shiftDown = false);
checkboxes.forEach(
	(selected, index) => selected.addEventListener('change', ()=>
	{
		if(shiftDown && selected != lastChecked) {
			checkboxes.forEach(checkbox =>
			{
				if(checkbox === selected || checkbox === lastChecked){
					inBetween = !inBetween;
				}
				
				if(!inBetween){
					return;
				}
				
				checkbox.checked = lastChecked.checked;
				let checkboxItem = checkbox.parentElement.parentElement.parentElement;

				if(lastChecked && !checkboxItem.classList.contains('checklist__item--checked')){
					checkboxItem.classList.add('checklist__item--checked');
				}
				if(!lastChecked){
					checkboxItem.classList.remove('checklist__item--checked');
				}
			});
		}
		
		if(!shiftDown){
			let checkboxItem = selected.parentElement.parentElement;
			checkboxItem.classList.toggle('checklist__item--checked');
		}
		
		lastChecked = selected;
	}
));
