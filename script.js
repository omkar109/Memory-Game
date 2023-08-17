squares = document.querySelectorAll(".gridSquare");


beginSequence = document.querySelector(".beginSequence");
beginSequence.addEventListener('click', generateSquaresArray);


function generateSquaresArray(){
    squares[2].addEventListener('transitionend', function transition(e){
        transitionToNextSquare(e, [2, 3, 5, 6, 3, 4, 8, 2, 1, 0, 4, 3], 0);
    }, {once:true});
    squares[2].classList.add("lightUp");
    
}

function transitionToNextSquare(e, arr, index){
    if(e.propertyName !== "background-color"){return; }
    e.target.classList.remove("lightUp");
    if(index == arr.length - 1){
        return;
    }
    else{
        squares[arr[index+1]].addEventListener('transitionend', function transition(eN){
            transitionToNextSquare(eN,  arr, index+1);
        }, {once:true});
        squares[arr[index+1]].classList.add("lightUp");
    }
    
}
