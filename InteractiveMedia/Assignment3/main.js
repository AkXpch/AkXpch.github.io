
// nextScene function = make next scene start ater the current scene finish

const buttonScene = document.getElementById("scene-2");
const  nightScene = document.getElementById("scene-3");
const lightScene = document.getElementById("scene-4")


function nextScene(currentScene, nextScene){
    currentScene.style.display = "none";
    nextScene.style.display = "block";
}
// call nextScene function
//nextScene(home, teethScene);

// nextScene(buttonScene, nightScene);
// nextScene(nightScene, lightScene);


// Test next scene fnction
const homeScene = document.getElementById("home");
const teethScene = document.getElementById("scene-1");
// const testButton1 = document.getElementById("test-button1");
// const testButton2 = document.getElementById("test-button2");

// testButton1.addEventListener("click", function(){
//      nextScene(teethScene, buttonScene);
// });

// testButton2.addEventListener("click", function(){
//      nextScene(buttonScene, nightScene);
// });

// Start Button
const startButton = document.getElementById("start-button")

startButton.addEventListener("click", function(){
    homeScene.style.display = "none";
    teethScene.style.display = "block";
    
});



// Scene 1 - Brushing teeth
// Brush count = the more u brush -> bubble bigger -> goodjob scene -> next cene
const bubble1 = document.getElementById("bubble-1");
const bubble2 = document.getElementById("bubble-2");
const bubble3 = document.getElementById("bubble-3");
const bubble4 = document.getElementById("bubble-4");
const toothbrush = document.getElementById("toothbrush");

// use variable brushCount to set start number = 0
let brushCount = 0;

// Gemini is used
//Promp: How can I keep track of mousemove and tell js that when mouse move left ans right, count 1
//Answer: clientX to keep track of mouse position, this can be done using if-else condition 

//check if user is dragging
let isBrushing = false;

//Remember previouse mouse position
let previousMouseX = null;

// drag = mouse down -> hold -> mouse up, so i do this in 3 actions which is mousedown, mousemove and mouseup
// Start Brushing
toothbrush.addEventListener("dragstart", function(event){
    isBrushing = true;
    previousMouseX = event.clientX

    // Allow the toothbrush to be dragged again
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", "toothbrush");
});

//counting when mouse is being held
document.addEventListener("dragover", function(event){
    if(isBrushing == true){

        event.preventDefault();

        // Move the toothbrush with the mouse
        //number 720 and 320 is where I want mouse to hold the toothbrush
        toothbrush.style.left = event.clientX - 700 + "px"; 
        toothbrush.style.top = event.clientY - 380 + "px";

        //count brushing
        let currentMouseX = event.clientX;
        let movement = currentMouseX - previousMouseX;

        //count when the toothbrush move more than 10
        if(Math.abs(movement) > 100){
            //count
            brushCount++;
            // update to bubble so it is etting bigger while brushing
            bubbleShow();
            //update mouse position
            previousMouseX = currentMouseX;

        }
    }
});

//Stop brushing when mouse up
toothbrush.addEventListener("dragend", function(){
    isBrushing = false;
    previousMouseX = null;
})


// set valus for bubble to be bigger when user brush more.
function bubbleShow() {
    bubble1.style.display = "none";
    bubble2.style.display = "none";
    bubble3.style.display = "none";
    bubble4.style.display = "none";
    if(brushCount == 0){
        // No brush count
    } else if(brushCount <= 5){
        bubble1.style.display = "block";
    } else if(brushCount <= 10){
        bubble2.style.display = "block";
    } else if(brushCount <= 15){
        bubble3.style.display = "block";
    } else{
        bubble4.style.display = "block";
        //after finish brushing, change to scene 2
        nextScene(teethScene, buttonScene);

    }
}

//OnlineTutorials(2026), Drag and Drop with JavaScript, https://www.youtube.com/watch?v=V_WEpWhpzwA
//Scene2: Button UP
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

const guide1 = document.getElementById("button1-1");
const guide2 = document.getElementById("button2-1");
const guide3 = document.getElementById("button3-1");

//Make sure that only button1 can be drag at the beginning
button2.draggable = false;
button3.draggable = false;

// Make guide button to receive dragged button
function drop(guide){
    guide.addEventListener("dragover",function(event){
        event.preventDefault(); // preventDefault() = tell browser not to do normal default action
        //we need preventDefault() here because in default browser block me to drop item.
    })
}

// Place the red button
// Note: button = red button that user need to drag, 
// guide = grey guide where red button should go, 
// nextButton = next button will be able to drag when the previous button is in correct place, 
// nextGuide = grey guide(blink) that show when previouss button completed.
function placeButton(button, guide, nextButton, nextGuide){
    guide.addEventListener("drop", function(event){
        event.preventDefault();
    })
}