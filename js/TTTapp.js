
//var Module = (function () {

    //game board object
    function TicTacToeGame() {
        this.gameboard = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];//keeps track of what has been played
        this.winCombos = ["abc", "def", "ghi", "adg", "beh", "cfi", "aei", "ceg"];//all possible combinations to win the game
        this.boardFieldReference = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];//letter box board map
        this.playersTurn = 1;

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
    // ready player one
    $('#player1').toggleClass('active');
    // hide finish view
    $('#finish').hide();

    //start button click event to trigger board view
    $("#start .button").on("click", function () {
        $("#start").hide();

        //clear player input fields
        $('#P1name').val('');
        $('#P2name').val('');

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

    $("#startPlayers .button").on("click", function () {

        //validate input
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

    });




    //Add click events to game board
    function gameBoardClickEvents(box) {
        console.log($(box).index());
        var i = $(box).index();
        if (tttGame.playersTurn == 1) {
            P1.Moves[i] = tttGame.boardFieldReference[i];
            $(box).addClass('box-filled-1');
            $(box).off();
            $('#player1').toggleClass('active');
            $('#player2').toggleClass('active');

            if (tttGame.CheckPlayerWin(P1.Moves)) {
                $('#board').hide();
                $('#finish').show().addClass('playerWin-1');
                $('#finish header').addClass('end-o');
                $('.message').html('Winner');
                $('.playername').html(P1.playerName);
            }

        } else {
            P2.Moves[i] = tttGame.boardFieldReference[i];
            $(box).addClass('box-filled-2');
            $(box).off();
            $('#player1').toggleClass('active');
            $('#player2').toggleClass('active');

            if (tttGame.CheckPlayerWin(P2.Moves)) {
                $('#board').hide();
                $('#finish').show().addClass('playerWin-2');
                $('#finish header').addClass('end-x');
                $('.message').html('Winner');
                $('.playername').html(P2.playerName);
            }
        }

        tttGame.gameboard[i] = tttGame.setPlayerTurn();

        //if player 2 AI than run AI moves 
        if (tttGame.playersTurn == 2) {
            if (P2.playerName == 'RoboNoob') {
                var noobMove = $.inArray("-", tttGame.gameboard);
                if (noobMove !== -1) {
                    P2.Moves[noobMove] = tttGame.boardFieldReference[noobMove];
                    var boxes = $(".boxes li");
                    $(boxes[noobMove]).addClass('box-filled-2');
                    $(boxes[noobMove]).off();
                    $('#player1').toggleClass('active');
                    $('#player2').toggleClass('active');
                    if (tttGame.CheckPlayerWin(P2.Moves)) {
                        $('#board').hide();
                        $('#finish').show().addClass('playerWin-2');
                        $('#finish header').addClass('end-x');
                        $('.message').html('Winner');
                        $('.playername').html(P2.playerName);
                    } else {
                        tttGame.gameboard[noobMove] = tttGame.setPlayerTurn();
                    }

                }

            }
        }


        //check for tie
        if ($.inArray('-', tttGame.gameboard) == -1) {
            // game over - tie    
            $('#board').hide();
            $('#finish').show().addClass('playerWinNone');
            // $('#finish header').addClass('end-x');
            $('.message').html("It's a Tie!");
            $('.playername').html('');
        }

        //log testing
        //console.log('Board:' +  tttGame.gameboard + '\n PlayerTurn:' + tttGame.playersTurn + '\n P1:' + P1.Moves + '\n P2:' + P2.Moves);
    }

    $('#finish .button').on('click', function () {

        //clear game and hide game board view
        $('#board').hide();
        //hide player setup
        $('#startPlayers').hide();

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

//})();

//TODO: 

    // Done: (just disabled) Use the module pattern to wrap all of your JavaScript code into a single global variable or an immediately invoked function.
    // Bug: fix its a tie display of game icons
    // need input validation
    // Bug: playing AI, player highlights not working correctly 






