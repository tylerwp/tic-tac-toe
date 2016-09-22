



// first player to match letter combination wins.
var win = ["abc","def","ghi","adg","beh","cfi","aei","ceg"];
var board = ["-","-","-","-","-","-","-","-","-"];
var bIdent = ["a","b","c","d","e","f","g","h","i"];

var playerTurn = 1;
$('#player1').toggleClass('active');

//updates who playes next and returns player ID.
function setPlayerTurn(){
    if(playerTurn == 1){
        playerTurn = 2;
        return "P1";
        
    }else{
        playerTurn = 1;
         return "P2";
    }
}

// [ a , b , c , d , e , f , g , h , i ]
// [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ]

var P1 = ["-","-","-","-","-","-","-","-","-"];
var P2 = ["-","-","-","-","-","-","-","-","-"];

////////////////////////////////////////////////////////////
//matches players selection against the win array
function didPlayerWin(player){
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
     for(var i = 0;i < win.length;i++){          
         var winComboCheck = win[i].split('');
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

}
///////////////////////////////////////////////////////////////

//click event
$(".boxes li").on("click",function(){
    console.log($(this).index());
    var i = $(this).index();
    if(playerTurn == 1){
     P1[i] = bIdent[i];
     $(this).addClass('box-filled-1');
     $('#player1').toggleClass('active');
    $('#player2').toggleClass('active');
     console.log('P1 Win?' + didPlayerWin(P1));
    }else{
     P2[i] = bIdent[i]; 
     $(this).addClass('box-filled-2');
     $('#player1').toggleClass('active');
    $('#player2').toggleClass('active');
     console.log('P2 Win?' + didPlayerWin(P2));
    }
    board[i] = setPlayerTurn();
    
    console.log('Board:' + board + '\n PlayerTurn:' + playerTurn + '\n P1:' + P1 + '\n P2:' + P2);
});


