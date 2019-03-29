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
            var bgOpacity = scrollPos / 500;
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

    
    //MODAL CONTROL--------------------------------------------------------------------
    var modal = $('#modal')[0];
    var modalOpenBtn = $('.btn-learn-more')[0];
    var modalCloseBtn= $('.btn-close')[0];

    //Open
    modalOpenBtn.onclick = function() {

        //Get width of portfolio card deck.
        var deckWidth = $('#portfolio-deck').css('width');

        //Potential improvement for dynamic sizing:
        //Take deckWidth / cardWidth
        //If > 3 (so, 3 cards per row, wide screen)  --> set modal width = 50%
        //If between 2 & 3 (so, 2 cards per row, medium screen) --> set modal width = 70%
        //Else (narrow screen, like mobile) --> set modal width = 97%
        
        modal.style.display = "block";
        $('.modal-content').css({"width":deckWidth});
    }

    //Close
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

















