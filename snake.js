var blocksize = 25;
var rows = 20;
var cols = 40;
var board;
var context;
var snakeX = blocksize*9;
var snakeY = blocksize*9;
var snakeBody = [];
var velocityX = 0;
var velocityY = 0;
var foodX;
var foodY;
var isGameOver = false;
window.onload = function (){
    board = document.getElementById("board");
    board.height = rows*blocksize;
    board.width = cols*blocksize;
    context = board.getContext("2d");
    placefood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update,100);
}
function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY == 0){
        velocityX = 0;
        velocityY = -1;
    }
    if(e.code == "ArrowDown" && velocityY == 0){
        velocityX = 0;
        velocityY = 1;
    }
    if(e.code == "ArrowLeft" && velocityX == 0){
        velocityX = -1;
        velocityY = 0;
    }
    if(e.code == "ArrowRight" && velocityX == 0){
        velocityX = 1;
        velocityY = 0;
    }
}

function update(){
    if(isGameOver){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);
    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blocksize,blocksize);
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]); 
        placefood();
    }
    for(let i = snakeBody.length-1; i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }
    context.fillStyle = "lime";
    snakeX += velocityX*blocksize;
    snakeY += velocityY*blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
    for(let i = 0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize);
    }

    if(snakeX <0 || snakeX > cols*blocksize-1 || snakeY<0 || snakeY>rows*blocksize-1){
        isGameOver = true;
        reset();
    }
    for(let i = 0; i< snakeBody.length;i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            isGameOver = true;
            reset();
        }
    }
}
function reset(){
    isGameOver = false;
    snakeBody.length = 0;
    snakeX = blocksize*9;
    snakeY = blocksize*9;
    velocityX = 0;
    velocityY = 0;
    placefood();
    alert("Game Over :(");
    update();
}
function placefood(){
    foodX = Math.floor(Math.random()*cols)*blocksize;
    foodY = Math.floor(Math.random()*rows)*blocksize;
}