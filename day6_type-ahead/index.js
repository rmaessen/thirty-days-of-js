const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
xhr = new XMLHttpRequest(),
inputEl = document.querySelector('.search__input'),
searchResults = document.querySelector('.search__results');

var places = [];

xhr.open('GET', endpoint);

 xhr.onload = function(){
	if(xhr.status === 200) {
		 places = JSON.parse(xhr.responseText);
	}
 }
 xhr.send();

var highlight = function(text, query){
	var regex = new RegExp(query, 'ig');
	var highlighted = text.replace(regex, function(match){
		return `<span class='search__highlight'>${match}</span>`;
	});
	
	return highlighted;
 }
 
var filterPlaces = function(query) {
	if(!query || query.replace(/\s/g, '').length === 0){
		searchResults.innerHTML = '';
		return;
	}
	query = query.toLowerCase().trim();
	
	var filteredPlaces = places.filter(place => 
		place.city.toLowerCase().indexOf(query) > -1 || 
		place.state.toLowerCase().indexOf(query) > -1);
		
	var results = filteredPlaces.map(place => 
		`<li class='search__result'>${highlight(place.city, query)}, ${highlight(place.state, query)} 
		<small class='search__result-meta'><i>population: ${place.population}</i></small> </li>`);
		
	searchResults.innerHTML = results.join('');
	
}

inputEl.addEventListener('keyup', (e) => filterPlaces(e.currentTarget.value));
 
 
 
 