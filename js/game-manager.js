var GameManager = {};

GameManager.currentStatus = {};

GameManager.fadeBetween = function(fromScreen, toScreen) {
    jQuery(fromScreen).fadeOut(1000, function(){
        jQuery(toScreen).fadeIn(1000);
    })
};

GameManager.generateCharacter = function($char) {
    GameManager.currentStatus = { isGeneratingCharacter: true };

    var $infoWrapper = jQuery('#char_gen .info_wrapper'),
        character = new Character($char.attr('id')),
        $anchor, self = this;

    // STEP 1: Select alignment
    var $step1_alignment = jQuery('<p><strong>Select alignment for this character:</strong></p>');
    for(var a in Characters.ALIGNMENT) {
        $anchor = jQuery('<a href="#"></a>')
                .click(function(){
                    character.alignment = jQuery(this).text();
                    generateRace();
                });
        $step1_alignment.append(jQuery('<p></p>').append($anchor.append(Characters.ALIGNMENT[a])));
    }
    $infoWrapper.html($step1_alignment);

    // Step 2: Select race
    var generateRace = function(){
        var $step2_race = jQuery('<p><strong>Select race:</strong></p>');
        for(var r in Characters.RACE) {
            $anchor = jQuery('<a href="#"></a>')
                    .click(function(){
                        character.race = jQuery(this).text();
                    });
            $step2_race.append(jQuery('<p></p>').append($anchor.append(Characters.RACE[r])));
        }
        $infoWrapper.html($step2_race);
    };
    GameManager.currentStatus = { isGeneratingCharacter: false };
};

function Character(id) {
    this.id = id;
    this.name = '';
    this.race = '';
    this.xp = 0;
    this.level = 0;
    this.alignment = '';
}

var Characters = {};

Characters.RACE = {
    HUMAN : 'Human',
    ELF : 'Elf',
    HALF_ELF : 'Half-elf',
    DWARF : 'Dwarf',
    HALFLING : 'Halfling',
    GNOME : 'Gnome'
};

Characters.CLASS = {
    FIGHTER : 'Fighter',
    THIEF : 'Thief',
    RANGER : 'Ranger',
    PALADIN : 'Paladin',
    CLERIC : 'Cleric',
    MAGE : 'Mage'
};

Characters.ALIGNMENT = {
    LAWFUL_GOOD : 'Lawful Good',
    LAWFUL_NEUTRAL : 'Lawful Neutral',
    LAWFUL_EVIL : 'Lawful Evil',
    NEUTRAL_GOOD : 'Neutral Good',
    TRUE_GOOD : 'True Good',
    NEUTRAL_EVIL : 'Neutral Evil',
    CHAOTIC_GOOD : 'Chaotic Good',
    CHAOTIC_NEUTRAL : 'Chaotic Neutral',
    CHAOTIC_EVIL : 'Chaotic Evil'
};

var Spells = {};

Spells.DURATION = {
    INSTANT: 0,
    SHORT: 1,
    MEDIUM: 3,
    LONG: 6,
    UNTIL_HIT: 'Until hit',
    INFINITE: -1
};

Spells.TYPE = {
    HEALING: 1,
    OFFENSIVE: 2,
    DEFENSIVE: 3,
    SPECIAL: 4
};

Spells.RANGE = {
    NONE: 0,
    CLOSE: 1,
    MEDIUM: 2,
    FAR: 10
};

Spells.AREA_OF_EFFECT = {
    CASTER: 0,
    ONE: 1,
    TWO: 2,
    SQUARE: 4,
    PARTY: 'Party',
    INVENTORY: 'Inventory',
    OBJECT: 'Object'
};

Spells.MAGE = {
    LEVEL_1: {
        ARMOR: {
            NAME:'Armor',
            DESCRIPTION: 'A magical field that surrounds one character as a protective chain mail.',
            TYPE:Spells.TYPE.DEFENSIVE,
            RANGE:Spells.RANGE.NONE,
            EFFECT:Spells.AREA_OF_EFFECT.ONE,
            DURATION: Spells.DURATION.MEDIUM,
            VALUE: {MIN: 8, MAX: 8},
            BONUS: '+1'
        },
        BURNING_HANDS: {
            NAME:'Burning Hands',
            DESCRIPTION: 'Produces a jet of searing flames that shoots from the casters fingertips.',
            TYPE:Spells.TYPE.OFFENSIVE,
            RANGE:Spells.RANGE.CLOSE,
            EFFECT:Spells.AREA_OF_EFFECT.ONE,
            DURATION: Spells.DURATION.INSTANT,
            VALUE: {MIN: 1, MAX: 3},
            BONUS: '+2'
        },
        DETECT_MAGIC: {
            NAME:'Detect magic',
            DESCRIPTION:'Allows a mage to determine if any item carried by the members of the party are magically enchanted.',
            TYPE:Spells.TYPE.SPECIAL,
            RANGE:Spells.RANGE.NONE,
            EFFECT:Spells.AREA_OF_EFFECT.INVENTORY,
            DURATION: Spells.DURATION.MEDIUM,
            VALUE: {MIN: 1, MAX: 3},
            BONUS: '+2'
        },
        MAGIC_MISSILE: {
            NAME:'Magic missile',
            DESCRIPTION:'A bolt of force that unerringly strikes one target in front of the party within range.',
            TYPE:Spells.TYPE.OFFENSIVE,
            RANGE:Spells.RANGE.CLOSE,
            EFFECT:Spells.AREA_OF_EFFECT.ONE,
            DURATION: Spells.DURATION.INSTANT,
            VALUE: {MIN: 2, MAX: 5},
            BONUS: '*2'
        },
        OBSCURING_MIST: {
            NAME:'Obscuring mist',
            DESCRIPTION:'Shrouds the caster in a blurring mist which makes it difficult for monsters to see or hit the caster.',
            TYPE:Spells.TYPE.DEFENSIVE,
            RANGE:Spells.RANGE.NONE,
            EFFECT:Spells.AREA_OF_EFFECT.CASTER,
            DURATION: Spells.DURATION.MEDIUM,
            VALUE: {MIN: 2, MAX: 5},
            BONUS: '+2'
        }
    },
    LEVEL_2: {
        INVISIBILITY: {
            NAME: 'Invisibility',
            DESCRIPTION:'Causes the target to become invisible until hit by- or attacking an enemy.',
            TYPE:Spells.TYPE.DEFENSIVE,
            RANGE:Spells.RANGE.NONE,
            EFFECT:Spells.AREA_OF_EFFECT.ONE,
            DURATION:Spells.DURATION.UNTIL_HIT,
            VALUE: {MIN: 20, MAX: 20},
            BONUS: '+0'
        },
        FEATHER_FALL: {
            NAME: 'Feather fall',
            DESCRIPTION:'Allows the target to be less affected by gravity and thus be less affected by falling injuries.',
            TYPE:Spells.TYPE.SPECIAL,
            RANGE:Spells.RANGE.NONE,
            EFFECT:Spells.AREA_OF_EFFECT.ONE,
            DURATION:Spells.DURATION.MEDIUM,
            VALUE: {MIN: 3, MAX: 5},
            BONUS: '+0'
        },
        STINKING_CLOUD: {
            NAME: 'Stinking cloud',
            DESCRIPTION: 'Creates a billowing mass of noxious vapor. Any creature or character who enters the cloud risks getting incapacitated by nausea.',
            TYPE:Spells.TYPE.SPECIAL,
            RANGE:Spells.RANGE.CLOSE,
            EFFECT:Spells.AREA_OF_EFFECT.SQUARE,
            DURATION:Spells.DURATION.SHORT,
            VALUE: {MIN: 0, MAX:0},
            BONUS: '+0'
        }
    },
    LEVEL_3: {
        FIREBALL: {
            NAME: 'Fireball',
            DESCRIPTION: 'Creates a ball of fire that flies forward from the caster and explodes upon impact.',
            TYPE:Spells.TYPE.OFFENSIVE,
            RANGE:Spells.RANGE.FAR,
            AREA_OF_EFFECT:Spells.AREA_OF_EFFECT.SQUARE,
            DURATION:Spells.DURATION.INSTANT,
            VALUE: {MIN:1, MAX:6},
            BONUS: '*1'
        },
        DISPEL_MAGIC: {
            NAME: 'Dispel magic',
            DESCRIPTION: 'This spell neutralizes any spell affecting the party and it\'s immediate surroundings.',
            TYPE:Spells.TYPE.SPECIAL,
            RANGE:Spells.RANGE.CLOSE,
            AREA_OF_EFFECT:Spells.AREA_OF_EFFECT.PARTY,
            DURATION:Spells.DURATION.INSTANT,
            VALUE: {MIN:0, MAX:0},
            BONUS: '+0'
        },
        HASTE: {
            NAME: 'Haste',
            DESCRIPTION: 'This spell causes the target character to move and fight at double rate.',
            TYPE:Spells.TYPE.SPECIAL,
            RANGE:Spells.RANGE.NONE,
            AREA_OF_EFFECT:Spells.AREA_OF_EFFECT.ONE,
            DURATION:Spells.DURATION.SHORT,
            VALUE: {MIN:1, MAX:1},
            BONUS: '+1'
        },
        LIGHTNING_BOLT: {
            NAME: 'Lightning bolt',
            DESCRIPTION: 'Hurls a powerful bolt of electrical energy towards enemies standing in front of the caster.',
            TYPE:Spells.TYPE.OFFENSIVE,
            RANGE:Spells.RANGE.FAR,
            AREA_OF_EFFECT:Spells.AREA_OF_EFFECT.TWO,
            DURATION:Spells.DURATION.INSTANT,
            VALUE: {MIN:1, MAX:6},
            BONUS: '*1'
        },
        HOLD_PERSON: {
            NAME: 'Hold person',
            DESCRIPTION: 'Paralyzes any humanoid creatures for a short period of time.',
            TYPE:Spells.TYPE.SPECIAL,
            RANGE:Spells.RANGE.MEDIUM,
            AREA_OF_EFFECT:Spells.AREA_OF_EFFECT.ONE,
            DURATION:Spells.DURATION.SHORT,
            VALUE: {MIN:0, MAX:0},
            BONUS: '+1'
        },
        SLOW: {
            NAME: 'Slow',
            DESCRIPTION: 'Causes lower level monsters and creatures to fight and move in slow motion for a short period of time.',
            TYPE:Spells.TYPE.SPECIAL,
            RANGE:Spells.RANGE.MEDIUM,
            AREA_OF_EFFECT:Spells.AREA_OF_EFFECT.ONE,
            DURATION:Spells.DURATION.SHORT,
            VALUE: {MIN:0, MAX:0},
            BONUS: '+1'
        },
        UNLOCK: {
            NAME: 'Unlock',
            DESCRIPTION: 'Attempts to unlock any locked door that the party is facing. Some doors cannot be unlocked by magic.',
            TYPE:Spells.TYPE.SPECIAL,
            RANGE:Spells.RANGE.CLOSE,
            AREA_OF_EFFECT:Spells.AREA_OF_EFFECT.OBJECT,
            DURATION:Spells.DURATION.INSTANT,
            VALUE: {MIN:0, MAX:0},
            BONUS: '*1'
        }
    },
    LEVEL_4:{

    },
    LEVEL_5:{

    },
    LEVEL_6:{

    },
    LEVEL_7:{

    },
    LEVEL_8:{

    },
    LEVEL_9:{

    }
};