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

    startGame:function () {
        var player_section = $("#player-section");
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

    displayEnemy:function (player_id) {
        $("#enemy-h2").css("visibility", "visible");
        var enemy_section = $("#enemy-section");
        for(var i=0;i<this.player_image.length;i++)
        {
            if(i!==parseInt(player_id))//it doesn't work if we don't parse it
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
    },

    selectEnemy:function () {
        var row_command = $(".row-command");
        var row_battle_arena = $(".row-battle-arena");
        row_command.show();
        row_battle_arena.show();
    },

    displayPlayers:function (player_id, enemy_id) {
        var attacker_origin_hp, defender_origin_hp;
        var attacker = $("#attacker");
        var defender = $("#defender");
        var attacker_hp = $("#attacker-health-point");
        var defender_hp = $("#defender-health-point");
        attacker_origin_hp = this.player_hp[player_id];
        defender_origin_hp = this.player_hp[enemy_id];
        attacker.attr("src", this.player_image[player_id]);
        defender.attr("src", this.player_image[enemy_id]);
        attacker_hp.html(this.player_hp[player_id] + " / " + attacker_origin_hp);
        defender_hp.html(this.player_hp[enemy_id] + " / " + defender_origin_hp);
    },

    attack:function () {
        var attacker = $("#attacker");
        var defender = $("#defender");
        attacker.removeClass("left_player");
        attacker.addClass("left_player_attack");
        defender.addClass("shake-defender shake-constant");
        setTimeout(function () {
            attacker.removeClass('left_player_attack');
            attacker.addClass("left_player");
            defender.removeClass("shake-defender shake-constant");
        }, 300);
    }
};


$(document).ready(function() {
    RPG.startGame();
    var player_id, enemy_id;
    $(".playerImage").on("click", function () {
        //grab the player data-id
        player_id = $(this).data("id").substring($(this).data("id").length-1, $(this).data("id").length);
        RPG.displayEnemy(player_id);
    });

    //since the class is dynamic, we have to bind it with the following code
    $(document).on("click", ".enemyImage", function () {
        enemy_id = $(this).data("id").substring($(this).data("id").length-1, $(this).data("id").length);
        RPG.selectEnemy();
        RPG.displayPlayers(player_id, enemy_id);
    });

    $("#attack").on("click", function () {
        RPG.attack();
    })
});