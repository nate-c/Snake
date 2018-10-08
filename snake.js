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
var rectangleLength = 10;
var currDirection = "right";


//function definitions
function updateRectPosition(prevX,prevY,newX,newY) {
    
}

function createApple() {

}

class Rectangle {

    constructor(xPos,yPos) {
        this.x = xPos;
        this.y = yPos;
        this.len = rectangleLength;
        this.width = rectangleLength;
    }

}

class Snake {
    constructor() {
        //rectangle array to hold all snake objects
        this.snakeArray =[];
    }
    initialize(){
        this.addHead();
    }
    addHead() {
        let newHead = new Rectangle(50,50);
        this.snakeArray.push(newHead);
    }
    addTail() {
        const currTail = this.snakeArray[this.snakeArray.length - 1];
        let newXPos, newYPos;
        switch(currDirection){
            case "right":
                break;
            case "left":
                break;
            case "up":
                break;
            case "down":
                break;
            // default is right
            default:
                break;
        }
        let newTail = new Rectangle(currTail.xPos,currTail.yPos);
    }
    renderSnake() {

    }
}