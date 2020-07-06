
const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressIndicator = progress.querySelector('.progress__filled');
const [ volume, playBack ] = player.querySelectorAll('.player__slider');
const [ toggleBtn, backward, forward ] = player.querySelectorAll('.player__button');


toggleBtn.addEventListener('click', togglePlay);

let mouseDown = false;

progress.addEventListener('click', setProgress);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mousemove', (e) =>  mouseDown && setProgress(e) );
progress.addEventListener('mouseup',  () => mouseDown = false);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButtons);
video.addEventListener('pause', updateButtons);
video.addEventListener('timeupdate', handleProgress);


volume.addEventListener('change', updateSlider);
playBack.addEventListener('change', updateSlider);

forward.addEventListener('click', skip);
backward.addEventListener('click', skip);

function togglePlay() {
    video[video.paused ? 'play': 'pause']();
}

function updateButtons() {
    toggleBtn.textContent = this.paused ? '►' : '❚❚';
}

function updateSlider() {
    video[this.name] = this.value;
}

function skip() {
    video.currentTime += +this.dataset.skip;
}

function handleProgress() {
    progressIndicator.style.flexBasis = (video.currentTime/video.duration) * 100 + '%';
}

function setProgress(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}