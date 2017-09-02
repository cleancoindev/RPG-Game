var RPG = {
    "player_name":[
        "cloud",
        "sephiroth",
        "vivi",
        "squall"
    ],
    "player_image":[
        "assets/images/cloud.png",
        "assets/images/sephiroth.png",
        "assets/images/vivi-ff9.png",
        "assets/images/squall.png"
    ],
    "player_hp":[
        "200",
        "500",
        "150",
        "250"
    ],
    "player_strength":[
        "20",
        "25",
        "10",
        "20"
    ],
    "actions_image":[
        "assets/images/slash.png",
        "assets/images/slash.png",
        "assets/images/slash.png"
    ],
    "life_status":[
        "y",
        "y",
        "y",
        "y"
    ],

    startGame:function () {
        var player_section = $("#player-section");
        var row_command = $(".row-command");
        var action_effect_defender = $(".action-effect-defender");
        var action_effect_attacker = $(".action-effect-attacker");
        var row_congrats = $(".row-congrats");

        action_effect_defender.hide();
        action_effect_attacker.hide();
        row_command.hide();
        row_congrats.hide();

        // var row_command = $(".row-command");
        // var row_battle_arena = $(".row-battle-arena");
        // row_command.hide();
        // row_battle_arena.hide();
        for(var i=0;i<this.player_image.length;i++)
        {
            var newCol = $("<div>");
            var newImage = $("<img>");
            var newPlayerName = $("<h3>");
            newCol.attr("class", "col-md-3 col-player");
            player_section.append(newCol);
            newImage.attr("data-id","playerID"+i);
            newImage.attr("class","playerImage");
            newImage.attr("src", this.player_image[i]);
            newImage.attr("alt", "player" + (i+1));
            newCol.append(newImage);
            newPlayerName.html(RPG.player_name[i]);
            newCol.append(newPlayerName);
        }
    },

    displayEnemy:function (player_id, enemy_id) {
        var player_section = $("#player-section");
        var enemy_section = $("#enemy-section");
        player_section.empty();
        enemy_section.empty();
        $("#enemy-h2").css("visibility", "visible");

        var newColPlayer = $("<div>");
        var newImagePlayer = $("<img>");
        var newNamePlayer = $("<h3>");
        newColPlayer.attr("class", "col-md-3 col-player");
        player_section.append(newColPlayer);
        newImagePlayer.attr("data-id","playerID"+player_id);
        newImagePlayer.attr("class","playerImage");
        newImagePlayer.attr("src", this.player_image[player_id]);
        newImagePlayer.attr("alt", "player" + (player_id+1));
        newColPlayer.append(newImagePlayer);
        newNamePlayer.html(RPG.player_name[player_id]);
        newColPlayer.append(newNamePlayer);

        for(var i=0;i<this.player_image.length;i++)
        {
            if(enemy_id === -1)
            {
                if (i !== parseInt(player_id) && this.life_status[i] === "y")//it doesn't work if we don't parse it
                {
                    var newCol2 = $("<div>");
                    var newImage2 = $("<img>");
                    var newPlayerName2 = $("<h3>");
                    newCol2.attr("class", "col-md-3 col-enemy");
                    enemy_section.append(newCol2);
                    newImage2.attr("data-id", "enemyID" + i);
                    newImage2.attr("class", "enemyImage");
                    newImage2.attr("src", this.player_image[i]);
                    newImage2.attr("alt", "enemy" + (i + 1));
                    newCol2.append(newImage2);
                    newPlayerName2.html(RPG.player_name[i]);
                    newCol2.append(newPlayerName2);
                }
            }
            else
            {
                if (i !== parseInt(player_id) && i !== parseInt(enemy_id) && this.life_status[i] === "y")//it doesn't work if we don't parse it
                {
                    var newCol = $("<div>");
                    var newImage = $("<img>");
                    var newPlayerName = $("<h3>");
                    newCol.attr("class", "col-md-3 col-enemy");
                    enemy_section.append(newCol);
                    newImage.attr("data-id", "enemyID" + i);
                    newImage.attr("class", "enemyImage");
                    newImage.attr("src", this.player_image[i]);
                    newImage.attr("alt", "enemy" + (i + 1));
                    newCol.append(newImage);
                    newPlayerName.html(RPG.player_name[i]);
                    newCol.append(newPlayerName);
                }
            }
        }
    },

    selectEnemy:function (progress_bar_attacker, progress_bar_defender, player_id, enemy_id) {
        var enemy_section = $("#enemy-section");
        var battle_commands = $("#battle-command");
        var row_congrats = $(".row-congrats");

        battle_commands.removeClass("battle-command-disabled");
        enemy_section.empty();
        row_congrats.hide();

        for(var i=0;i<this.player_image.length;i++)
        {
            if(i!==parseInt(player_id) && i!==parseInt(enemy_id) && this.life_status[i]==="y")//it doesn't work if we don't parse it
            {
                var newCol = $("<div>");
                var newImage = $("<img>");
                var newPlayerName = $("<h3>");
                newCol.attr("class", "col-md-3 col-enemy");
                enemy_section.append(newCol);
                newImage.attr("data-id", "enemyID" + i);
                newImage.attr("class", "enemyImage");
                newImage.attr("src", this.player_image[i]);
                newImage.attr("alt", "enemy" + (i + 1));
                newCol.append(newImage);
                newPlayerName.html(RPG.player_name[i]);
                newCol.append(newPlayerName);
            }
        }

        var row_command = $(".row-command");
        var row_battle_arena = $(".row-battle-arena");
        row_command.show();
        row_battle_arena.show();
    },

    displayPlayers:function (progress_bar_attacker, progress_bar_defender, player_origin_health, enemy_origin_health, attacker_current_hp, defender_current_hp, player_id, enemy_id) {
        $(".col-defender").css("visibility", "visible");
        var attacker = $("#attacker");
        var defender = $("#defender");
        var attacker_hp = $("#attacker-health-point");
        var defender_hp = $("#defender-health-point");
        var attacker_progress_bar = $("#attacker-health-progress-bar");
        var defender_progress_bar = $("#defender-health-progress-bar");
        var progress_width_attacker = 100 - progress_bar_attacker;
        var progress_width_defender = 100 - progress_bar_defender;

        if(defender_current_hp===enemy_origin_health && attacker_current_hp ===player_origin_health)
        {
            attacker.attr("src", this.player_image[player_id]);
            defender.attr("src", this.player_image[enemy_id]);
            attacker_hp.html(this.player_hp[player_id] + "/" + player_origin_health);
            defender_hp.html(this.player_hp[enemy_id] + "/" + enemy_origin_health);
            attacker_progress_bar.attr("style","width:100%");
            defender_progress_bar.attr("style","width:100%");
        }
        else if(defender_current_hp!==enemy_origin_health && attacker_current_hp ===player_origin_health)
        {
            attacker.attr("src", this.player_image[player_id]);
            defender.attr("src", this.player_image[enemy_id]);
            defender_hp.html(defender_current_hp + "/" + enemy_origin_health);
            defender_progress_bar.attr("style","width:"+progress_width_defender+"%");
        }
        else if(defender_current_hp===enemy_origin_health && attacker_current_hp !==player_origin_health)
        {
            attacker.attr("src", this.player_image[player_id]);
            defender.attr("src", this.player_image[enemy_id]);
            attacker_hp.html(attacker_current_hp + "/" + player_origin_health);
            defender_hp.html(defender_current_hp + "/" + enemy_origin_health);
            attacker_progress_bar.attr("style","width:"+progress_width_attacker+"%");
            defender_progress_bar.attr("style","width:100%");
        }
        else if(defender_current_hp!==enemy_origin_health && attacker_current_hp !==player_origin_health)
        {
            attacker.attr("src", this.player_image[player_id]);
            defender.attr("src", this.player_image[enemy_id]);
            attacker_hp.html(attacker_current_hp + "/" + player_origin_health);
            defender_hp.html(defender_current_hp + "/" + enemy_origin_health);
            attacker_progress_bar.attr("style","width:"+progress_width_attacker+"%");
            defender_progress_bar.attr("style","width:"+progress_width_defender+"%");
        }
    },

    attack:function (player_origin_health, enemy_origin_health, player_id, enemy_id, counter) {
        var attacker = $("#attacker");
        var defender = $("#defender");
        var action_effect_defender = $(".action-effect-defender");
        var battle_commands = $("#battle-command");
        var row_congrats = $(".row-congrats");
        var progress_bar_attacker,
            progress_bar_attacker_fixed,
            progress_bar_defender,
            progress_bar_defender_fixed;

        battle_commands.addClass("battle-command-disabled");

        attacker.removeClass("left_player");
        attacker.addClass("left_player_attack");

        defender.addClass("shake-defender shake-constant");

        action_effect_defender.show();
        action_effect_defender.attr("src",this.actions_image[0]);

        this.player_hp[enemy_id] -= this.player_strength[player_id]*counter;

        if(this.player_hp[enemy_id]<=0)
        {
            this.player_hp[enemy_id] = 0;
            this.life_status[enemy_id] = "n";
            $(".col-defender").css("visibility", "hidden");
            this.displayEnemy(player_id, enemy_id);
            progress_bar_attacker = ((player_origin_health - this.player_hp[player_id]) / (player_origin_health / 100));
            progress_bar_defender = ((enemy_origin_health - this.player_hp[enemy_id]) / (enemy_origin_health / 100));
            setTimeout(function () {
                attacker.removeClass('left_player_attack');
                attacker.addClass("left_player");
                defender.removeClass("shake-defender shake-constant");
                action_effect_defender.hide();
            }, 300);
            row_congrats.show();
        }
        else
        {
            progress_bar_attacker = ((player_origin_health - this.player_hp[player_id]) / (player_origin_health / 100));
            progress_bar_defender = ((enemy_origin_health - this.player_hp[enemy_id]) / (enemy_origin_health / 100));
            progress_bar_attacker_fixed = progress_bar_attacker.toFixed(2);
            progress_bar_defender_fixed = progress_bar_defender.toFixed(2);

            this.displayPlayers(progress_bar_attacker_fixed, progress_bar_defender_fixed, player_origin_health, enemy_origin_health, this.player_hp[player_id], this.player_hp[enemy_id], player_id, enemy_id);

            setTimeout(function () {
                attacker.removeClass('left_player_attack');
                attacker.addClass("left_player");
                defender.removeClass("shake-defender shake-constant");
                action_effect_defender.hide();
            }, 300);
        }
    },

    counterAttack:function (player_origin_health, enemy_origin_health, player_id, enemy_id) {
        var attacker = $("#attacker");
        var defender = $("#defender");
        var action_effect_attacker = $(".action-effect-attacker");
        var battle_commands = $("#battle-command");
        var progress_bar_attacker,
            progress_bar_attacker_fixed,
            progress_bar_defender,
            progress_bar_defender_fixed;

        defender.removeClass("right_player");
        defender.addClass("right_player_attack");

        attacker.addClass("shake shake-constant");

        action_effect_attacker.show();
        action_effect_attacker.attr("src",this.actions_image[0]);

        this.player_hp[player_id] -= this.player_strength[enemy_id];

        if(this.player_hp[player_id]<=0)
        {
            this.player_hp[player_id] = 0;
            this.life_status[player_id] = "n";
            $(".col-attacker").css("visibility", "hidden");
            this.displayEnemy(player_id, enemy_id);
            setTimeout(function () {
                defender.removeClass('right_player_attack');
                defender.addClass("right_player");
                attacker.removeClass("shake shake-constant");
                action_effect_attacker.hide();
            }, 300);
        }
        else
        {
            progress_bar_attacker = ((player_origin_health - this.player_hp[player_id]) / (player_origin_health / 100));
            progress_bar_defender = ((enemy_origin_health - this.player_hp[enemy_id]) / (enemy_origin_health / 100));
            progress_bar_attacker_fixed = progress_bar_attacker.toFixed(2);
            progress_bar_defender_fixed = progress_bar_defender.toFixed(2);

            this.displayPlayers(progress_bar_attacker_fixed, progress_bar_defender_fixed, player_origin_health, enemy_origin_health, this.player_hp[player_id], this.player_hp[enemy_id], player_id, enemy_id);

            setTimeout(function () {
                defender.removeClass('right_player_attack');
                defender.addClass("right_player");
                attacker.removeClass("shake shake-constant");
                battle_commands.removeClass("battle-command-disabled");
                action_effect_attacker.hide();
            }, 300);
        }
    }
};


$(document).ready(function() {
    RPG.startGame();
    var player_id, enemy_id;
    var player_origin_health, enemy_origin_health;
    var progress_bar_attacker,
        progress_bar_attacker_fixed,
        progress_bar_defender,
        progress_bar_defender_fixed;
    var counter = 1;
    $(".playerImage").on("click", function () {
        //grab the player data-id
        player_id = $(this).data("id").substring($(this).data("id").length-1, $(this).data("id").length);
        player_origin_health = RPG.player_hp[player_id];
        RPG.displayEnemy(player_id, -1);
    });

    //since the class is dynamic, we have to bind it with the following code
    $(document).on("click", ".enemyImage", function () {
        enemy_id = $(this).data("id").substring($(this).data("id").length-1, $(this).data("id").length);
        enemy_origin_health = RPG.player_hp[enemy_id];
        progress_bar_attacker = ((player_origin_health - RPG.player_hp[player_id]) / (player_origin_health / 100));
        progress_bar_attacker_fixed = progress_bar_attacker.toFixed(2);
        progress_bar_defender = ((enemy_origin_health - RPG.player_hp[enemy_id]) / (enemy_origin_health / 100));
        progress_bar_defender_fixed = progress_bar_defender.toFixed(2);
        RPG.selectEnemy(progress_bar_attacker_fixed, progress_bar_defender_fixed, player_id, enemy_id);
        RPG.displayPlayers(progress_bar_attacker_fixed, progress_bar_defender_fixed, player_origin_health, enemy_origin_health, RPG.player_hp[player_id], RPG.player_hp[enemy_id], player_id, enemy_id);
    });

    $("#attack").on("click", function () {
        RPG.attack(player_origin_health, enemy_origin_health, player_id, enemy_id, counter);
        if(RPG.player_hp[enemy_id]>0)
        {
            var myVar = setInterval(myTimer, 500);

            function myTimer() {
                RPG.counterAttack(player_origin_health, enemy_origin_health, player_id, enemy_id);
                clearInterval(myVar);
            }
        }
        counter++;
    })
});