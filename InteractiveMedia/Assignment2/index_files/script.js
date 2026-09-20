const video = document.querySelector("#video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}

// Click on sidebar to choose sound and environment

//find videos
// querySelector = similar to getElementById but more versatile
// = returns the first HTML element that matches a specified CSS selector whether it is class, id ot tag like p, i, h1
let videoPlayer = document.querySelector('#video-player')
//find all environment button
let environmentButtons = document.querySelectorAll('.sidebar ul li a')

//when an element is clicked
//forEach = loop that applies the exact same logic to all of button (environment) on sidebar
environmentButtons.forEach(function(environment){
  environment.onclick = function() {
    let videoName = environment.dataset.video

    videoPlayer.src = videoName

    videoPlayer.load()
    videoPlayer.play()
  }
})

  
