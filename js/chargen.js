jQuery(function(){
    // Sparkle function
    var imgsrc = '"img/particles/sparkle.gif"'; // it will automaticaly add 1.png,2.png etc
    var particle_number = 2; //how many particles to be launched at every mouse move
    var particle_variation = 30; //randomness of the starting position
    var delay = 1; //delay bewteen mousemove
    var spark_types = 3; //how many types of spark images do we use
    var particle_life = 800; //how long the particle lasts before gone
    var death_rand = 100; //how much to spread the particles
    var particle_min_size = 10; // minimum particle starting size
    var particle_max_size = 55; //maximum particle starting size
    var last_moved = 0, now, rand, myim; //nothing to change here
    var is_running = false;
    var t;

    var sparkle = function() {
        if(!is_running) {
            is_running = true;
            $elements = jQuery('#char_gen .sparkling');
            $.each($elements, function(key, element){
                now = Math.round((new Date()).getTime());
                if (now - last_moved > delay) {
                    for (var i = 1; i <= particle_number; ++i) {
                        rand = particle_min_size + Math.floor(Math.random() * (particle_max_size - particle_min_size));
                        $('body').append('<img class="particle" src=' + imgsrc + "/>");
                        myim = $('.particle:last');
                        var vari = -Math.floor(particle_variation / 5) + Math.floor(Math.random() * particle_variation);
                        myim.css('top', jQuery(element).offset().top + (jQuery(element).height() / 2) - 20 + vari).css('left', jQuery(element).offset().left + (jQuery(element).width() / 2) - 20  + vari).css('width', rand).css('height', rand);
                        randt = $('.particle:last').offset().top - (death_rand / 2) + Math.floor(Math.random() * death_rand);
                        randl = $('.particle:last').offset().left - (death_rand / 2) + Math.floor(Math.random() * death_rand);
                        myim.animate({left:randl, top:randt, height:'toggle', width:'toggle'}, particle_life, function () {
                            $(this).remove();
                        });
                    }
                    last_moved = now;
                }
            });
            is_running = false;
            t=setTimeout(sparkle,200);
        }
    };

    var $chars = jQuery('#char_gen .character_container');
    $chars.find('.portrait').click(function(){
        clearTimeout(t);
        is_running = false;
        jQuery.each($chars.find('.portrait'), function(key, portrait){
            jQuery(portrait).removeClass('sparkling');
        });
        jQuery(this).addClass('sparkling');
        sparkle();

        // Init new character generation
        GameManager.generateCharacter(jQuery(this));
    });
});
