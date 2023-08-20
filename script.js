//                                  Code for showing sequence of lights
let metaObj = {
    sequenceArray: [],
    userEntryIndex: 0,
    currLevel: 1,
    highScore: 0,
}
rightSidebar = document.querySelector(".rightSidebar");
rightSidebar.textContent = `High Score: ${metaObj.highScore}`;

squares = document.querySelectorAll(".gridSquare");

beginSequence = document.querySelector(".beginSequence");
beginSequence.addEventListener('click', generateSquaresArray,{once:true});

function generateSquaresArray(){
    //Randomize the array generation
    metaObj.sequenceArray = [];
    for(let i = 0; i < metaObj.currLevel; i++){
        let num = Math.floor(Math.random() * 9);
        if(i >= 2){
            while(num == metaObj.sequenceArray[i-1] || num == metaObj.sequenceArray[i-2]){
                num = Math.floor(Math.random() * 9);
            }
        }
        else if (i == 1){
            while(num == metaObj.sequenceArray[i-1]){
                num = Math.floor(Math.random() * 9);
            }
        }
        metaObj.sequenceArray.push(num);
    }
    console.log(metaObj.sequenceArray);
    squares[metaObj.sequenceArray[0]].addEventListener('transitionend', function transition(e){
        transitionToNextSquare(e, metaObj.sequenceArray, 0);
    }, {once:true});
    squares[metaObj.sequenceArray[0]].classList.add("lightUp");
    
}

function transitionToNextSquare(e, arr, index){
    if(e.propertyName !== "background-color"){return; }
    e.target.classList.remove("lightUp");
    console.log("removed");
    //If this is the last square
    if(index == arr.length - 1){
        metaObj.currLevel++;
        squares.forEach(element => {
            element.addEventListener('click', registerEntry);
        });
        return;
    }
    //If there are more squares in the sequence
    else{
        squares[arr[index+1]].addEventListener('transitionend', function transition(eN){
            transitionToNextSquare(eN,  arr, index+1);
        }, {once:true});
        squares[arr[index+1]].classList.add("lightUp");
    }
    
}


//                                 Code for entering in sequence of lights

// enterButton = document.querySelector(".enterSequence");
// enterButton.addEventListener('click', () => {
    
// });

function registerEntry(e){
    //If a guess is wrong
    if(parseInt(e.target.classList[0].charAt(4)) !== metaObj.sequenceArray[metaObj.userEntryIndex]){
        alert("You lose!"); 
        //Reset game
        squares.forEach(element => {
            element.removeEventListener('click', registerEntry);
        });
        beginSequence.addEventListener('click', generateSquaresArray,{once:true});
        metaObj.userEntryIndex = 0;
        metaObj.currLevel = 1;
    }
    //If a guess is correct
    else{
        squares[metaObj.sequenceArray[metaObj.userEntryIndex]].addEventListener('transitionend', removeText);
        e.target.textContent = `Correct ${metaObj.userEntryIndex+1}/${metaObj.sequenceArray.length}`;
        squares[metaObj.sequenceArray[metaObj.userEntryIndex]].classList.add("correct");
        //If its the last guess of a sequence
        if(metaObj.userEntryIndex == metaObj.sequenceArray.length - 1){
            metaObj.userEntryIndex = 0;
            squares.forEach(element => {
                element.removeEventListener('click', registerEntry);
            });
            //If a high score was reached  
            if(metaObj.currLevel - 1 > metaObj.highScore){
                metaObj.highScore = metaObj.currLevel - 1;
                rightSidebar.textContent = `High Score: ${metaObj.highScore}`;
            }
            setTimeout(generateSquaresArray, 2000);
            
        }
        else{
            metaObj.userEntryIndex++;
        }
        
    }
}

removeText = function(e){
    e.target.classList.remove("correct");
    e.target.textContent = "";
    e.target.removeEventListener('transitionend', removeText);
}

//                                            Code for the modal

instructionsBox = document.getElementById("modal-btn");
instructionsModal = document.querySelector(".modal-content")
closeButton = document.querySelector(".close-btn")

instructionsBox.addEventListener('click', () => {
    instructionsModal.style.display = "block";
})

closeButton.addEventListener('click', () => {
    instructionsModal.style.display = "none";
})



//Left to implement:
//Author and github link in bottom right
//Easy and hard mode to made squares flash quicker
//Make it look better