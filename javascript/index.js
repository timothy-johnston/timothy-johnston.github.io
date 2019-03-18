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

});




















