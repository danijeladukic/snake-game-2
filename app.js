document.addEventListener("DOMContentLoaded", ()=>{

    //initialize constants and variables
    const squares = document.getElementsByClassName('container')
    const width = 10

    let interval = 0
    let intervalTime = 1000
    let currentSnake = [2,1,0]

    let appleIndex = 0
    let direction = 1

    let score = 0

    const scoreDisplay = document.getElementsByTagName('span')

    let currentIndex = 0 //first square

    //moveOutcomes: 1)empty spot 2)eats apple 3)game ended: hits walls(4 options)/eats itself


    //on click of a button game starts/restarts
    const startButton = document.getElementsByTagName('button')
    startButton.addEventListener('click', startGame)

    function startGame(){
        //initialize start state of a game
        //clear snake state
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        currentSnake = [2,1,0]
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        //new apple to random position
        squares[appleIndex].classList.remove('apple')
        randomApple()

        //initial snake direction and score
        direction = 1
        score = 0
        scoreDisplay.innerText = score

        //current index
        currentIndex = 0

        //setInterval() that calles moveOutcomes
        interval = setInterval(moveOutcomes, intervalTime)

    }

    //document event listener on key up->checks if direction changed(up/down/left/right)
    document.addEventListener('keyup', control)

    function control(e){
        squares[currentIndex].classList.remove('snake') //controlna tocka

        if(e.keyCode === 37){
            direction = -1
        }
        else if(e.keyCode === 38){
            direction = -width
        } 
        else if(e.keyCode === 39){
            direction= 1
        } 
        else if(e.keyCode === 40){
            direction = +width
        }

    }

    //function random apple

    function randomApple(){
    
       do{
        appleIndex = Math.floor(Math.random() * squares.length)}
       while(squares[appleIndex].classList.contains('snake'))//in case random apple hits snake
        
    squares[appleIndex].classList.add('apple')

    }

    //animation when game over
    



})