const video = document.querySelector('.player__video');
const playButton = document.querySelector('.player__play-control');
const playIcon = document.querySelector('.player__play-icon');
const progressBarControl = document.querySelector('.player__progress-control');
const progressBar = document.querySelector('.player__progress-bar');
const volumeControl = document.querySelector('.player__volume-control');
let duration = 0;
let barWidth = window.getComputedStyle(progressBar).width.replace('px', '');
let dragging = false;
let playIconClass = 'fa-play';
video.volume = 0.5;

var setPlayIconClass = function(iconClass){
	playIcon.classList.remove(playIconClass);
	playIconClass = iconClass;
	playIcon.classList.add(playIconClass);
}

video.addEventListener('loadedmetadata', function() {
    duration = video.duration;
	progressBar.max = duration;
});

var play = function(){
	if(video.paused){
		video.play();
		setPlayIconClass('fa-pause');
		return;
	}
	video.pause();
	setPlayIconClass('fa-play');
	return;
}

var setCurrentTime = function(offset){	
	var elapsedWidthFraction = offset/barWidth;
	progressBarControl.style.width = elapsedWidthFraction * 100 + '%';
	video.currentTime = elapsedWidthFraction * duration; 
}

var setProgressBar = function(timeLapsed){
	var elapsedFraction = timeLapsed/duration;
	progressBarControl.style.width = elapsedFraction * 100 + '%'; 
}

playButton.addEventListener('click', play);

progressBar.addEventListener('click', (e) => {
	dragging = true;
	setCurrentTime(e.offsetX);
	dragging = false;
});

volumeControl.addEventListener('change', () => video.volume = volumeControl.value); 

video.addEventListener('timeupdate', () => {
	if(!dragging){
		setProgressBar(video.currentTime);
	}
});