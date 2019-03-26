var descriptors = getDescriptors();
$('#description-variable-1').text(descriptors[0]);

$( document ).ready(function() {

    console.log("hi!");

    //Enable/disable navbar dark background based on scroll location
    //Code example: https://stackoverflow.com/questions/46503011/how-to-make-navbar-background-appear-when-scrolling-down-but-disappear-when-scr
    $(window).on("scroll", function() {
        var scrollPos = $(window).scrollTop();
        if (scrollPos <= 0) {
            $('.navbar').addClass('bg-transparent');
            $('.navbar').removeClass('bg-dark');
        } else {
            $('.navbar').removeClass('bg-transparent');
            $('.navbar').addClass('bg-dark');
        }
    });

    //Change the text
    var slideDescriptionInterval = window.setInterval(descriptionAnimateControl, 5000);

    
    var descriptorCounter = 1;

    function descriptionAnimateControl() {

            if ($('#description-variable-1').hasClass("fadeIn")) {
                $('#description-variable-1').removeClass("fadeIn");
                $('#description-variable-1').addClass("fadeOut");

            } else {
                $('#description-variable-1').removeClass("fadeOut");
                $('#description-variable-1').addClass("fadeIn");

            }

            $('#description-variable-1').toggle();
            $('#description-variable-1').toggle();
                
            setTimeout(function() {
                $('#description-variable-1').toggle();
                $('#description-variable-1').removeClass("fadeOut");
                $('#description-variable-1').addClass("fadeIn");

                $('#description-variable-1').text(descriptors[descriptorCounter]);
                descriptorCounter++;
                

                $('#description-variable-1').toggle();
            }, 1000);

            if (descriptorCounter == descriptors.length) {
                descriptorCounter = 0;
            }
    }


    // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


});

function getDescriptors() {
    return ["Builder", "Learner", "Collaborator", "Risk Taker", "Innovator", "Friend"];
}

















