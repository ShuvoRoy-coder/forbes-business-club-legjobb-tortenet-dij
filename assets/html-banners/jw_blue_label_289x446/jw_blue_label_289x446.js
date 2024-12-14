const media = document.getElementById('video');

document.querySelector('.play').addEventListener('click', function(){
	if(this.classList.contains('playing')){
		media.pause();
		this.classList.remove('playing');
	} else {
		media.play();
		this.classList.add('playing');
	}
});

document.querySelector('.restart').addEventListener('click', function(){
	media.pause();
    media.currentTime = 0;
	media.play();
	document.querySelector('.play').classList.add('playing');
})