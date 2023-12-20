/* 
----------------------------------------------------------------------------------------------------
Section: Page Initialization
    Trigger any functionality dependant on page / DOM loading, such as attaching event listeners
----------------------------------------------------------------------------------------------------
*/

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

/* 
----------------------------------------------------------------------------------------------------
Section: Implementations
    Listener implementations, utility methods, etc
----------------------------------------------------------------------------------------------------
*/

//Passed as callback function to the text animation flow; executes after all text has been "typed"
function handleTextAnimationCompletion() {
    launchRocket();
    fadeLiftoffText();
}

//Configure & kick off the typing animation flow
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

    //Store animation configuration in toAnimate array (array of objects; each object holds the
    //metadata needed to run the animation for that text element)
    let toAnimate = [];
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

    //Config object may eventually hold more config parameters; for now, we set the typing speed 
    //between letters and the individual text elements
    let config = {
        delayAfterChar: 75,
        delayAfterElement: 200
        // delayAfterChar: 10,
        // delayAfterElement: 10
    }

    //Kick off the animation
    animateText(toAnimate, config, handleTextAnimationCompletion)

}

//Accepts an array of elements to animate the text of, as well as the configuration parameters
//and a callback function to execute after the animation has fully completed
//Note: this is a recursive flow; afer the first text element has been fully "typed" out, it will
//be shifted out of the toAnimateArray, and this same method will be called on the new toAnimateArray
//so that the next text element may be typed out
function animateText(toAnimateArray, config, callback) {

    //Get the first element to animate
    const toAnimate = toAnimateArray[0];
    let upNext = document.getElementById(toAnimate.id);

    //Display the element and append the cursor element
    upNext.parentElement.style.visibility = "visible";
    upNext.parentElement.innerHTML += getCursorHtml(toAnimate.fontSize);

    //Begin "typing" the letters
    appendLetters(toAnimateArray, config, callback);

}

//Appends individual letters (one letter at a time, and then recursively calls itself to type the
//next letter)
//Note: this method is part of the recursive flow; it checks the "textToAdd" array of the first
//text element of the toAnimateArray, types that letter, removes that letter from "textToAdd", and
//then calls itself. After all letters have been typed for that text element, it shifts that text
//element out of the toAnimateArray and then calls "animateText" to begin typing out the next text 
//element
function appendLetters(toAnimateArray, config, callback) {

    //Get the text element to animate, as well as its parent element and the letter that needs to
    //be typed
    let toAnimate = toAnimateArray[0];
    let textEl = document.getElementById(toAnimate.id);
    let parentEl = textEl.parentElement;
    let remainingChars = toAnimate.textToAdd;
    let nextChar = remainingChars.shift();

    //Encapsulte each individual word in a div to help with handling spaces
    if (toAnimate.wordStart) {
        const newWordElement = document.createElement("div");
        newWordElement.classList.add("animated-word");
        parentEl.insertBefore(newWordElement, parentEl.lastElementChild);
        toAnimate.wordStart = false;
    }

    //Check if the character to type is a space; if so, encode
    if (nextChar == " ") {
        nextChar = "&nbsp;"
        toAnimate.wordStart = true;
    }

    //"Type" the letter. ie, append it to the page
    //Note the retrieval and assignment of the classlist; this is to ensure all typed letters
    //maintain the class they started with
    const newCharElement = document.createElement("p");
    newCharElement.innerHTML = nextChar;
    newCharElement.classList = toAnimate.classList;
    const parentsWordContainers = parentEl.getElementsByClassName("animated-word");
    const targetWordContainer = parentsWordContainers[parentsWordContainers.length - 1];
    targetWordContainer.innerHTML += newCharElement.outerHTML;

    //Update the "remainingChars" array now that the current letter has been shifted off
    toAnimate.remainingChars = remainingChars;

    //Check for recursion exit conditions
    //  Condition: There are no more remaining characters to type for this current text element
    //      If this is the case, check for:
    //          Condition: There are no more text elements to type the characters for
    //              If this is the case, execute the callback function that has been provided
    //              If this is not the case, shift the current text element off of the toAnimateArray
    //                  and then call animateText to begin animating the next text element
    //      If this is not the case, recursively call this same function to continue
    if (remainingChars.length == 0) {

        toAnimateArray.shift();

        if (toAnimateArray.length == 0) {
            callback();
            return;
        } else {

            //Remove the text animation cursor
            const animationCursor = document.getElementById("animation-cursor");
            animationCursor.remove();

            //Call animateText to begin animating the next text element
            setTimeout(function() {
                animateText(toAnimateArray, config, callback)
            }, config.delayAfterElement)

            //Revert the text to the initial text container, instead of the individual div and p
            //tags created as part of this flow
            Array.from(parentsWordContainers).forEach(wordContainer => {
                wordContainer.remove();
            })
            textEl.textContent = toAnimate.textInitial;

            return;

        }
    }

    //Recursively call this method to begin typing the next letter
    setTimeout(function() {
        appendLetters(toAnimateArray, config, callback);
    }, config.delayAfterChar)

}

//Generates the html required to display the text animation cursor
function getCursorHtml(height) {
    const cursorHtml = `
        <div id="animation-cursor" class="sk-kf-blink" style="height: ` + height + `"></div>
    `
    return cursorHtml;
}

//Scroll event handler; triggers any other methods required to run on a scroll
function handleScroll() {
    showHideLandingCopy();
}

//Hide the landing page text if page is scrolled beyond the landing page, since it is position fixed
//and would otherwise be visible once scrolling to the projects section
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

//Trigger all methods that must run as part of the rocket animation
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

//Fade liftoff countdown
function fadeLiftoffText() {
    setTimeout(function() {
        const liftoffContainer = document.getElementById("liftoff-text-container");
        liftoffContainer.style.opacity = 0;
    }, 1000)
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


