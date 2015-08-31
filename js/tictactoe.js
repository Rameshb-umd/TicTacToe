/******
Script return for simple Tic Tac Toe game.
Author : Ramesh Balasekaran
*/

$(document).ready(function() {
    
    /*** Intializing Game Object
    * Default Player Names
    * Player 1 starts first
    * variable to check if game won or draw    
    ***/
    var game = new Object();
    game.player_one="Player 1";
    game.player_two="Player 2";
    game.currentPlayer = 1;
    game.won=false;
    
    
    /*** Intializing Game Log in TypeWriter Mode***/
     $("#GameLogContents").typed({
        strings: ["Please enter both players name"],
        typeSpeed: 0
      });
    
    /*** Function to add a new line in game log. Message is passed as argument***/
    function addnewline(content){
        $("#GameLogContents").append("<li></li>");
        $('#GameLogContents li:last-child').typed({
        strings: [content],
        typeSpeed: 0,
        showCursor: false
      });
    }
    
    /*** Function to change the last line in the game log***/
    function changeLastline(content){
        $('#GameLogContents li:last-child').remove();
        $("#GameLogContents").append("<li class='winner'></li>");
        $('#GameLogContents li:last-child').typed({
        strings: [content],
        typeSpeed: 0,
        showCursor: false
      });
    }
    
    /*** Event handler to clear the name on focus****/
    $("#player1").focus(function(){       
        $(this).val("");
    })
    /*** Event handler to clear the name on focus****/
    $("#player2").focus(function(){       
        $(this).val("");
    })
    
    /*** Event handler to welcome the players in Game log****/
    $("#player1").blur(function() {
        var value=$(this).val();
        if(value!="Enter Player 1 name"&&value!=""){
           game.player_one= value; 
            addnewline("Welcome "+value+", you make the first move.");
        }
    })
        
    /*** Event handler to welcome the players in Game log****/
      $("#player2").blur(function() {
        var value=$(this).val();
        if(value!="Enter Player 2 name"&&value!=""){
           game.player_two= value;  
            addnewline("Welcome "+value+".");
        }
    })
      
    /*** Main event to add the cross or dot based on the turns
        As soon as clicked. Message in game log is printed to indicate
        it turn for the next player to play ****/
    $("#box td").click(function(){
                    if(!$(this).hasClass("occupied")){
                        $(this).removeClass("hoverclass");
                        if(game.currentPlayer == 1){
                            $(this).data("player",game.player_one);
                            $(this).addClass("selected_cross");
                            $(this).addClass("occupied");
                            game.currentPlayer = 2;
                            addnewline(game.player_two+" turn.");
                        }else{
                            $(this).data("player",game.player_two);
                            $(this).addClass("selected_dot");
                            $(this).addClass("occupied");
                            game.currentPlayer = 1;
                            addnewline(game.player_one+" turn.");
                        }                        
                        computeresult();
                    }
    });
    
    
    /*** Method that computes the result for each turn. 
         Checks the rows , columns and diagnal to see if any player has won*****/ 
    function computeresult(){ 
          computerows();
          computecolumns();
          computediagnals();
          checkfordraw();
      }
    
    /*** Method that computes the result in each row for each turn to see if any player has won*****/
    function computerows(){
        var player_1_rowcount=0;
        var player_2_rowcount=0;
        $.each( $("#box tr:first").find("td"), function( index, tdeach ){
                if($(tdeach).data("player")==game.player_one){
                    player_1_rowcount++;
                }
              if($(tdeach).data("player")==game.player_two){
                    player_2_rowcount++;
                }
            });
          declarewinner(player_1_rowcount,player_2_rowcount);          
          player_1_rowcount=0
          player_2_rowcount=0
          $.each( $("#box tr").eq(1).find("td"), function( index, tdeach ){
                if($(tdeach).data("player")==game.player_one){
                    player_1_rowcount++;
                }
              if($(tdeach).data("player")==game.player_two){
                    player_2_rowcount++;
                }
            });
          
          declarewinner(player_1_rowcount,player_2_rowcount);
          player_1_rowcount=0
          player_2_rowcount=0
           $.each( $("#box tr").eq(2).find("td"), function( index, tdeach ){
                if($(tdeach).data("player")==game.player_one){
                    player_1_rowcount++;
                }
              if($(tdeach).data("player")==game.player_two){
                    player_2_rowcount++;
                }
            });
          declarewinner(player_1_rowcount,player_2_rowcount);
    }
    
    /**** Method to check the columns if any player won*****/
    function computecolumns(){
        var player_1_rowcount=0;
        var player_2_rowcount=0;
        $.each( $("#box td:first-child"), function( index, tdeach ){
                if($(tdeach).data("player")==game.player_one){
                    player_1_rowcount++;
                }
              if($(tdeach).data("player")==game.player_two){
                    player_2_rowcount++;
                }
            });
          declarewinner(player_1_rowcount,player_2_rowcount);          
          player_1_rowcount=0
          player_2_rowcount=0
          $.each( $("#box td:nth-child(2)"),function( index, tdeach ){
                if($(tdeach).data("player")==game.player_one){
                    player_1_rowcount++;
                }
              if($(tdeach).data("player")==game.player_two){
                    player_2_rowcount++;
                }
            });
          
          declarewinner(player_1_rowcount,player_2_rowcount);
          player_1_rowcount=0
          player_2_rowcount=0
           $.each( $("#box td:nth-child(3)"), function( index, tdeach ){
                if($(tdeach).data("player")==game.player_one){
                    player_1_rowcount++;
                }
              if($(tdeach).data("player")==game.player_two){
                    player_2_rowcount++;
                }
            });
          declarewinner(player_1_rowcount,player_2_rowcount);
    }
    
    
        var player_1_diacount=0;
        var player_2_diacount=0;
    
    /**** Method to check the rows if any player won*****/
    function computediagnals(){        
        var tdeach = $("#box tr:first td:first-child")
        countPlayerstotal(tdeach);
        var tdeach = $("#box tr:nth-child(2) td:nth-child(2)")
        countPlayerstotal(tdeach);
        var tdeach = $("#box tr:nth-child(3) td:nth-child(3)")
        countPlayerstotal(tdeach);
        declarewinner(player_1_diacount,player_2_diacount);
        player_1_diacount=0;
        player_2_diacount=0;
        var tdeach = $("#box tr:first td:nth-child(3)")
        countPlayerstotal(tdeach);
        var tdeach = $("#box tr:nth-child(2) td:nth-child(2)")
        countPlayerstotal(tdeach);
        var tdeach = $("#box tr:nth-child(3) td:first-child")
        countPlayerstotal(tdeach);
        declarewinner(player_1_diacount,player_2_diacount);
        player_1_diacount=0;
        player_2_diacount=0;
    }
    
    /**** Method to count players total*****/
    function countPlayerstotal(tdeach){
          if($(tdeach).data("player")==game.player_one){
                    player_1_diacount++;
                }
              if($(tdeach).data("player")==game.player_two){
                    player_2_diacount++;
                }
    }
       
    
    /****Method to check the results and declare winner ***/
    function declarewinner(player_1,player_2){
        if(player_1==3){
            changeLastline("Congratulation "+game.player_one+", you won");
            $(".hoverclass").addClass("occupied");
            $(".hoverclass").removeClass("hoverclass");
            game.won=true;
            return false;
        }
        if(player_2==3){
            changeLastline("Congratulation "+game.player_two+", you won");
            $(".hoverclass").addClass("occupied");
            $(".hoverclass").removeClass("hoverclass");
            game.won=true;
            return false;
        }
    }
    
    /****Method to check the results and declare if draw ***/
    function checkfordraw(){
        var gameover = true;
         $.each( $("#box td"), function( index, tdeach ){
                if(!$(this).hasClass("occupied")){
                    gameover=false;
                }
         });
        if(gameover&&!game.won){
            changeLastline("Oops, The Game has resulted in a draw");
        }        
    }
});