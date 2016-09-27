
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

//create new players
var P1 = new tttPlayers("Tyler");
var P2 = new tttPlayers("Jennifer");//*** if P2 player name = NoobRobo then apply AI

$('#player1').toggleClass('active');

$('#finish').hide();

$(".boxes li").on("click",function(){
    console.log($(this).index());
    var i = $(this).index();
    if(tttGame.playersTurn == 1){
        P1.Moves[i] = tttGame.boardFieldReference[i];
        $(this).addClass('box-filled-1');
        $(this).off();
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
       // console.log('P1 Win?' + tttGame.CheckPlayerWin(P1.Moves));
       if(tttGame.CheckPlayerWin(P1.Moves)){
            $('#board').hide();
            $('#finish').show().addClass('playerWin-1');
            $('.message').html(P1.playerName);
       }

    }else{
        P2.Moves[i] = tttGame.boardFieldReference[i]; 
        $(this).addClass('box-filled-2');
        $(this).off();
        $('#player1').toggleClass('active');
        $('#player2').toggleClass('active');
        //console.log('P2 Win?' + tttGame.CheckPlayerWin(P2.Moves));
        if(tttGame.CheckPlayerWin(P2.Moves)){
            $('#board').hide();
            $('#finish').show().addClass('playerWin-2');
            $('.message').html(P2.playerName);
       }
    }
    tttGame.gameboard[i] = tttGame.setPlayerTurn();    
    
    console.log('Board:' +  tttGame.gameboard + '\n PlayerTurn:' + tttGame.playersTurn + '\n P1:' + P1.Moves + '\n P2:' + P2.Moves);
});







