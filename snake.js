"use strict";
// notes
/*

*/
// variable definitions

var headStyle = '#000';
var tailStyle = '#eee';
var appleStyle = '#f00';
var rectangleSide = 10;
var currentDirection = "right";
var timeout = 400;
var canvasWidth = 1000;
var canvasHeight = 1000;
var isGameOver = false;
var snakeGameObj; 
var appleGameObj;  
var interval;

//starting up
window.onload = function() {
    resetGame();
}

document.onkeydown = function(e) {
    e = e || window.event;
    // var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    // if (charCode) {
    //     console.log("Character typed: " + String.fromCharCode(charCode));
    // }
    let key = e.keyCode;
    console.log('key',key);
    switch(key) {
        case 37:
            if(currentDirection !== 'right') {
                setDirection('left');
            }            
            break;        
        case 38:
            if(currentDirection !== 'down') {
                setDirection('up');                
            }
            break;
        case 39:
            if(currentDirection !== 'left') {
                setDirection('right');                
            }
            break;        
        case 40:
            if(currentDirection !== 'up') {
                setDirection('down');                
            }        
            break;
        default:
            break;
    }
};

// function definitions
function startGame(){
    console.log('started game');
     interval =setInterval(function() {
            if(isGameOver) {
                clearInterval(interval);
            }
            snakeGameObj.move();
        },timeout); 
}
function resetGame()
{
    let canvas = document.getElementById("Snake");
    let ctx = canvas.getContext("2d");
    initializeSnakeGame(ctx);
}
function getRectWithUpdatedPosition(rect) {
    console.log('rect', rect);
    let newRect;
    switch(currentDirection) {
        case "up":
            newRect = new Rectangle(rect.x, rect.y - rectangleSide);
            break;
        case "down":
            newRect = new Rectangle(rect.x, rect.y + rectangleSide);        
            break;
        case "left":
            newRect = new Rectangle(rect.x - rectangleSide, rect.y);        
            break;
        case "right":
            newRect = new Rectangle(rect.x + rectangleSide, rect.y);          
            break;
        default:
            break;
    }
    return newRect;
}
function setDirection(direction) {
    currentDirection = direction;
    console.log('key pressed', direction);
}
function createApple() {

    let randomXCoord = getRandomCoordinate(10, canvasWidth - rectangleSide);
    let randomYCoord = getRandomCoordinate(10, canvasHeight - rectangleSide);
    let apple = new Apple(randomXCoord,randomYCoord);
    return apple;
}
function getRandomCoordinate(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let number =  Math.floor(Math.random() * (max - min + 1)) + min;
    // ensures coordinates are always within bounds and has coordinate which is a multiple of 10
    return number - number % 10;
}
function initializeSnakeGame(context) {
    console.log('hit start snake');
    snakeGameObj = new Snake();
    appleGameObj = createApple();   
    snakeGameObj.initialize();    
    // reset apple position if it ends up having same coordinates as one of the snake pieces
    if(appleGameObj === snakeGameObj.snakeArray[0]) {
        while(appleGameObj === snakeGameObj.snakeArray[0]) {
            appleGameObj.changeAppleCoord();
        }
    }
    snakeGameObj.renderSnake(context);
    appleGameObj.renderApple(context);  
}
function hasGameEnded(headOfSnake) {
    return headOfSnake.x < 0 || headOfSnake.x > canvasWidth || headOfSnake.y < 0 || headOfSnake.y > canvasHeight
}
// class definitions
class Rectangle {

    constructor(xPos,yPos) {
        this.x = xPos;
        this.y = yPos;
        this.len = rectangleSide;
        this.width = rectangleSide;
        // this.direction = currDirection;
    }

}
class Apple extends Rectangle {
    // super(constructor)
    constructor(xPos, yPos) {
        super(xPos,yPos);
    }
    changeAppleCoord() {
        this.x = getRandomCoordinate(10, canvasWidth - rectangleSide);
        this.y = getRandomCoordinate(10, canvasHeight - rectangleSide);
    }
    renderApple(ctx){
        ctx.fillStyle = appleStyle;
        ctx.fillRect(this.x, this.y, this.len, this.width);
    }
}
class Snake {
    constructor() {
        //rectangle array to hold all snake objects
        this.snakeArray =[];
    }
    initialize(){
        this.addHead();
        this.addTail();
        this.addTail();
    }
    addHead() {
        let newHead = new Rectangle(50,50);
        this.snakeArray.push(newHead);
    }
    addTail() {
        const currTail = this.snakeArray[this.snakeArray.length - 1];
        let newTail = new Rectangle(currTail.x, currTail.y);

        switch(currentDirection){
            case "right":
                newTail.x -= 10
                break;
            case "left":
                newTail.x += 10;
                break;
            case "up":
                newTail.y += 10;
                break;
            case "down":
                newTail.y -= 10;
                break;
            // default is right
            default:
                break;
        }
        this.snakeArray.push(newTail);
    }
    renderSnake(ctx) {
        for(let i = 0; i < this.snakeArray.length; i++) {
            if(i===0) {
                ctx.fillStyle = headStyle;
            } else {
                ctx.fillStyle = tailStyle;
            }
            let rect = this.snakeArray[i];
            ctx.fillRect(rect.x, rect.y, rect.width, rect.len);
            
        }
    }
    //TO FIX
    move() {
        let newSnakeArray = [];
        let head = this.snakeArray[0];
        if(hasGameEnded(head)) {
            isGameOver = true;
        }
        if(isGameOver) {
            console.log('reached game over');
            return;
        }
        
        //adding updated head to array first, then adding the rest of the value
        let firstRect = getRectWithUpdatedPosition(head);
        if(hasGameEnded(firstRect)){
            isGameOver = true;
            return;
        }
        newSnakeArray.push(firstRect);
        for(let i = 1; i < this.snakeArray.length; i++) {
            newSnakeArray.push(this.snakeArray[i-1]);
        }
        this.snakeArray = newSnakeArray;

        //check to see if apple was eaten
        if(this.hasEatenApple(head)) {
            this.addTail();
            appleGameObj.changeAppleCoord();
        }
        let canvas = document.getElementById("Snake");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, canvas.width, canvas.height);
        this.renderSnake(ctx);
        appleGameObj.renderApple(ctx);
    }
    eatApple() {
        this.addTail();
    }
    hasEatenApple(headOfSnake) {
        return headOfSnake.x === appleGameObj.x && headOfSnake.y === appleGameObj.y;
    }
}