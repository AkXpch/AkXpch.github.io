const video = document.getElementById("video-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const playPauseImg = document.getElementById("play-pause-img");
const progressBar = document.getElementById("progress-bar-fill");
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

// Problem: Refernces page is shown while video is loadiing
// ChatGPT is used in this section to fix the problem
// Quote: "I have button that can change video background of the page, while the video is loading, 
        // its show references page where is under the video. How can I hide reference page while video is downloading "
// Answer: Assign display = "none" or "block" to references page and videos page

// Click on sidebar to choose sound and environment

//find video
let videoPlayer = document.getElementById('video-player')
// querySelector = similar to getElementById but more versatile
// = returns the first HTML element that matches a specified CSS selector whether it is class, id ot tag like p, i, h1
let mediaPlayer = document.querySelector('.media-player')
//find all environment button
let environmentButtons = document.querySelectorAll('.sidebar ul li a[data-video]')

//when an element is clicked
//forEach = loop that applies the exact same logic to all of button (environment) on sidebar
environmentButtons.forEach(function(environment){

  environment.onclick = function() {

    //Hide referncePage
    referencePage.style.display = "none";

    //show the mediaPlayer
    mediaPlayer.style.display = "block";

    let videoName = environment.dataset.video

    videoPlayer.src = videoName

    videoPlayer.load()
    videoPlayer.play()
  }
})

// Reference Page
//Make Reference Button work on sidebar
// Don't forgot "" around Id !!!!
const referenceSidebar = document.getElementById("reference-sidebar");
const referencePage = document.getElementById("reference-page");


referenceSidebar.addEventListener("click", function(){
  //Show referencePage
  referencePage.style.display = "block";
  //Hide mediaPlayer
  mediaPlayer.style.display = "none";

});

  
