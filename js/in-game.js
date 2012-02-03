jQuery(function(){
    // Setup draggables and droppables
    jQuery('#in_game .character').draggable({
        handle: '.name_bar',
        revert: 'invalid'
    });
    jQuery('#in_game .character_slot').droppable({
        drop: function(event, ui){
            jQuery(ui.draggable).offset(jQuery(this).offset());
        }
    });
});