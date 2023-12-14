/*
A little side note for anyone reading this; I find the discussions on async/defer/DOMContentLoaded
to be pretty interesting. Lots of different opinions related to performance & reliability. I'm 
choosing to use the DOMContentLoaded event listener here as well as loading this script with the
'defer' attribute; 'defer' will allow for asynchronous script loading in the backgroundand will 
typically fire after all DOM elements are ready to be interacted with, but DOMContentLoaded provides
that extra assurance that all elements are ready, and is still plenty performant in this situation
*/
document.addEventListener("DOMContentLoaded", function() {
    attachEventListeners();
})

/*
Configure event listeners on any relevant elements ready by DOMContentLoaded
params: none
returns: none
*/
function attachEventListeners() {

    //Launch button
    document.getElementById("btn-launch").addEventListener('click', function(event) {
        launchRocket();
    })

    //Project cards Learn More button, click
    document.querySelectorAll(".info-prompt").forEach(el => {
        el.addEventListener('click', function(event) {
            handleEventClickInfoPrompt(event);
        })
    })
    
}

/*
Implementation of project info/nav btn click event handler
params:
    event: the triggering click event
returns: none
*/
function handleEventClickInfoPrompt(event) {

    //Get elements of card associated with this button
    const card = event.target.closest(".project-card");
    const back = card.querySelector(".card-back");
    const btn = card.querySelector(".info-prompt");

    //Ensure the width of the card back's content is set to the full width of the card
    back.querySelector(".details-container").style.width = (card.offsetWidth - 1) + "px";

    //Attach/detach the keyframe animations
    //Note: kf-decrease-width begins off since it triggers on page load, otherwise it stays on
    if (back.classList.contains("kf-decrease-width")) {
        back.classList.toggle("kf-increase-width");
    } else {
        back.classList.toggle("kf-increase-width");
        back.classList.toggle("kf-decrease-width");
    }

    //Transform the info / nav button
    btn.classList.toggle("info-prompt-nav-style");
    btn.querySelectorAll(".card-nav").forEach(el => {
        el.classList.toggle("hidden");
    })

}

//TODO: Use JS to retrieve and append svg icons rather than them hardcoded in html
//  so, fetch /images/svg/rocket-1.svg and use to create svg html element


//Launch rocket
function launchRocket() {

    engageThrusters();
    setTimeout(function() {
        liftoff();
    }, 1000);


}

function engageThrusters() {

    //fade in glow for 1s
    let glow = document.getElementById("glow");
    glow.style.opacity = 1;
    


}

function liftoff() {

    moveRocketToCoord("-150px");
    rotateRocket("45deg");
    resizeRocket("25px", "25px");
    fadeRocket("0.2");
    fadeLanding();
    setTimeout(function() {
        fadeRocket("0.0");
    }, 3000);

}

//Move rocket
//sidekick abstraction: moveElementToCoord
function moveRocketToCoord(top) {
    let rocketAnimation = document.getElementById("rocket-animation");
    rocketAnimation.style.top = top;
    rocketAnimation.style.right = "10px";
}

//Rotate rocket
function rotateRocket(rotation) {
    let rocketContainer = document.getElementById("rocket-container");
    rocketContainer.style.transform = "rotate(" + rotation + ")";
}

//Resize rocket
//sidekick abstraction: resizeElement
function resizeRocket(width, height) {
    let rocket = document.getElementById("rocket");
    rocket.style.width = width;
    rocket.style.height = height;
}

//Fade rocket
//sidekick abstraction: fadeUnfadeElement
function fadeRocket(opacity) {
    let rocketContainer = document.getElementById("rocket-container");
    rocketContainer.style.opacity = opacity;
}

function fadeLanding() {
    let bg = document.getElementById("landing-section-content-wrapper");
    bg.style.backgroundColor = "hsl(231deg 15% 18% / 38%)";
    // let bg = document.getElementById("landing-bg-initial");
    // bg.style.height = "0px";
    // bg.style.opacity = 0;
    // bg.style.borderRadius = "50% 50% 0 0";
}


