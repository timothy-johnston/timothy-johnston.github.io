var descriptors = getDescriptors();
$('#description-variable-1').text(descriptors[0]);

$( document ).ready(function() {

    console.log("hi!");

    //Navbar fade effect:
    //Set background opacity based on scroll position
    $(window).on("scroll", function() {
        var scrollPos = $(window).scrollTop();
        if (scrollPos <= 0) {
            $('.navbar').addClass('bg-transparent');
        } else {
            $('.navbar').removeClass('bg-transparent');
            // $('.navbar').addClass('bg-dark');
            var bgOpacity = scrollPos / 800;
            var bgStyle = "rgba(0,0,0," + bgOpacity;
            $('.navbar').css({"background":bgStyle});
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

    //Modal
    var modal = $('#myModal')[0];
    var modalOpenBtn = $('#myBtn')[0];
    var modalCloeBtn= $('.close')[0];

    //Open modal 
    modalOpenBtn.onclick = function() {
        modal.style.display = "block";
    }

    //Close modal (when x is clicked or outside the window is clicked)
    modalCloseBtn.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


});

function getDescriptors() {
    return ["Builder", "Learner", "Collaborator", "Risk Taker", "Innovator", "Friend"];
}

















