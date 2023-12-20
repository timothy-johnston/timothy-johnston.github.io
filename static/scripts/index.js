/*
A little side note for anyone reading this; I find the discussions on async/defer/DOMContentLoaded
to be pretty interesting. Lots of different opinions related to performance & reliability. I'm 
choosing to use the DOMContentLoaded event listener here as well as loading this script with the
'defer' attribute; 'defer' will allow for asynchronous script loading in the backgroundand and will 
typically fire after all DOM elements are ready to be interacted with, but DOMContentLoaded provides
that extra assurance that all elements are ready, and is still plenty performant in this situation
*/
document.addEventListener("DOMContentLoaded", function() {
    attachEventListeners();
    initiateLandingPageAnimation();
})

/*
Configure event listeners on any relevant elements ready by DOMContentLoaded
params: none
returns: none
*/
function attachEventListeners() {

    //Scroll detection
    document.addEventListener("scroll", function() {
        handleScroll();
    })

    //Project cards Learn More button, click
    document.querySelectorAll(".info-prompt").forEach(el => {
        el.addEventListener('click', function(event) {
            handleEventClickInfoPrompt(event);
        })
    })
    
}

function fadeLiftoffText() {
    setTimeout(function() {
        const liftoffContainer = document.getElementById("liftoff-text-container");
        liftoffContainer.style.opacity = 0;
    }, 1000)
}

function initiateLandingPageAnimation() {

    //Get all text elements to animate, and remove their text
    //(they should begin with visibility:hidden)    
    const textIds = [
        "landing-title",
        "landing-subtitle",
        "landing-link-about",
        "landing-link-slash-1",
        "landing-link-portfolio",
        "landing-link-slash-2",
        "landing-link-contact",
        "countdown-text"
    ]

    let toAnimate = [
    ]

    for (let id of textIds) {
        let textEl = document.getElementById(id);
        let text = textEl.textContent
        toAnimate.push({
            id: id,
            textInitial: text,
            textToAdd: text.split(""),
            wordStart: true,
            classList: textEl.classList,
            fontSize: window.getComputedStyle(textEl).getPropertyValue("font-size")
        })
        textEl.textContent = ""; 
    }


    let config = {
        delayAfterChar: 75,
        delayAfterElement: 200
        // delayAfterChar: 10,
        // delayAfterElement: 10
    }
    animateText(toAnimate, config, fadeLiftoffText)

}

//toAnimate: array of objects with k:v = id:text
function animateText(toAnimateArray, config, callback) {


    const toAnimate = toAnimateArray[0];
    let upNext = document.getElementById(toAnimate.id);
    upNext.parentElement.style.visibility = "visible";
    upNext.parentElement.innerHTML += getCursorHtml(toAnimate.fontSize);

    appendLetters(toAnimateArray, config, callback);

}

//Appends individual letters
function appendLetters(toAnimateArray, config, callback) {
    let toAnimate = toAnimateArray[0];
    let textEl = document.getElementById(toAnimate.id);
    let parentEl = textEl.parentElement;
    let remainingChars = toAnimate.textToAdd;
    let nextChar = remainingChars.shift();

    if (toAnimate.wordStart) {
        const newWordElement = document.createElement("div");
        newWordElement.classList.add("animated-word");
        parentEl.insertBefore(newWordElement, parentEl.lastElementChild);
        toAnimate.wordStart = false;
    }

    if (nextChar == " ") {
        nextChar = "&nbsp;"
        toAnimate.wordStart = true;
    }



    const newCharElement = document.createElement("p");
    newCharElement.innerHTML = nextChar;
    newCharElement.classList = toAnimate.classList;
    const parentsWordContainers = parentEl.getElementsByClassName("animated-word");
    const targetWordContainer = parentsWordContainers[parentsWordContainers.length - 1];
    targetWordContainer.innerHTML += newCharElement.outerHTML;


    toAnimate.remainingChars = remainingChars;

    //Check for exit conditions
    if (remainingChars.length == 0) {
        toAnimateArray.shift();
        if (toAnimateArray.length == 0) {
            callback();
            launchRocket();
            return;
        } else {
            const animationCursor = document.getElementById("animation-cursor");
            animationCursor.remove();
            setTimeout(function() {
                animateText(toAnimateArray, config, callback)
            }, config.delayAfterElement)
            Array.from(parentsWordContainers).forEach(wordContainer => {
                wordContainer.remove();
            })
            textEl.textContent = toAnimate.textInitial;
            return;
        }
    }

    setTimeout(function() {
        appendLetters(toAnimateArray, config, callback);
    }, config.delayAfterChar)

}

function getCursorHtml(height) {
    const cursorHtml = `
        <div id="animation-cursor" class="sk-kf-blink" style="height: ` + height + `"></div>
    `
    return cursorHtml;
}

function handleScroll() {
    showHideLandingCopy();
}

//If not hidden, it is visible when getting to Projects section
function showHideLandingCopy() {

    const sectionAbout = document.getElementById("section-intro");
    let sectionAboutTop = sectionAbout.getBoundingClientRect().top;

    const idsToHide = [
        "landing-copy-container",
        "rocket-animation"
    ]
    for (let targetId of idsToHide) {
        const target = document.getElementById(targetId);
        const targetTop = target.getBoundingClientRect().top;
        if (sectionAboutTop < targetTop) {
            target.style.opacity = 0;
        } else {
            target.style.opacity = 1;
        }
    }
    
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

    //Ensure the width of the card back's content is set to the full width of the card, and leave 
    //a scrollbar gap
    back.querySelector(".details-container").style.width = (card.offsetWidth - 5) + "px";

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
    btn.classList.toggle("sk-hover-scale-sm");
    btn.querySelectorAll(".card-nav").forEach(el => {
        el.classList.toggle("hidden");
    })

}

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

    moveRocket();
    rotateRocket("65deg");
    resizeRocket("25px", "25px");
    fadeRocket("0.2");
    fadeLanding();
    setTimeout(function() {
        fadeRocket("0.0");
    }, 3000);

}

//Move rocket
//sidekick abstraction: moveElementToCoord
function moveRocket() {
    let rocketContainer = document.getElementById("rocket-container");
    rocketContainer.style.bottom = "calc(100vh + 20px)";
    rocketContainer.style.left = "calc(100vw + 50px)";
}

//Rotate rocket
function rotateRocket(rotation) {
    let rocket = document.getElementById("rocket");
    rocket.style.transform = "rotate(" + rotation + ")";
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
    let rocket = document.getElementById("rocket");
    rocket.style.opacity = opacity;
}

//Leveraging a radial gradient; will change its x position and the % position of each of the gradient's colors
function fadeLanding() {

    //Get the element of the background to change
    let bg = document.getElementById("chapter-landing");
    
    //Do some math; compute the steps to change the x and % values by, based on starting position and 
    //length of the rocket animation.
    //TODO: instead of hardcoding starting values should get dynamically here
    let gradientPctGray = 100;
    let posX = 50;
    let intervalStepMs = 10;
    let transitionDurationMs = 3000;
    let intervalStepsInDuration = transitionDurationMs / intervalStepMs;
    let gradientStepSizeGray = gradientPctGray / intervalStepsInDuration;
    let posStepSizeX = posX / intervalStepsInDuration;
    
    //Execute an interval; at each step, adjust the gradient background
    let test = setInterval(function() {

        //Compute new background values and update background style
        gradientPctGray = gradientPctGray - gradientStepSizeGray; 
        gradientPctClear = gradientPctGray + 25;
        posX = posX = posStepSizeX;
        bg.style.background = "radial-gradient(circle at " + posX + "% 99%, hsla(231, 15%, 18%, 1) " + gradientPctGray + "%, hsla(0, 0%, 100%, 0) " + gradientPctClear + "%), hsla(231, 15%, 18%, .4)";
        
        //Kill the interval once the gradient has been modified/shifted to where it is no longer visible
        if (gradientPctGray < -100) {
            clearInterval(test);
        }
        
    }, 10);

}


