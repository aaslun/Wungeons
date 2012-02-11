var GameManager = {};

GameManager.fadeBetween = function(fromScreen, toScreen) {
    jQuery(fromScreen).fadeOut('slow', function(){
        jQuery(toScreen).fadeIn('slow');
    })
};