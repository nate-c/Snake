"use strict";
// notes
/*

*/
// variable definitions

var headStyle = '#000';
var tailStyle = '#eee';
var appleStyle = '#f00';
var rectangleSide = 10;
var currDirection = "right";
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
function startGame(){
    console.log('started game');
    while(!isGameOver) {
        setTimeout(snakeGameObj.move(),timeout)

    }
}

//function definitions
function updateRectPosition(rect,prevX,prevY,newX,newY) {
    // let newRect = new Rectangle();
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
    context.fillStyle = appleStyle;
    context.fillRect(appleGameObj.x, appleGameObj.y, appleGameObj.width,appleGameObj.len);
}

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
        console.log('apple aple', this);
        ctx.fillRect(this.x, this.y, this.width, this.length);
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

        switch(currDirection){
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
        // let newSnakeArray = [];
        // for(let i = 0; i < this.snakeArray.length; i++) {
        //     if(i === 0) {
        //         let head = this.snakeArray[0];
        //         // updateRectPosition(head,head.x, head.y,)
        //     }

        // }
        // this.snakeArray = newSnakeArray;
        console.log("i'm moving");
        isGameOver = true;
    }
    eatApple() {
        this.addTail();
    }
}