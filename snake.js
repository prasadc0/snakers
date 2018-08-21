const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d'); 
const ground = new Image()
ground.src = 'img/ground.jpg';
var velocity = 100; 


const rat = new Image() 
rat.src = 'img/rat.svg';

const dir = new Image() 
dir.src = 'img/director.png';


const box = 32;

let snake =[];
snake[0]={
    x: 9*box,
    y:10*box
}
 

let food = {

    x : Math.floor(Math.random()*17+1) * box ,
    y : Math.floor(Math.random()*15+3) * box   
}
console.log(food);

let score = 0 ;

/// control a snake ///
let d; 


document.addEventListener('keydown',direction);

function direction(event){
    if(event.keyCode == 32 || event.keyCode == 13){
        alert('Click Ok to RESUME')
    }
    else if(event.keyCode == 37  && d!= 'RIGHT' ){
        d = 'LEFT';
    }else  if(event.keyCode == 38   && d!= 'DOWN' ){
        d = 'UP';
    }else  if(event.keyCode == 39  && d!= 'LEFT'  ){
        d = 'RIGHT';
    }else  if(event.keyCode == 40  && d!= 'UP' ){
        d = 'DOWN';
    }
}

function draw(){
    ctx.drawImage (ground,0,0);
    for(let i=0; i<snake.length ; i++){
        ctx.fillStyle = (i==0)?'green':(i== snake.length-1 ? 'yellow' : ( i %2 ==0 ? 'red':'blue')  ) ;
     //   ctx.fillRect(snake[i].x,snake[i].y,box,box);
     ctx.beginPath();ctx.beginPath();

     var size = ((snake.length * 16) /(i+1));
     console.log( size ,'is lenght')
        if(i==0)
        {
            ctx.arc(snake[i].x,snake[i].y, (16-i), 0, 2 * Math.PI);
            ctx.arc(snake[i].x ,snake[i].y -3,4, 0, 2 * Math.PI);
            ctx.arc(snake[i].x ,snake[i].y +4,4, 0, 2 * Math.PI);
        }
        else if(i< 10){
            ctx.arc(snake[i].x,snake[i].y, (16-i), 0, 2 * Math.PI);
        }else{
            ctx.arc(snake[i].x,snake[i].y, (6), 0, 2 * Math.PI);
        }
       
     
        
    //  ctx.fillStyle = 'green';  
     //   ctx.strokeStyle ='red';
     //   ctx.strokeRect(snake[i].x,snake[i].y,box,box);
     
     
//ctx.arc(100,75,50,0,2*Math.PI);
 
ctx.fill();
ctx.stroke();

    }
    ctx.drawImage(rat,food.x,food.y);

    
/// old snake position

let snakeX = snake[0].x;
let snakeY = snake[0].y;


if(d=='LEFT') snakeX -=box;
if(d=='UP') snakeY -=box;
if(d=='RIGHT') snakeX +=box;
if(d=='DOWN') snakeY +=box;


/// if snake eats food 
console.log('@',score ,snakeX,snakeY,food.x,food.y);
if(snakeX == food.x  && snakeY == food.y){
    score++;   
 
    if(sessionStorage.getItem('highscore') == undefined || sessionStorage.getItem('highscore') < score){
        sessionStorage.setItem('highscore', score)
    }
    console.log(score);
    food = {

        x : Math.floor(Math.random()*17+1) * box ,
        y : Math.floor(Math.random()*15+3) * box   
    }
}else{
    snake.pop();
}

function collision(head, array){
    for(let i=0 ; i<array.length ; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
// 
 


let newHead ={
    x: snakeX,
    y : snakeY
}
snake.unshift(newHead);



ctx.fillStyle= 'yellow';
ctx.font = "30px Comic Sans MS";
 
ctx.strokeText('Score :        '+score, 2*box , 1.6* box)

ctx.strokeText('HighScore : '+(sessionStorage.getItem('highscore') == null ? 0 : sessionStorage.getItem('highscore')), 22 * box ,2 * box)
if(snakeX < - (box) || snakeX >32 *box || snakeY < - (box) || snakeY >19*box  ){

    if(sessionStorage.getItem('highscore') == null || sessionStorage.getItem('highscore') < score){
        sessionStorage.setItem('highscore',score) ; 
        
        alert('GAME OVER and you have set a new HIGH SCORE ',score);
    } 
    else {
        alert('You got hit');
    } 
   if(sessionStorage.getItem('highscore')< score){
    
    sessionStorage.setItem('highscore',score);
   
} 
    document.location.reload()    
}   
}

let game = setInterval(draw, velocity);