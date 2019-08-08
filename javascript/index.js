var descriptors = getDescriptors();
$('#description-variable-1').text(descriptors[0]);
$('#related-projects-p').hide();
$('.project-item').hide();

//Projects


$( document ).ready(function() {

    //Makes sure only the correct project description will be shown
        //This is a bit hacky.. should improve
        $('.project-description').each(function() {
            $(this).css("display","none");
        })

    /**
     * Detects Internet Explorer. Alerts user that page doesn't yet work in IE.
     * Adapted from Mario's answer here: https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie
     * 
     */
    detectIE();
    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older
            alert("Sorry, this page doesn't work in Internet Explorer yet! Try Chrome or Firefox.");
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11
            alert("Sorry, this page doesn't work in Internet Explorer yet! Try Chrome or Firefox.");
        }

        // var edge = ua.indexOf('Edge/');
        // if (edge > 0) {
        //     alert("You're using Edge.");
        // }
    }

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);


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

        //Populate related projects descriptor with the skill name
        $('#related-projects-p').text('Projects using ' + $(this).text() + ':');

        //Hide the click prompt + no projects message + project description and show the project info
        $('#skill-click-prompt').hide();
        $('#no-projects-p').hide();
        $('#related-projects-p').show();
        $('.project-description').hide();
        formatProjectButtonsBackground(null);

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

        // for (let project of projects) {
        for (var i = 0; i < projects.length; i++) {
            var project = projects[i];
            if (project.skills.includes(skill)) {

                $('#project-btn-' + (matches + 1)).show();
                $('#project-btn-' + (matches + 1)).text(project.project);

                matches++;

            }

        };

        //If skill not used in any projects, prompt to pick another
        if (matches == 0) {
            $('#related-projects-p').hide();
            $('#no-projects-p').show();
            $('#no-projects-p').text("Oops, looks like I haven't used " + skill + " in any public projects. Try another!");
        }


    }

    function getAllProjects() {

        var projectArray = [
            {
                project: "ThirstyCat: Hardware",
                skills: ["Raspberry Pi", "Python", ""]
            },
            {
                project: "ThirstyCat: Web App",
                skills: ["Java", "Spring Boot", "JSP", "Hibernate", "Server-Side Development", "MySQL", "Front-End Development", "Web Design", "RESTful API Design", "Object Oriented Programming", "Data Analysis", "Javascript", "HTML", "CSS", "Bootstrap", "jQuery", "JUnit", "Test Driven Development", "Git", "Relational Databases"]
            },
            {
                project: "Personal Portfolio Page",
                skills: ["HTML", "CSS", "Javascript", "Front-End Development", "Web Design", "jQuery", "Bootstrap", "Git"]
            },
            {
                project: "GradientBox",
                skills: ["Python", "Object Oriented Programming", "Git", "Django", "Server-Side Development", "Front-End Development", "Web Design", "RESTful API Design", "Javascript", "HTML", "CSS", "Bootstrap", "jQuery", "Relational Databases"]
            },
            {
                project: "WeatherViz",
                skills: ["Java", "Spring MVC", "JSP", "Object Oriented Programming", "Agile", "Git", "Server-Side Development", "Front-End Development", "HTML", "CSS", "Javascript", "PostgreSQL", "Relational Databases"]
            },
            {
                project: "Nat'l Parks Weather Update",
                skills: ["Java", "Object Oriented Programming", "Server-Side Development", "PostgreSQL", "Automated Testing", "Git", "Relational Databases"]
            }
        ];

        return projectArray;

    }
    //-----end show related projects--------------------------------------------------------
    
    //MODAL CONTROL-----start---------------------------------------------------------------
    //Open on click of portfolio "learn more" button
    $('.btn-learn-more').click(function() {
        
        var modalBtnId = $(this).attr('id');
        var modalId = "modal" + modalBtnId.substring(3);
        console.log(modalId);

        formatProjectButtonsBackground(null);

        $('#project-description-container-2').append($('.project-descriptions'));

        openModal(modalId);

    });

    //Open on click of related project button
    $('.project-item').click(function() {
        var project = $(this).text();

        //Apply color background to button when clicked
        formatProjectButtonsBackground($(this));

        //Get correct modal id based on project button clicked
        var modalID = getModalID(project);

        $('#project-description-container-1').append($('.project-descriptions'));

        openModal(modalID);
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

    //Modify project button background based on click
    function formatProjectButtonsBackground(clickedButton) {
        $('.project-item').each(function() {
            $(this).css("background","transparent");
        })

        if (clickedButton != null) {
            clickedButton.css("background", "linear-gradient( -45deg, #FFDA3B 0%, #DB3C6D 100%)");
        }
    }

    //Open modal
    function openModal(modalId) {

        //Makes sure only the correct project description will be shown
        //This is a bit hacky.. should improve
        $('.project-description').each(function() {
            $(this).css("display","none");
        })

        //Blur background content
        // $('#blur-me').addClass("blur");

        //Get width of portfolio card deck.
        var deckWidth = $('#portfolio-deck').css('width');

        //Get correct modal based on ID
        var modal = $('#' + modalId)[0];
        console.log("In openModal function now. Modal ID: " + modalId);


        //Potential improvement for dynamic sizing:
        //Take deckWidth / cardWidth
        //If > 3 (so, 3 cards per row, wide screen)  --> set modal width = 50%
        //If between 2 & 3 (so, 2 cards per row, medium screen) --> set modal width = 70%
        //Else (narrow screen, like mobile) --> set modal width = 97%
        
        
        modal.style.display = "block";
        //This js is causing issues on mobile (android)
        // $('.modal-content').css({"width":deckWidth});

        var scrollPos = $(window).scrollTop() + 30;
        var siteHeight = $(document).height();

        document.documentElement.style.setProperty('--modal-content-width-desktop', deckWidth);
        document.documentElement.style.setProperty('--modal-content-top-mobile', scrollPos + 'px');
        document.documentElement.style.setProperty('--modal-height-mobile', siteHeight + 'px'); 

        




    }

    //Close modal and unblur background
    function closeModal() {
        // $('#blur-me').removeClass("blur");
        $('.project-description').each(function() {
            $(this).css("display","none");
        })
        formatProjectButtonsBackground(null);
    }

    function getModalID(project) {

        //For now just hardcoding the possible cases
        //Should look to improve this though

        projects = getAllProjects();
        var modalID;

        switch(project) {
            case projects[0].project:
                modalID = "modal-TC-hard";
                break;
            case projects[1].project:
                modalID = "modal-TC-soft";
                break;
            case projects[2].project:
                modalID = "modal-portfolio-tj";
                break;
            case projects[3].project:
                modalID = "modal-GB";
                break;
            case projects[4].project:
                modalID = "modal-WV";
                break;
            case projects[5].project:
                modalID = "modal-NPR";
                break;     
        }

        return modalID;

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

















