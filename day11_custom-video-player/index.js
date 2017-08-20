const video = document.querySelector('.player__video'),
 playButton = document.querySelector('.player__play-control'),
 playIcon = document.querySelector('.player__play-icon'),
 progressBarControl = document.querySelector('.player__progress-control'),
 progressBar = document.querySelector('.player__progress-bar'),
 volumeControl = document.querySelector('.player__volume-control'),
 skipControls = document.querySelectorAll('[data-skip]'),
 fastForwardControl = document.querySelector('.player__fast-forward-control'),
 player = document.querySelector('.player'),
 playerContainer = document.querySelector('.player__container'),
 controls = document.querySelector('.player__controls-container'),
 fullScreenControl = document.querySelector('.player__full-screen-control');
 
let barWidth = window.getComputedStyle(progressBar).width.replace('px', ''),
 dragging = false,
 playIconClass = 'fa-pause', 
 fullScreen = false;
 
video.volume = 0.5;

var setPlayIconClass = function(iconClass){
	playIcon.classList.remove(playIconClass);
	playIconClass = iconClass;
	playIcon.classList.add(playIconClass);
}

var play = function(){
	if(video.paused){
		video.play();
		return;
	}
	video.pause();
	return;
}

var setCurrentTime = function(offset){	
	var elapsedWidthFraction = offset/barWidth;
	progressBarControl.style.width = elapsedWidthFraction * 100 + '%';
	video.currentTime = elapsedWidthFraction * video.duration; 
}

var setProgressBar = function(timeLapsed){
	var elapsedFraction = timeLapsed/video.duration;
	progressBarControl.style.width = elapsedFraction * 100 + '%'; 
}

var skip = function(control) {
	dragging = true;
	video.currentTime = video.currentTime + parseInt(control.dataset.skip);
	setProgressBar(video.currentTime);
	dragging = false;
	return;
}

playButton.addEventListener('click', play);

progressBar.addEventListener('click', (e) => {
	dragging = true;
	setCurrentTime(e.offsetX);
	dragging = false;
});

volumeControl.addEventListener('change', () => video.volume = volumeControl.value); 

skipControls.forEach(control => control.addEventListener('click', (e)=>	skip(control)));

fullScreenControl.addEventListener('click', ()=> {
		fullScreen = !fullScreen;
		playerContainer.style.flex = fullScreen ? '100%' : 'initial';
	}
);

player.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
player.addEventListener('mouseout', () => controls.style.transform = 'translateY(44px)');
player.addEventListener('mouseout', () => controls.style.transform = 'translateY(44px)');

video.addEventListener('click', play);
video.addEventListener('play', () => setPlayIconClass('fa-pause'));
video.addEventListener('pause', () => setPlayIconClass('fa-play'));
video.addEventListener('timeupdate', () => {
	if(!dragging){
		setProgressBar(video.currentTime);
	}
});

video.addEventListener('loadeddata', function() {
   playerContainer.style.visibility = 'visible';
}, false);
