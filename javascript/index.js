var descriptors = getDescriptors();
$('#description-variable-1').text(descriptors[0]);
$('#related-projects-p').hide();
$('.project-item').hide();

//Projects


$( document ).ready(function() {

    var scrollPos = $(window).scrollTop();

    //Set navbar border width based on scroll position on page load
    var aspectRatio = $(window).width() / ($(window).height() - $("#navbar").height());
    var borderWidth = aspectRatio * scrollPos;
    var marginLeft = ($(window).width() - borderWidth) / 2
    $('#nav-border-div').width(borderWidth);
    $('#nav-border-div').css({"margin-left":marginLeft});

    // $('#nav-background-div').width(borderWidth);
    // $('#nav-background-div').css({"margin-left":marginLeft});

    //Control navbar border width
    //Set border width based on scroll position
    $(window).on("scroll", function() {
        scrollPos = $(window).scrollTop();
        var aspectRatio = $(window).width() / ($(window).height() - $("#navbar").height());
        var borderWidth = aspectRatio * scrollPos;
        var marginLeft = ($(window).width() - borderWidth) / 2
        $('#nav-border-div').width(borderWidth);
        $('#nav-border-div').css({"margin-left":marginLeft});

        // $('#nav-background-div').width(borderWidth);
        // $('#nav-background-div').css({"margin-left":marginLeft});
    });

    //Show related projects when skill item is clicked -----start---------------------------
    $('.skill-item').click(function() {

        //Hide the click prompt + no projects message and show the project info
        $('#skill-click-prompt').hide();
        $('#no-projects-p').hide();
        $('#related-projects-p').show();

        var skill = $(this).text();
        updateRelatedProjects(skill);
    });

    //This function determines the related projects and updates the UI
    function updateRelatedProjects(skill) {
        
        //Hide/reset existing projects
        $('.project-item').hide();

        //Check if the related projects section is showing. If not, show it.
        if (!$('#related-projects-p').is(":visible")) {
            $('#related-projects-p').toggle();
        }

        //Loop through all projects. If project uses skill, add project to list
        var projects = getAllProjects();
        var matches = 0;

        for (let project of projects) {
            if (project.skills.includes(skill)) {

                $('#project-btn-' + (matches + 1)).show();
                $('#project-btn-' + (matches + 1)).text(project.project);

                matches++;

            }

        }

        //If skill not used in any projects, prompt to pick another
        if (matches == 0) {
            $('#no-projects-p').show();
            $('#no-projects-p').text("Oops, looks like I haven't used " + skill + " in any public projects. Try another!");
        }


    }

    function getAllProjects() {

        var projectArray = [
            {
                project: "ThirstyCat: Hardware",
                skills: ["Raspberry Pi", "Python", "Server-Side Development"]
            },
            {
                project: "ThirstyCat: Software",
                skills: ["Java", "Spring Boot", "JSP", "Server-Side Development", "PostgreSQL", "Front-End Development", "Web Design", "RESTful API Design", "Object Oriented Programming", "Data Analysis", "Javascript", "HTML", "CSS", "Bootstrap", "jQuery", "JUnit"]
            },
            {
                project: "Personal Portfolio Page",
                skills: ["HTML", "CSS", "Javascript", "Front-End Development", "Web Design", "jQuery", "Bootstrap", "Git"]
            },
            {
                project: "Virtual Interview",
                skills: ["Java", "Object Oriented Programming", "Git"]
            },
            {
                project: "WeatherViz",
                skills: ["Java", "Spring MVC", "JSP", "Object Oriented Programming", "Agile", "Git", "Server-Side Development", "Front-End Development", "HTML", "CSS", "Javascript", "PostgreSQL"]
            },
            {
                project: "Nat'l Parks Reservation",
                skills: ["Java", "Object Oriented Programming", "Server-Side Development", "PostgreSQL", "Git"]
            }
        ];

        return projectArray;

    }

    //-----end show related projects--------------------------------------------------------
    
    //MODAL CONTROL-----start---------------------------------------------------------------
    //Open on button click
    $('.btn-learn-more').click(function() {
        
        var modalBtnId = $(this).attr('id');
        var modalId = "modal" + modalBtnId.substring(3);
        console.log(modalId);

        openModal(modalId);

    });

    //Close on click outside the modal
    $('.modal').click(function(click) {
        if ($(click.target).hasClass('modal')) {
            closeModal();
        }
    })

    //Close on close-button click
    $('.btn-close').click(function() {
        closeModal();
    })

    //Open modal
    function openModal(modalId) {

        //Blur background content
        $('#blur-me').addClass("blur");

        //Get width of portfolio card deck.
        var deckWidth = $('#portfolio-deck').css('width');

        //Get correct modal based on ID
        var modal = $('#' + modalId)[0];
        console.log("In openModal function now")


        //Potential improvement for dynamic sizing:
        //Take deckWidth / cardWidth
        //If > 3 (so, 3 cards per row, wide screen)  --> set modal width = 50%
        //If between 2 & 3 (so, 2 cards per row, medium screen) --> set modal width = 70%
        //Else (narrow screen, like mobile) --> set modal width = 97%
        
        modal.style.display = "block";
        $('.modal-content').css({"width":deckWidth});

    }

    //Close modal and unblur background
    function closeModal() {
        $('#blur-me').removeClass("blur");
        $('.modal').each(function() {
            $(this).css("display","none");
        })
    }
    //MODAL CONTROL-----end---------------------------------------------------------------

});

function getDescriptors() {
    return ["Builder", "Learner", "Collaborator", "Risk Taker", "Innovator", "Friend"];
}








//Not using yet/anymore

//Collapse menu background
console.log($('#collapse-button').css('display'));
if ($('#collapse-button').css('display') == 'none') {
    // $('#collapse-menu').css({"background":"transparent"});
    // $('#collapse-menu').css({"border":"none"});
}

// //Change the text
// var slideDescriptionInterval = window.setInterval(descriptionAnimateControl, 5000);

    
// var descriptorCounter = 1;

// function descriptionAnimateControl() {

//         if ($('#description-variable-1').hasClass("fadeIn")) {
//             $('#description-variable-1').removeClass("fadeIn");
//             $('#description-variable-1').addClass("fadeOut");

//         } else {
//             $('#description-variable-1').removeClass("fadeOut");
//             $('#description-variable-1').addClass("fadeIn");

//         }

//         $('#description-variable-1').toggle();
//         $('#description-variable-1').toggle();
            
//         setTimeout(function() {
//             $('#description-variable-1').toggle();
//             $('#description-variable-1').removeClass("fadeOut");
//             $('#description-variable-1').addClass("fadeIn");

//             $('#description-variable-1').text(descriptors[descriptorCounter]);
//             descriptorCounter++;
            

//             $('#description-variable-1').toggle();
//         }, 1000);

//         if (descriptorCounter == descriptors.length) {
//             descriptorCounter = 0;
//         }
// }



    //Set navbar opacity and nav-item color based on scroll position on page load
    // var minOpacity = .999;
    // var scrollPos = $(window).scrollTop();
    // var bgOpacity = scrollPos / 500;
    // bgOpacity = (bgOpacity > minOpacity) ? bgOpacity : minOpacity;
    // var bgStyle = "rgba(0, 0, 0," + bgOpacity;
    // var textColorRGB_initial = [41, 16, 23];
    // var textColorRGB_delta = [180, 69, 100];
    // var scrollPosToHeightRatio = (scrollPos / $(window).height());
    // var rgbDeltaFactor = (scrollPosToHeightRatio <=1) ? scrollPosToHeightRatio : 1;
    // var textColorRgbToSet = [(rgbDeltaFactor * textColorRGB_delta[0]) + textColorRGB_initial[0], (rgbDeltaFactor * textColorRGB_delta[1]) + textColorRGB_initial[1], (rgbDeltaFactor * textColorRGB_delta[2]) + textColorRGB_initial[2]]
    // var textColorRgbCss = "rgba(" + textColorRgbToSet[0] + ", " + textColorRgbToSet[1] + ", " + textColorRgbToSet[2] + ")";
    // // $('.navbar').css({"background":"transparent"});
    // $('.color-transition').css({'color':textColorRgbCss});
    // $('#nav-background-div').css({"opacity":bgOpacity});

    // //Control navbar fade effect:
    // //Set opacity and text color based on scroll position
    // $(window).on("scroll", function() {
    //     scrollPos = $(window).scrollTop();
    //     console.log("Scroll position is: " + scrollPos);
    //     if (scrollPos <= 0) {
    //         // $('.navbar').addClass('bg-transparent');
    //     } else {
    //         // $('.navbar').removeClass('bg-transparent');
    //         bgOpacity = scrollPos / 500;
    //         bgOpacity = (bgOpacity > minOpacity) ? bgOpacity : minOpacity;
    //         bgStyle = "rgba(0, 0, 0," + bgOpacity;
    //         // $('.navbar').css({"background":bgStyle});
    //         $('#nav-background-div').css({"opacity":bgOpacity});
    //     }

    //     var scrollPosToHeightRatio = (scrollPos / $(window).height());
    //     var rgbDeltaFactor = (scrollPosToHeightRatio <=1) ? scrollPosToHeightRatio : 1;
    //     var textColorRgbToSet = [(rgbDeltaFactor * textColorRGB_delta[0]) + textColorRGB_initial[0], (rgbDeltaFactor * textColorRGB_delta[1]) + textColorRGB_initial[1], (rgbDeltaFactor * textColorRGB_delta[2]) + textColorRGB_initial[2]]
    //     var textColorRgbCss = "rgba(" + textColorRgbToSet[0] + ", " + textColorRgbToSet[1] + ", " + textColorRgbToSet[2] + ")";
    //     // $('.color-transition').css({'color':textColorRgbCss});

    // });

        // //HIDE/SHOW PORTFOLIO & RESUME CONTENTS-----start--------------------------------------
        // $('#btn-portfolio').click(function() {
        //     console.log("hello friend");
        //     $('#fade-preview-portfolio').toggle();
    
        //     var iconRight = $('.rotating-icon-portfolio-right');
        //     var iconLeft = $('.rotating-icon-portfolio-left');
    
        //     if (iconRight.hasClass("rotate-ccw-180")) {
    
        //         iconRight.addClass("rotate-cw-0");
        //         iconRight.removeClass("rotate-ccw-180");
    
        //         iconLeft.addClass("rotate-ccw-0");
        //         iconLeft.removeClass("rotate-cw-180");
    
        //     } else if (iconRight.hasClass("rotate-cw-0")) {
    
        //         iconRight.addClass("rotate-ccw-180");
        //         iconRight.removeClass("rotate-cw-0");
    
        //         iconLeft.addClass("rotate-cw-180");
        //         iconLeft.removeClass("rotate-ccw-0");
    
        //     } else {
        //         iconRight.addClass("rotate-ccw-180");
        //         iconLeft.addClass("rotate-cw-180");
        //     }
    
        // })
    
        // $('#btn-experience').click(function() {
        //     console.log("hello friend");
        //     $('#fade-preview-experience').toggle();
    
    
        //     var iconRight = $('.rotating-icon-experience-right');
        //     var iconLeft = $('.rotating-icon-experience-left');
    
        //     if (iconRight.hasClass("rotate-ccw-180")) {
    
        //         iconRight.addClass("rotate-cw-0");
        //         iconRight.removeClass("rotate-ccw-180");
    
        //         iconLeft.addClass("rotate-ccw-0");
        //         iconLeft.removeClass("rotate-cw-180");
    
        //     } else if (iconRight.hasClass("rotate-cw-0")) {
    
        //         iconRight.addClass("rotate-ccw-180");
        //         iconRight.removeClass("rotate-cw-0");
    
        //         iconLeft.addClass("rotate-cw-180");
        //         iconLeft.removeClass("rotate-ccw-0");
    
        //     } else {
        //         iconRight.addClass("rotate-ccw-180");
        //         iconLeft.addClass("rotate-cw-180");
        //     }
        // })
        // //HIDE/SHOW PORTFOLIO & RESUME CONTENTS-----end--------------------------------------

















