var teamMemberImages = $('.team-member-img');
$.fn.isInViewPort = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return (elementTop < viewportBottom) && (elementBottom > viewportTop);
}

$(window).on('resize scroll', function() {
    teamMemberImages.each(function(){
        if($(this).isInViewPort() && $(this).attr('viewing')=="false"){
            // Case enter the viewport
            $(this).addClass('animated tada');   
            $(this).attr('viewing', "true");
        }
        else if(!$(this).isInViewPort() && $(this).attr('viewing')=="true"){
            $(this).removeClass('animated tada'); 
            // Case leave the viewport
            $(this).attr('viewing', "false");
        }
    })

});