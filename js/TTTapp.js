
//game board object
function TicTacToeGame(){
    this.gameboard = ["-","-","-","-","-","-","-","-","-"];
    this.winCombos = ["abc","def","ghi","adg","beh","cfi","aei","ceg"];
    this.boardFieldReference = ["a","b","c","d","e","f","g","h","i"];
    this.playersTurn = 1;

    TicTacToeGame.prototype.CheckPlayerWin = function(player){
        // convert player array to string
        var didWin = false;
        var winMatch = "";
        for(var p = 0;p < player.length;p++){
            //build string without "-" from player array
            if(player[p] !== "-"){
                winMatch += player[p];
            }
        }   
            
        // Check for Winner by looping through Win combinations
        for(var i = 0;i < this.winCombos.length;i++){          
            var winComboCheck = this.winCombos[i].split('');
            var charCount = 0;//matching win counter
                //Loop through each win combination character
                for(var e = 0;e < winComboCheck.length;e++) {               
                //Combination match add to total for current win combination.
                    if(winMatch.indexOf(winComboCheck[e]) != -1){
                        charCount++;
                    }
                }   

            //if 3 have matched for current combination then we have a winner.
            if(charCount >= 3){
                console.log('WIN WIN WIN');                
                didWin = true;
            }
            
        }
        // console.log(player + ':' + winMatch);
        return didWin;
    };

    //updates who playes next and returns player ID.
    TicTacToeGame.prototype.setPlayerTurn = function(){
         if(this.playersTurn == 1){
            this.playersTurn = 2;
            return "P1";        
        }else{
            this.playersTurn = 1;
            return "P2";
        }
    };

     

}

//player object
function tttPlayers(playerName){    
    this.playerName = playerName;
    this.Moves = ["-","-","-","-","-","-","-","-","-"];
}


//create new gameboard
var tttGame = new TicTacToeGame();

//add players vars
var P1 = null;
var P2 = null;

// hide game board view
$('#board').hide();
//hide player setup
$('#startPlayers').hide();
// ready player one
$('#player1').toggleClass('active');
// hide finish view
$('#finish').hide();

//start button click event to trigger board view
$("#start .button").on("click",function(){
    $("#start").hide();

    //clear player input fields
    $('#P1name').val('');
    $('#P2name').val('');

    $('#startPlayers').show();

//create new players
   

});

$("#startPlayers .button").on("click",function(){

    //validate input
        //create new players
        P1 = new tttPlayers($('#P1name').val());
        P2 = new tttPlayers($('#P2name').val());//*** if P2 player name = NoobRobo then apply AI

    //setup events on board
    $(".boxes li").on("click",function(){
        gameBoardClickEvents(this);
    });

    $('#startPlayers').hide();
    $('#board').show();

});




//Add click events to game board
function gameBoardClickEvents(box){
    console.log($(box).index());
    var i = $(box).index();
    if(tttGame.playersTurn == 1){
        P1.Moves[i] = tttGame.boardFieldReference[i];
        $(box).addClass('box-filled-1');
        $(box).off();
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
       // console.log('P1 Win?' + tttGame.CheckPlayerWin(P1.Moves));
       if(tttGame.CheckPlayerWin(P1.Moves)){
            $('#board').hide();
            $('#finish').show().addClass('playerWin-1');
            $('#finish header').addClass('end-o');
            $('.message').html(P1.playerName);
       }

    }else{
        P2.Moves[i] = tttGame.boardFieldReference[i]; 
        $(box).addClass('box-filled-2');
        $(box).off();
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        //console.log('P2 Win?' + tttGame.CheckPlayerWin(P2.Moves));
        if(tttGame.CheckPlayerWin(P2.Moves)){
            $('#board').hide();
            $('#finish').show().addClass('playerWin-2');
             $('#finish header').addClass('end-x');
            $('.message').html(P2.playerName);
       }
    }
    tttGame.gameboard[i] = tttGame.setPlayerTurn();    
    
    console.log('Board:' +  tttGame.gameboard + '\n PlayerTurn:' + tttGame.playersTurn + '\n P1:' + P1.Moves + '\n P2:' + P2.Moves);
}

$('#finish .button').on('click',function(){
    //clear game
    // hide game board view
$('#board').hide();
//hide player setup
$('#startPlayers').hide();
// ready player one
//$('#player1').toggleClass('active');
// hide finish view
$('#finish').hide();

//start button click event to trigger board view

    $("#start").show();

    $('.boxes li').removeClass('box-filled-1');
    $('.boxes li').removeClass('box-filled-2');

    P1 = null;
    P2 = null;
    tttGame = null;
    tttGame = new TicTacToeGame();

});



//TODO: 
    // mouse over show player icon 
    // game over Show the word "Winner" or "It's a Tie!"

    //Use the module pattern to wrap all of your JavaScript code into a single global variable or an immediately invoked function.

    /// Name appears while the game is playing
    // The name is displayed for the winning player



