let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbutton").addEventListener("click",resetFunction);
let newGamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg= document.querySelector("#msg")

let turnO = true; // player O turn
let info = document.querySelector("#info");
const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];



boxes.forEach((box)=>{
    box.addEventListener("click",()=> {
        console.log("box was clicked")
        if(turnO){
            box.innerText = "O";
            turnO=false;

        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
info.innerText=`CurrentPlayer -${box.innerText}`;
        checkWinner();
    });
    

});

const disabledboxes=()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
        msgcontainer.classList.add("hide");
    }
    info.innerText="Start Playing "
    // info.classList.add("hide")
};

const showWinner= (winner) =>{
    msg.innerText = `congratulations winnner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
    setTimeout(() => {
        resetFunction();
    }, 3000);
};
const checkWinner = () => {
    let winnerFound = false;

    for (let patterns of winPattern) {
        let pos1 = boxes[patterns[0]].innerText;
        let pos2 = boxes[patterns[1]].innerText;
        let pos3 = boxes[patterns[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winnerFound = true;
                console.log("winner team is ", pos1);
                showWinner(pos1);
                return; // Stop further checking if winner found
            }
        }
    }

    // If all boxes are filled and no winner
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (!winnerFound && allFilled) {
        disabledboxes();
        setTimeout(() => {
            alert("Match Drawn!");
            resetFunction();
        }, 1000);
    }
};



newGamebtn.addEventListener("click",enableboxes);

function resetFunction(){
let result = confirm("Do you want to proceed?");
if (result) {
    // User clicked OK
    console.log("User clicked OK");
    enableboxes();
} else {
    // User clicked Cancel
    console.log("User clicked Cancel");
}
}

