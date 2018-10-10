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
var timeout = 800;
var canvasWidth = 1000;
var canvasHeight = 1000;

//starting up
window.onload = function() {
    let canvas = document.getElementById("Snake");
    let ctx = canvas.getContext("2d");
    startSnakeGame(ctx);
    //var c=document.getElementById("myCanvas");
    //var ctx=c.getContext("2d");
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

function startSnakeGame(context) {
    let snake = new Snake();
    let apple = createApple();
    console.log('apple',apple);
    console.log('hit start snake');
    // reset apple position if it ends up having same coordinates as one of the snake pieces
    // if(apple === snake.snakeArray[0]) {
    //     while(apple === snake.snakeArray[0]) {
    //         apple.changeAppleCoord();
    //     }
    // }
    snake.initialize();
    snake.renderSnake(context);
    apple.renderApple(context);  
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
        ctx.fillRect(this.x, this.y, 
            this.width, this.length);
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
        console.log('snake array', this.snakeArray);
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
    renderSnake(ctx) {
        for(let i = 0; i < this.snakeArray.length; i++) {
            if(i===0) {
                ctx.fillStyle = headStyle;
            } else {
                ctx.fillStyle = tailStyle;
            }
            let rect = this.snakeArray[i];
            console.log('rect', rect);
            ctx.fillRect(rect.x, rect.y, rect.width, rect.len);
            
        }
    }
}