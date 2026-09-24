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

// Slider Volume
// Gemini is used in this section
// Quote: "what kind of addevent listener volume slider use" and "what is the differnt mousemove and input"
// Answer: "mousemove" is not recommended on its own. The volume will change whenever the mouse moves over the slider, 
//          even if the user isn't clicking or dragging.
// Disclaimer: "mousemove" is used in tutorial video but I use "input" because it is more suitable for this browser
const volumeSlider = document.getElementById("slider-range");
const volumeIcon = document.getElementById("volume-icon")
volumeSlider.addEventListener("input", function(){
  // Noted! video.volume expect 0-1 but in my case i use 0-100 that why i need to /100
  video.volume = volumeSlider.value / 100;
  //make icons change when volume change
  if(video.volume == 0){
    volumeIcon.className = "bx bxs-volume-mute";
  } else if(video.volume < 0.5){
    volumeIcon.className = "bx bxs-volume-low";
  }else {
    volumeIcon.className = "bx bxs-volume-full";
  }
});
  
