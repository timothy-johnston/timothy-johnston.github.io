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

    //Project cards Learn More button, click
    document.querySelectorAll(".info-prompt").forEach(el => {
        el.addEventListener('click', function(event) {
            handleEventClickInfoPrompt(event);
        })
    })
}

function handleEventClickInfoPrompt(event) {

    //Get collapsible content of card associated with this button
    const btnLearnMore = event.target;
    const cardContainer = event.target.closest(".card-content");
    const page2 = cardContainer.querySelector(".page-2");

    //Flip the "collapse-unhidden" class to show or hide this content
    page2.classList.toggle("collapse-unhidden");

    //Change the text of the learn more button
    const newText = (page2.classList.contains("collapse-unhidden")) ? "Stop Learning More" : "Learn More";
    const textElement = cardContainer.querySelector(".info-prompt-text");
    textElement.textContent = newText;

}