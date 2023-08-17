//                                  Code for showing sequence of lights
let metaObj = {
    sequenceArray: [],
    userEntryArray: [],
    userEntryIndex: 0,
}

squares = document.querySelectorAll(".gridSquare");

beginSequence = document.querySelector(".beginSequence");
beginSequence.addEventListener('click', generateSquaresArray);

function generateSquaresArray(){
    //Randomize the array generation
    metaObj.sequenceArray = [2, 3, 5, 6];
    squares[metaObj.sequenceArray[0]].addEventListener('transitionend', function transition(e){
        transitionToNextSquare(e, metaObj.sequenceArray, 0);
    }, {once:true});
    squares[metaObj.sequenceArray[0]].classList.add("lightUp");
    
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


//                                 Code for entering in sequence of lights

enterButton = document.querySelector(".enterSequence");
enterButton.addEventListener('click', () => {
    squares.forEach(element => {
        element.addEventListener('click', registerEntry);
    });
});

function registerEntry(e){
    if(parseInt(e.target.classList[0].charAt(4)) !== metaObj.sequenceArray[metaObj.userEntryIndex]){
        alert("You lose!");
    }
    else{
        if(metaObj.userEntryIndex == metaObj.sequenceArray.length - 1){
            alert("You win!");
        }
        metaObj.userEntryIndex++;
    }
}
