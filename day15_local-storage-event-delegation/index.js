const addItems = document.querySelector('.order-form__add-items'),
	newItemInput = document.querySelector('.order-form__input'), 
	list = document.querySelector('.order-form__list'), 
	itemInputs = document.querySelectorAll('.order-form__item-input'), 
	store = window.localStorage;
	
let items = [];

const storeItems =  () => {
	store.setItem('plates', JSON.stringify(items));
}

const retrieveItems = () => {
	items = JSON.parse(store.getItem('plates')) || [];
	listOut();
};

const toggleCheck = function(itemEl){
	var item = items.find(item => {
		return itemEl.value === item.name;
	});
	item.checked = !item.checked;
	storeItems();
}

const listOut = () => {
	var listItems = items.map(item => {
		return `<li class='order-form__item'><label><input ${item.checked ? 'checked=checked' : ''} type='checkbox'/>${item.name}</label></li>`
	});
	
	list.innerHTML = listItems.join('');
}

const addItem = function(newItem){
	if(!newItem.trim() || !items.every(item => {
		return item.name.toLowerCase() !== newItem.toLowerCase();
	})){
		return;
	}
	
	items.push({name: newItem, checked: false});
	listOut();
	newItemInput.value = '';
	storeItems();
}

addItems.addEventListener('submit', (e)=> {
	e.preventDefault();
	addItem(newItemInput.value);
	return;
});

itemInputs.forEach(input => input.addEventListener('change', (el)=>toggleCheck(el)));

retrieveItems();