"use strict";
// notes
/*

*/
// variable definitions
var canvas = document.getElementById("Snake");
var ctx = canvas.getContext("2d");
var headStyle = "#0f0";
var tailStyle = "#eee";
var appleStyle = "#f00";
var rectangleSide = 10;
var currDirection = "right";
var timeout = 800;
var canvasWidth = 1000;
var canvasHeight = 1000;


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
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startSnakeGame() {
    let snake = new Snake();
    let apple = createApple();
    if(apple === snake.snakeArray[0]) {
        while(apple === snake.snakeArray[0]) {
            apple.changeAppleCoord();
        }
    }
    snake.renderSnake();  
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
    super(constructor)

    changeAppleCoord() {
        createApple();
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
    //TO FIX
    move() {
        let newSnakeArray = [];
        for(let i = 0; i < this.snakeArray.length; i++) {
            if(i === 0) {
                let head = this.snakeArray[0];
                // updateRectPosition(head,head.x, head.y,)
            }

        }
        this.snakeArray = newSnakeArray;
    }
    renderSnake() {
        for(let snakeSection in this.snakeArray) {
            // x, y, width, length
            ctx.rect(snakeSection.x, snakeSection.y, 
                snakeSection.width, snakeSection.length);
        }
        ctx.stroke();
    }
}