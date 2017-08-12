const secondHand = document.querySelector('.clock__hand--second');
const minuteHand = document.querySelector('.clock__hand--minute');
const hourHand = document.querySelector('.clock__hand--hour');

var getRotation = function(timeCount){
	return 90 + timeCount * 6;
}

var timeLapse = function(){
	var date = new Date(),
		seconds = date.getSeconds(),
		minutes = date.getMinutes(),
		hours = date.getHours();
	secondHand.style.transform = `rotate(${getRotation(seconds)}deg)`;
	minuteHand.style.transform = `rotate(${getRotation(minutes)}deg)`;
	hourHand.style.transform = `rotate(${getRotation(hours)}deg)`;
}
setInterval(timeLapse, 1000);