const gameBoard = (() => {
    let boardArray = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    let updateBoard = () => {
        let buttons = document.querySelectorAll(".buttons");
        let i = 0;
        buttons.forEach((item => {

            item.textContent = boardArray[i];
            i++;
        }))


    };


    let changeValue = function (where, which) {
        boardArray[where] = which;
        updateBoard();


    }
    let checkEmpty = function (where) {
        if (boardArray[where] == "") {
            return true;
        } else if (boardArray[where] != "") {
            return false;
        }
    }
    let checkTie = function () {
        if (boardArray.every(isFull) == true) {
            return true;
        } else {
            return false;
        }

        function isFull(element) {
            return element != "";
        }

    };
    let checkWin = function () {
        if (boardArray[0] !== "") {
            if (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) {
                return true;
            } else if (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) {
                return true;

            } else if (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]) {
                return true;
            }

        }
        if (boardArray[3] != "") {
            if (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) {
                return true;
            }
        }
        if (boardArray[6] != "") {
            if (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]) {
                return true;
            }
        }
        if (boardArray[1] != "") {
            if (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) {
                return true;
            }
        }
        if (boardArray[2] != "") {
            if (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) {
                return true;
            } else if (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]) {
                return true;
            }
        }
        return false;

    };
    let clear = () => {
        let head = document.querySelector("#head");
        head.textContent="Tic-Tac-Toe";
        boardArray = [
            "", "", "",
            "", "", "",
            "", "", ""
        ];
        updateBoard();
    }

    return { changeValue, checkEmpty, checkTie, checkWin, clear };

})();


const playerCreater = (name, mark) => {
    let turn = true;

    let getName = () => {
        return name;
    }
    let getMark = () => {
        return mark;
    }
    let checkTurn = () => {
        return turn;

    }
    let toggleTurn = () => {
        if (turn === false) {
            turn = true;
        } else if (turn === true)
            turn = false;
    }



    return { getName, getMark, toggleTurn, checkTurn };
}


const game = (() => {
    let head = document.querySelector("#head");
    let playersArray = [];
    const submitPlayer = document.querySelector("#submitButton");
    submitPlayer.addEventListener("click", function () {
        const modal = document.querySelector("#modal");
        const playerMark = document.getElementsByName('options');

        let firstName = firstInput.value;
        let secondName = secondInput.value;

        let readValue="";
        for (i = 0; i < playerMark.length; i++) {
            if (playerMark[i].checked)
                readValue = playerMark[i].value;
        }

        let player1 = playerCreater(firstName, readValue);
        let player2Mark="";
        if (readValue == "X") {
            player2Mark = "O"

        } else {
            player2Mark = "X";
        }
        let player2 = playerCreater(secondName, player2Mark);
        modal.style.display = "none";
        playersArray = [player1, player2];



    })

    let decideTurn = (playersArray, id) => {
        if (playersArray[0].checkTurn() === true) {
            playersArray[0].toggleTurn();
            marker(playersArray[0], id);

        } else if (playersArray[0].checkTurn() === false) {
            playersArray[0].toggleTurn();
            marker(playersArray[1], id);


        }

    };



    let markSquare = () => {
        let buttons = document.querySelectorAll(".buttons");

        buttons.forEach((item => {
            item.addEventListener("click", () => {
                let id = item.dataset.id;
                if (gameBoard.checkEmpty(id)) {
                    decideTurn(playersArray, id);
                }


            })

        }))

    };
    let marker = (player, id) => {
        gameBoard.changeValue(id, player.getMark());
        if (gameBoard.checkWin()) {
            head.textContent=player.getName() + " is the winner";
           
        } else if (gameBoard.checkTie()) {
            head.textContent="TIE";
            
        }

    };


    return { markSquare};

})();
game.markSquare();
let playAgain = document.querySelector("#playAgain");
playAgain.addEventListener("click", ()=>{
    gameBoard.clear();
})

