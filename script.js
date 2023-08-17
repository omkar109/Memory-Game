squares = document.querySelectorAll(".gridSquare");


beginSequence = document.querySelector(".beginSequence");
beginSequence.addEventListener('click', generateSquaresArray);


function generateSquaresArray(){
    squares[3].addEventListener('transitionend', function transition(e){
        transitionToNextSquare(e, [3, 8, 4, 1], 0);
    });
    squares[3].classList.add("lightUp");
    
}


function transitionToNextSquare(e, arr, index){
    if(e.propertyName !== "transform"){return; }
    squares[arr[index]].style.transition = "none";
    e.target.classList.remove("lightUp");
    if(index == arr.length - 1){
        return;
    }
    else{
        squares[arr[index+1]].addEventListener('transitionend', function transition(eN){
            transitionToNextSquare(eN,  arr, index+1);
        });
        squares[arr[index+1]].classList.add("lightUp");
    }
    
}
