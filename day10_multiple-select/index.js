let lastCheckedIndex = null;
let lastChecked = true;
let shiftDown = false;

document.addEventListener('keydown', e => shiftDown = e.shiftKey);
document.addEventListener('keyup', e => shiftDown = false);
document.querySelectorAll('.checklist__checkbox').forEach(
	(el, index, checkboxes) => el.addEventListener('change', se=>
	{
		if(shiftDown && index != lastCheckedIndex) {
			let min = Math.min(index, lastCheckedIndex);		
			let max = Math.max(index, lastCheckedIndex);
			for(let i = min;i<=max;i++){
				checkboxes[i].checked = lastChecked;
			}
		}
		lastChecked = el.checked;
		lastCheckedIndex = index;
	}
));
