$(document).ready(function() {
    
     $("#GameLogContents").typed({
        strings: ["Please enter both players name"],
        typeSpeed: 0
      });
    
    function addnewline(content){
        $("#GameLogContents").append("<li></li>");
        $('#GameLogContents li:last-child').typed({
        strings: [content],
        typeSpeed: 0,
        showCursor: false
      });
    }
    
    var game = new Object();
    game.player_one="Player 1";
    game.player_two="Player 2";
    game.currentPlayer = 1;
    
    $("#player1").focus(function(){       
        $(this).val("");
    })
    $("#player2").focus(function(){       
        $(this).val("");
    })
    $("#player1").blur(function() {
        var value=$(this).val();
        if(value!="Enter Player 1 name"&&value!=""){
           game.player_one= value; 
            addnewline("Welcome "+value+", you make the first move.");
        }
    })
    
      $("#player2").blur(function() {
        var value=$(this).val();
        if(value!="Enter Player 2 name"&&value!=""){
           game.player_two= value;  
            addnewline("Welcome "+value+".");
        }
    })
      
    $("#box td").click(function(){
                    if(!$(this).hasClass("occupied")){
                        $(this).removeClass("hoverclass");
                        if(game.currentPlayer == 1){
                            $(this).addClass("selected_cross");
                            $(this).addClass("occupied");
                            game.currentPlayer = 2;
                            addnewline(game.player_two+" turn.");
                        }else{
                            $(this).addClass("selected_dot");
                            $(this).addClass("occupied");
                            game.currentPlayer = 1;
                            addnewline(game.player_one+" turn.");
                        }
                    }
    });
      
      
});