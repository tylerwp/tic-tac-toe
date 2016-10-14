
var gameModule = (function () {

    //game board object
    function TicTacToeGame() {
        this.gameboard = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];//keeps track of what has been played
        this.winCombos = ["abc", "def", "ghi", "adg", "beh", "cfi", "aei", "ceg"];//all possible combinations to win the game
        this.boardFieldReference = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];//letter box board map
        this.playersTurn = 1;
        this.isWinner = 0;

        //check if player has winning combination
        TicTacToeGame.prototype.CheckPlayerWin = function (player) {
            var didWin = false;
            var winMatch = "";

            for (var p = 0; p < player.length; p++) {
                //build string without "-" from player array
                if (player[p] !== "-") {
                    winMatch += player[p];
                }
            }

            // Check for Winner by looping through Win combinations
            for (var i = 0; i < this.winCombos.length; i++) {
                var winComboCheck = this.winCombos[i].split('');
                var charCount = 0;//matching win counter
                //Loop through each win combination character
                for (var e = 0; e < winComboCheck.length; e++) {
                    //Combination match add to total for current win combination.
                    if (winMatch.indexOf(winComboCheck[e]) != -1) {
                        charCount++;
                    }
                }

                //if 3 have matched for current combination then we have a winner.
                if (charCount >= 3) {
                    console.log('WIN WIN WIN');
                    didWin = true;
                }

            }

            return didWin;
        };

        //updates who plays next and returns player ID.
        TicTacToeGame.prototype.setPlayerTurn = function () {
            if (this.playersTurn == 1) {
                this.playersTurn = 2;
                return "P1";
            } else {
                this.playersTurn = 1;
                return "P2";
            }
        };



    }

    //player object
    function tttPlayers(playerName) {
        this.playerName = playerName;
        //keep track of moves player has made
        this.Moves = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
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

    // hide finish view
    $('#finish').hide();

    //start button click event to trigger board view
    $("#start .button").on("click", function () {
        $("#start").hide();

        //clear player input fields
        $('#P1name').val('');
        $('#P2name').val('');

        $('#player1').addClass('active');

        $('#startPlayers').show();


    });

    //setup AI button
    $('.noob').on('click', function () {
        if ($('#P2name').val() !== 'RoboNoob') {
            $('#P2name').val('RoboNoob');
            $('#P2name').prop('disabled', true);
        } else {
            $('#P2name').val('');
            $('#P2name').prop('disabled', false);
        }
    });

    //NEW GAME, PLAYER SETUP - click event for player/AI names
    $("#startPlayers .button").on("click", function () {

        //validate input
        if ($('#P1name').val() !== '' && $('#P2name').val() !== '') {

            //create new players
            P1 = new tttPlayers($('#P1name').val());
            P2 = new tttPlayers($('#P2name').val());//*** if P2 player name = NoobRobo then apply AI

            //add player names to player boxes
            $('.playerName1').html(P1.playerName);
            $('.playerName2').html(P2.playerName);

            //setup events on board
            $(".boxes li").on("click", function () {
                gameBoardClickEvents(this);
            });

            //on hover show game icons
            $(".boxes li").mouseenter(function () {

                if (tttGame.playersTurn == 1) {
                    $(this).toggleClass('playerHvr-1');
                } else {
                    $(this).toggleClass('playerHvr-2');
                }

                //on mouse leave hide game icons
            }).mouseleave(function () {

                if (tttGame.playersTurn == 1) {
                    $(this).toggleClass('playerHvr-1');
                } else {
                    $(this).toggleClass('playerHvr-2');
                }
            });


            $('#startPlayers').hide();
            $('#board').show();

            //remove required validation element if any
            if ($('.required').length) {
                $('.required').remove();
            }

        } else {
            if (!$('.required').length) {
                $('#startPlayers header').prepend('<div class="required">Cannot start game without player names or AI.</div>');
                $(".required").effect("shake");
            } else {
                $(".required").effect("shake");
            }
        }

    });




    //Add click events to game board
    function gameBoardClickEvents(box) {
        console.log($(box).index());
        var i = $(box).index();

        if (tttGame.playersTurn == 1) {
            //Player One moves - update player object            
            P1.Moves[i] = tttGame.boardFieldReference[i];
            $(box).addClass('box-filled-1');
            $(box).off();
            $('#player1').toggleClass('active');
            $('#player2').toggleClass('active');

            //check if player One made the winning move
            if (tttGame.CheckPlayerWin(P1.Moves)) {
                tttGame.isWinner = true;
                $('#board').hide();
                $('#finish').show().addClass('playerWin-1');
                $('#finish header').removeClass('end-x');
                $('#finish header').addClass('end-o');
                $('.message').html('Winner');
                $('.playername').html(P1.playerName);
            }

        } else {
            //Player Two moves - update player object 
            P2.Moves[i] = tttGame.boardFieldReference[i];
            $(box).addClass('box-filled-2');
            $(box).off();
            $('#player1').toggleClass('active');
            $('#player2').toggleClass('active');
            //check if player Two made the winning move
            if (tttGame.CheckPlayerWin(P2.Moves)) {
                tttGame.isWinner = true;
                $('#board').hide();
                $('#finish').show().addClass('playerWin-2');
                $('#finish header').removeClass('end-o');
                $('#finish header').addClass('end-x');
                $('.message').html('Winner');
                $('.playername').html(P2.playerName);
            }
        }

        //update gameboard for next player
        tttGame.gameboard[i] = tttGame.setPlayerTurn();

        //if player Two is AI then run AI moves 
        if (tttGame.playersTurn == 2) {
            if (P2.playerName == 'RoboNoob') {

                //setup AI for RoboNoob
                var noobMove = null;
                //create copy of gameboard so to not effect the orginal.                
                var tttGameGb = new Array();
                for(var gbCopy = 0;gbCopy < tttGame.gameboard.length;gbCopy++){                    
                    tttGameGb[gbCopy] = tttGame.gameboard[gbCopy];
                }
                
                //append index to item array for reference after filtering.
                for (var gb = 0; gb < tttGameGb.length; gb++) {
                    tttGameGb[gb] = gb + tttGameGb[gb];                   
                }
                //Select random element from array that contains '-' that is an uplayed box
                (function (src) {
                    var gBoardindex = (~~(Math.random() * src.length));
                    var gBresult = src[gBoardindex];
                    if (gBresult !== -1) {
                        noobMove = parseInt(gBresult.replace('-', ''));
                    }
                } (tttGameGb.filter(function (elem) {
                                                        return elem.includes('-');
                                                    }
                                   )
                  )
                );

                if (noobMove !== -1) {
                    //update player moves
                    P2.Moves[noobMove] = tttGame.boardFieldReference[noobMove];
                    //check if AI player made the winning move
                    if (tttGame.CheckPlayerWin(P2.Moves)) {
                        $('#board').hide();
                        $('#finish').show().addClass('playerWin-2');
                        $('#finish header').addClass('end-x');
                        $('.message').html('Winner');
                        $('.playername').html(P2.playerName);
                    } else {
                        tttGame.gameboard[noobMove] = tttGame.setPlayerTurn();
                    }

                    //prevent click events while AI runs
                    $('#board header').append('<div class="overlay"></div>');

                    //set timeout to slow the display of the AI

                    setTimeout(function () {

                        var boxes = $(".boxes li");
                        $(boxes[noobMove]).addClass('box-filled-2');
                        $(boxes[noobMove]).off();
                        $('#player1').toggleClass('active');
                        $('#player2').toggleClass('active');

                        $('.overlay').remove();

                    }, 500);



                }


            }
        }


        //check for tie, check for completed game board and no winners
        if (($.inArray('-', tttGame.gameboard) == -1) && (!tttGame.isWinner)) {
            // game over - tie    
            $('#board').hide();
            $('#finish').show().addClass('playerWinNone');
            $('#finish header').removeClass('end-o end-x');
            $('.message').html("It's a Tie!");
            $('.playername').html('');
        }
        
        //console.log('Board:' +  tttGame.gameboard + '\n PlayerTurn:' + tttGame.playersTurn + '\n P1:' + P1.Moves + '\n P2:' + P2.Moves);
    }


    //GAME OVER, click event to start a new game
    $('#finish .button').on('click', function () {

        //clear game and hide game board view
        $('#board').hide();
        //hide player setup
        $('#startPlayers').hide();

        //clear player views
        $('#player1').removeClass('active');
        $('#player2').removeClass('active');

        // hide finish view
        $('#finish').hide().removeClass('playerWin-1 playerWin-2 playerWinNone');
        $('.playername').html('');
        $('#P2name').prop('disabled', false);

        //start button click event to trigger board view
        $("#start").show();

        //remove box events and classes
        $('.boxes li').removeClass('box-filled-1 playerHvr-1');
        $('.boxes li').removeClass('box-filled-2 playerHvr-2');
        $(".boxes li").off();

        //clear out game objects
        P1 = null;
        P2 = null;
        tttGame = null;
        tttGame = new TicTacToeGame();

    });

})();








