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
   

    return{changeValue};

})();


const playerCreater = (name, mark) =>{

    let getName = () => {
        return name;
    }
    let getMark = () => {
        return mark;
    }

    return{getName, getMark};
}



//gets Buttons ID on click
let buttons = document.querySelectorAll(".buttons");
       
        buttons.forEach((item => {
            item.addEventListener("click",()=>{
                console.log(item.dataset.id);
            })
            
        }))