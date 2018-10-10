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

//starting up
window.onload = function() {
    let canvas = document.getElementById("Snake");
    let ctx = canvas.getContext("2d");
    initializeSnakeGame(ctx);
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
            setDirection("left");
            break;        
        case 38:
            setDirection("down");
            break;
        case 39:
            setDirection("right");
            break;        
        case 40:
            setDirection("up");
            break;
        default:
            break;
    }
};

// function definitions
function startGame(){
    console.log('started game');
     var interval =setInterval(function() {
            if(isGameOver) {
                clearInterval(clearInterval);
            }
            snakeGameObj.move();
        },timeout); 
}
function getRectWithUpdatedPosition(rect) {
    console.log('rect', rect);
    let newRect;
    switch(currentDirection) {
        case "up":
            newRect = new Rectangle(rect.x, rect.y + rectangleSide);
            break;
        case "down":
            newRect = new Rectangle(rect.x, rect.y - rectangleSide);        
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
        createApple();
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
                newTail += 10;
                break;
            case "up":
                newTail.y -= 10;
                break;
            case "down":
                newTail.y += 10;
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
        if(isGameOver) {
            console.log('reached game over');
            return;
        }
        let newSnakeArray = [];
        let head = this.snakeArray[0];
        //adding updated head to array first, then adding the rest of the value
        let firstRect = getRectWithUpdatedPosition(head);
        for(let i = 0; i < this.snakeArray.length; i++) {
            if(i === 0 ) {
                newSnakeArray.push(firstRect);
            } 
            else {
                newSnakeArray.push(this.snakeArray[i-1]);
            }
        }
        this.snakeArray = newSnakeArray;

        if(head.x < 0 || head.x > canvasWidth) { 
            isGameOver = true;
        }
        if(head.y < 0 || head.y > canvasHeight) { 
            isGameOver = true;
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
}