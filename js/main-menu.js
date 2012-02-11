jQuery(function() {
    var $menu_items = jQuery('#main_menu .options_container a');
    $menu_items.eq(0).click(function(){
        GameManager.fadeBetween('#main_menu','#char_gen');
    });
});