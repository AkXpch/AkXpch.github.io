
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

//--------------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------------

//OnlineTutorials(2026), Drag and Drop with JavaScript, https://www.youtube.com/watch?v=V_WEpWhpzwA
//Use in Drag and Drop function
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

//! BUTTONS CAN ONLYY DRAG IN ORDER FROM TOP TO BOTTOM.
function placeButton(button, guide, nextButton, nextGuide){
    guide.addEventListener("drop", function(event){
        event.preventDefault();
        // Gemini(2026) is used in this process
        // Promp: " I have the exact location for my object to be, is there anyway i can detect the position and tell object to be there"
        // Answer: One way you can do it is use offset... to detect object's position.

        // Move right,left to position
        // set where the red button to be on top of guide button
        //note = offset.... is use to read position
        button.style.left = guide.offsetLeft + "px";
        button.style.top = guide.offsetTop +"px";
        button.style.width = guide.offsetWidth +"px";

        // When red button is in correct position -> can't move anymore
        button.draggable = false;
        //Hide the guide button
        guide.style.display = "none";

        //make the next red button moveable
        if (nextButton != null){
            nextButton.draggable = true;
        }

        //show the next guide 
        if (nextGuide != null){
            nextGuide.style.display = "block";
        }



    })
}

//Use function
//tell guide button to let red button drop on it
drop(guide1);
drop(guide2);
drop(guide3);

// tell position of where red button should be drop to
// placeButton(button, guide, nextButton, nextGuide)
placeButton(button1, guide1, button2, guide2);
placeButton(button2, guide2, button3, guide3);
placeButton(button3, guide3, null, null);

//PROBLEM - The red button change it shape while dragging - 
// -I still cannot find the way to keep it shape to stay as it show while the player dragging it

//-----------------------------------------------------------------------------------------------

// SCENE 3 - DRAG SUN DOWN -> MOON UP
//STEP
//1. sun down -> sky darker / sun dowm -> moon move up
//2. sun reach bottom -> change to scene 4
// CodeGrind(2020), "How to create a Draggable Element for your web-page using JS and CSS? Complete tutorial | Code Grind", https://www.youtube.com/watch?v=AtLFLSG8YXw
// AI is used in this section with tutorial video.

const sky = document.getElementById("sky");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
const moonStart = moon.offsetTop;

let dragging = false;
let nightAnimation = false;

let dragStartY= 0; //mouse Y position when start draggging
let sunStartY = 0; //sun position when dragging start
//Dragging sun down

sun.addEventListener("pointerdown", function(event){
    //if the night animation activate-> cannot drag again
    if (nightAnimation == true){
    }

    dragging = true;
    dragStartY= event.clientY; 
    sunStartY = sun.offsetTop; 

    sun.setPointerCapture(event.pointerId); // captures the pointer interaction.

    event.preventDefault(); // tell browser not do default interaction
});
// Set the boundary line of sky so the element only move inside window
//find Top and bottom of the sky
const skyTop = sky.offsetTop;
const skyBottom = sky.offsetTop + sky.offsetHeight;

// sun start and end position
const sunStart = sun.offsetTop;
const sunEnd =  moonStart;
// Change sky colour while moving the sun
// ChantGPT(2026) is used in this code.
// Promp: "How can I make bg colour change as I dragging object, css, js", "How to make another object move up when i drag another object(image) down, js, html, css"

//this function will pointer move while interact with the sun
sun.addEventListener("pointermove", function(event){
    
    //if player not drag = sun not move
    if(dragging == false){
        return;
    }
    //find how much pointer have moved
    let movement = event.clientY - dragStartY;
    //where the sun should move - we do this bc the pointer might not be exactlyb on top of the sun when player dragging
    let newSunY = sunStartY + movement;

    // Note: vertical -> larger when move down
    //check if new position smaller than previous one, so sun cannot move up only move down
    if (newSunY < sunStart){
        newSunY = sunStart;
    }
    //prevent sun from moving below the window flame
    if (newSunY > sunEnd){
        newSunY = sunEnd;
    }
    // make the sun move by changing "top" in css
    sun.style.top = newSunY + "px";
   
    // sunMove = how far the sun has moved
    let sunMove = newSunY - sunStart;

    // Move the moon upwards
    let moonNewY = moonStart - sunMove;
    moon.style.top = moonNewY + "px";

   



    // travel = How far sun travel from the original position/ total distance the sun can traavel
    let travel = (newSunY - sunStart)/(sunEnd - sunStart);

    // 0 = starting point | 0.5 = the sun half way down | 1 = the sun has reach the bottom
    //make sure it wont go below 0
    if (travel < 0) {
        travel = 0;
    }
    // value only between 0 to 1, so we make sure the valuw wont go above 1
    if (travel > 1){
        travel = 1;
    }
    // Make the moon gradually show up
    moon.style.opacity = travel;
    // Make the sun gradually disappear
    sun.style.opacity = 1 - travel;


    //CHANGE SKY FROM SUN TO NIGHT (pink -> navy)
    if (travel < 0.5) {
        sky.style.backgroundColor = "#ffd4c6";
    } else {
        sky.style.backgroundColor = "#24385e";
    }

    // Check if sun reach buttom
//check if the sun traveln down to the bottom(1) and have the animation start yet?
if (travel >= 1 && nightAnimation == false){
    //make the night animation start and fix the sun position so player cannot move
    nightAnimation = true;
    dragging = false;

    // WHEN THE SUN REACH THE BOTTOM -> MAKE IT DISAPEAR
    sun.style.transition = "opacity 0.15s";
    sun.style.opacity = "0"; // 0 = invisible , 1 = visible

    // The moon fully show up
    moon.style.transition = "opacity 0.15s, top 0.7s ease-out";
    moon.style.opacity = "1";
    // the moon move up to where the sun was
    moon.style.top = sunStart + "px";

    //call function and move to next scene
    setTimeout(function() {
        nextScene(nightScene, lightScene);
    }, 850);
}

});

//SCENE 4 - LIGHT OFF
// C. Thomas (personal communication, October 6, 2026), The code used to create puling switch.

const pullerSwitch = document.getElementById("pullerSwitch");
const darkFilter = document.getElementById("dark-filter");
const lamp = document.getElementById("lamp");
const ctx = pullerSwitch.getContext("2d"); // drawing tool

// Set the canvas size to match Scene 4
pullerSwitch.width = pullerSwitch.offsetWidth;
pullerSwitch.height = pullerSwitch.offsetHeight;

let pulling = false;

const weightPos = { y: pullerSwitch.height * 2 / 4 }; // Set starting position of pulling switch
const targetPos = { y: pullerSwitch.height * 2 / 4 }; // where the switch return to
const velocity  = { y: 0 }; // switch movement
const mousePos  = { y: 0 }; // mouse position

// START DRAWING

function drawFrame(){
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, pullerSwitch.width, pullerSwitch.height);

    //string starting point
    const stringX = pullerSwitch.width / 3.4; //left or right

    // Draw the string
    ctx.strokeStyle = "#f4b509";
    ctx.lineWidth = 5;

    const linkLength = weightPos.y / 300; // how many dash per line
    ctx.setLineDash([linkLength, linkLength]);

    ctx.beginPath();
    ctx.moveTo(stringX, 0);
    ctx.lineTo(stringX, weightPos.y);
    ctx.stroke();

    // Stop using the dashed line style
    ctx.setLineDash([]);

    // Draw the pink handle
    ctx.fillStyle = "#f0174d";

    //draw circle as the top part of handle
    ctx.beginPath();
    ctx.arc(stringX, weightPos.y, 12, 0, Math.PI * 2);
    ctx.fill();
    //draw oval as the bottom part of handle
    ctx.beginPath();
    ctx.ellipse(stringX, weightPos.y + 20, 10, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(drawFrame);
}
//call function - draw the switch 
requestAnimationFrame(drawFrame);
