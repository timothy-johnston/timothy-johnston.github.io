var descriptors = getDescriptors();
$('#description-variable-1').text(descriptors[0]);

$( document ).ready(function() {

    document.getElementById('date').innerHTML = new Date().toDateString();

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
    var slideDescriptionInterval = window.setInterval(slideDescriptionIn, 5000);

    
    var descriptorCounter = 1;

    function slideDescriptionIn() {

            

            if ($('#description-variable-1').hasClass("slideLeftIn")) {
                $('#description-variable-1').removeClass("slideLeftIn");
                $('#description-variable-1').addClass("slideLeftOut");

                

            } else {
                $('#description-variable-1').removeClass("slideLeftOut");
                $('#description-variable-1').addClass("slideLeftIn");

            }

            $('#description-variable-1').toggle();
            $('#description-variable-1').toggle();
                
                setTimeout(function() {
                    $('#description-variable-1').toggle();
                    $('#description-variable-1').removeClass("slideLeftOut");
                    $('#description-variable-1').addClass("slideLeftIn");

                    $('#description-variable-1').text(descriptors[descriptorCounter]);
                    descriptorCounter++;
                    

                    $('#description-variable-1').toggle();
                }, 1000);

    }



});


function getDescriptors() {
    return ["Builder", "Learner", "Collaborator", "Risk Taker", "Innovator"];
}

















