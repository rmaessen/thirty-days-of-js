const video = document.querySelector('.player__video'),
 playButton = document.querySelector('.player__play-control'),
 playIcon = document.querySelector('.player__play-icon'),
 progressBarControl = document.querySelector('.player__progress-control'),
 progressBar = document.querySelector('.player__progress-bar'),
 volumeControl = document.querySelector('.player__volume-control'),
 rewindControl = document.querySelector('.player__rewind-control'),
 fastForwardControl = document.querySelector('.player__fast-forward-control'),
 player = document.querySelector('.player'),
 controls = document.querySelector('.player__controls-container');
 
let duration = 0,
 barWidth = window.getComputedStyle(progressBar).width.replace('px', ''),
 dragging = false,
 playIconClass = 'fa-play';
 
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

rewindControl.addEventListener('click', () => {
	dragging = true;
	video.currentTime = video.currentTime - 10;
	setProgressBar(video.currentTime);
	dragging = false;
});

fastForwardControl.addEventListener('click', () => {
	dragging = true;
	video.currentTime = video.currentTime + 10;
	setProgressBar(video.currentTime);
	dragging = false;
});

player.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
player.addEventListener('mouseout', () => controls.style.transform = 'translateY(44px)');

