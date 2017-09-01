const addItems = document.querySelector('.order-form__add-items'),
	newItemInput = document.querySelector('.order-form__input'), 
	list = document.querySelector('.order-form__list'), 
	itemInputs = document.querySelectorAll('.order-form__item-input'), 
	store = window.localStorage, 
	controls = document.querySelector('.order-form__controls'),
	selectAllControl = document.querySelector('.order-form__select-button--select'),
	deselectAllControl = document.querySelector('.order-form__select-button--deselect'),
	removeAllControl = document.querySelector('.order-form__select-button--remove');
	
	let items = [];

const storeItems =  () => {
	store.setItem('plates', JSON.stringify(items));
}

const retrieveItems = () => {
	items = JSON.parse(store.getItem('plates')) || [];
	listOut(items, list);
};

const toggle = function(e){
	if(!e.target.matches('input')){
		return;
	}
	var item = items[e.target.dataset.index];
	item.checked = !item.checked;
	storeItems();
}

const listOut = (items = [], listElement) => {
	var listItems = items.map((item, index) => {
		return `<li class='order-form__item'><label><input class='order-form__item-input' data-index=${index} ${item.checked ? 'checked=checked' : ''} type='checkbox'/>${item.name}</label></li>`
	});
	
	items.length > 1 ? controls.classList.add('order-form__controls--show') : controls.classList.remove('order-form__controls--show');

	listElement.innerHTML = listItems.join('');
}

const addItem = function(newItem){
	if(!newItem.trim() || !items.every(item => {
		return item.name.toLowerCase() !== newItem.toLowerCase();
	})){
		return;
	}
	
	items.push({name: newItem, checked: false});
	listOut(items, list);
	storeItems();
	newItemInput.value = '';
	newItemInput.focus();
}

const selectAll = (items) => {
	items.forEach(item => item.checked = true);
	storeItems();
	listOut(items, list);
	newItemInput.focus();
}


const deselectAll = (items) => {
	items.forEach(item => item.checked = false);
	storeItems();
	listOut(items, list);
	newItemInput.focus();
}

const removeAll = (items) => {
	items.length = 0;
	store.setItem('plates', JSON.stringify(items));
	listOut(items, list);
	newItemInput.focus();
}

addItems.addEventListener('submit', (e)=> {
	e.preventDefault();
	addItem(newItemInput.value);
	return;
});

list.addEventListener('click', (e)=>toggle(e));

selectAllControl.addEventListener('click', ()=>selectAll(items));
deselectAllControl.addEventListener('click',()=>deselectAll(items));
removeAllControl.addEventListener('click', ()=>removeAll(items));

retrieveItems();
newItemInput.focus();