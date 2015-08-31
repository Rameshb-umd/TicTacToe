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
    function changeLastline(content){
        $('#GameLogContents li:last-child').remove();
        $("#GameLogContents").append("<li class='winner'></li>");
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
    game.won=false;
    
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
    
    function countPlayerstotal(tdeach){
          if($(tdeach).data("player")==game.player_one){
                    player_1_diacount++;
                }
              if($(tdeach).data("player")==game.player_two){
                    player_2_diacount++;
                }
    }
      function computeresult(){ 
          computerows();
          computecolumns();
          computediagnals();
          checkfordraw();
      }
    
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