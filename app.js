
document.addEventListener("DOMContentLoaded", ()=>{

    //initialize constants and variables
    const squares = document.querySelectorAll('.container div')
    const gameOverSign = document.querySelector('.game-over')
    gameOverSign.classList.remove('blink')

    const block = document.querySelector('.container div')
  
    const width = 10
    const speed = 1

    let interval = 0
    let intervalTime = 1000
    let currentSnake = [2,1,0]
    

    let appleIndex = 0
    let direction = 1

    let score = 0

    const scoreDisplay = document.querySelector('span')

    //event listeners for buttons on phone/tablet
    //left button click
    const left = document.querySelector('.left');
    left.addEventListener("click",()=>{
        direction = -1
    });
    //right button click
    const right = document.querySelector('.right');
    right.addEventListener("click",()=>{
        direction = 1
    });
    //down button click
    const down = document.querySelector('.down');
    down.addEventListener("click",()=>{
        direction = +width 
    });
    //up button click
    const up = document.querySelector('.up');
    up.addEventListener("click",()=>{
        direction = -width
    });

    const startButton = document.querySelector('.start-button')
    startButton.addEventListener("click", startGame)

    function startGame(){
      
        //initialize start state of a game
        //clear snake state
        gameOverSign.classList.remove('blink')
        currentSnake.forEach(el => squares[el].classList.remove('snake'))
        currentSnake =[2,1,0]
        currentSnake.forEach(el => squares[el].classList.add('snake'))
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

    //moveOutcomes: 1)empty spot 2)eats apple 3)game ended: hits walls(4 options)/eats itself

    function moveOutcomes(){
        //2) case eats apple
        if (squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[currentSnake[currentSnake.length-1]].classList.add('snake')
            currentSnake.push(tail)

            randomApple()
            score = (score+1)*10
            scoreDisplay.innerText= score

            clearInterval(interval)
            intervalTime*= speed
            interval = setInterval(moveOutcomes,intervalTime)
            
        }
        //3) game ends
        if(
            (currentSnake[0]+width >=width*width && direction === width)||
            (currentSnake[0]%width === width-1 && direction === 1)||
            (currentSnake[0] < width && direction === -width)||
            (currentSnake[0]%width === 0 && direction === -1)||
            squares[currentSnake[0]+direction].classList.contains('snake')
        ){
            gameOverSign.classList.add('blink')
            return clearInterval(interval)
        }

        //1)snake moves to an empty spot
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0]+direction)
        squares[currentSnake[0]].classList.add('snake')  
    }

    //document event listener on key up->checks if direction changed(up/down/left/right)
    document.addEventListener('keyup', control)

    function control(e){
        // squares[currentIndex].classList.remove('snake') //controlna tocka

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
       while(squares[appleIndex].classList.contains('snake')) //in case random apple hits snake
        
        squares[appleIndex].classList.add('apple')

    }

})

