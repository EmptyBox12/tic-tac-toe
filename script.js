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
        boardArray[where]=which;
        updateBoard();
        
    }
    let checkEmpty = function (where) {
        if(boardArray[where]==""){
            return true;
        }else{
            return false;
        }
    }
   

    return{changeValue, checkEmpty};

})();


const playerCreater = (name, mark) =>{
    let turn = true;

    let getName = () => {
        return name;
    }
    let getMark = () => {
        return mark;
    }
    let checkTurn = () =>{
        return turn;

    }
    let toggleTurn = () =>{
        if(turn===false){
            turn=true;
        }else if(turn===true)
            turn=false;
        }
    

    return{getName, getMark, toggleTurn, checkTurn};
}


const game = (()=>{
  
  
    let createPlayers = () =>{
        let player1name = prompt("Player 1 Name", "name");
        let player1mark= prompt("Player 1 mark", "X");
        player1mark = player1mark.toUpperCase();
        let player1 = playerCreater(player1name,player1mark);
    
        
        let player2name = prompt("player2 name");
        let player2mark;
        if(player1mark=="X"){
            player2mark="O";
        }else{
            player2mark="X";
        }
        let player2 = playerCreater(player2name,player2mark);
        let playerArray = [player1,player2];
        return playerArray;
          
    };
    let playersArray = createPlayers();
    


    let decideTurn = (playersArray, id, item) =>{
        if(playersArray[0].checkTurn()===true){
            playersArray[0].toggleTurn();
            marker(playersArray[0], id, item);
            
        }else if(playersArray[0].checkTurn()===false){
            playersArray[0].toggleTurn();
            marker(playersArray[1], id,item);
            
            
        }

    };
  


    let markSquare = () =>{
        let buttons = document.querySelectorAll(".buttons");
       
        buttons.forEach((item => {
            item.addEventListener("click",()=>{
                let id = item.dataset.id;   
                decideTurn(playersArray,id, item);


                
            })
            
        }))

    };
    let marker = (player,id,item) =>{
        if(gameBoard.checkEmpty(id)){
            item.textContent=player.getMark();
           
            
        }
    };


    return{markSquare};

})();
game.markSquare();

