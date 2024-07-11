
class ball {
    constructor(x, y, radius, color, vx=0, vy=0){
        this.x = x;
        this.y = y;
        if(vx === 0){
            this.vx = Math.random() * (2 - (-2)) + (-2);
        }else{
            this.vx = vx;
        }
        if(vy === 0){
            this.vy = Math.random() * (2 - (-2)) + (-2);
        }else{
            this.vy = vy;
        }
        this.radius = radius;
        this.constellationRadius = 100;
        this.color = color;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}



let canvasManager = {
    canvas: document.getElementById('canvas'),
    ctx:  document.getElementById('canvas').getContext('2d'),
    maxBalls: 40,
    balls: [],

    init: function(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.maxBalls = 40;
        this.createBalls();
        this.animate();
    },

    createBall(side=0){
        let radius =5;
        if(side === 0){
            side = Math.round(Math.random() * 4);
        }
        let x;
        let y;
        switch(side){
            case 1:
                x = Math.random() * this.canvas.width;
                y = 0-radius;
                break;
            case 2:
                x = this.canvas.width+radius;
                y = Math.random() * this.canvas.height;
                break;
            case 3:
                x = Math.random() * this.canvas.width;
                y = this.canvas.height+radius;
                break;
            case 4:
                x = 0-radius;
                y = Math.random() * this.canvas.height;
                break;
            default:
                break;
        }
        let color = `rgb(180, 202, 237`;
        this.balls.push(new ball(x, y, radius, color));
    },

    createBalls(){
        console.log('creating balls');
        for(let i = 0; i < this.maxBalls; i++){
            this.createBall();
            console.log(this.balls);
        }
    },

    animate(){


        let bgGrad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 5, canvas.width/2, canvas.height/2, 350);
        bgGrad.addColorStop(1, '#2550a7');
        bgGrad.addColorStop(0, '#4FEBA2');

        ctx.fillStyle = bgGrad;

        this.balls.forEach(ball => {
            ball.draw(ctx);
            ball.x += ball.vx;
            ball.y += ball.vy;

        });
        requestAnimationFrame(this.animate);
    }

}

let constellationCheck = (ball, balls, canvas, distance, ctx) => {
    //if this ball is within a certain distance of another ball, draw a line between them
    balls.forEach(otherBall => {
        let dist = Math.sqrt(Math.pow(ball.x - otherBall.x, 2) + Math.pow(ball.y - otherBall.y, 2));
        if(dist < distance){
            let opacity = 1 - dist/distance;
            ctx.beginPath();
            ctx.moveTo(ball.x, ball.y);
            ctx.lineTo(otherBall.x, otherBall.y);
            ctx.strokeStyle = `rgba(180, 202, 237, ${opacity})`;
            ctx.stroke();
            ctx.closePath();
        }
    });

};

let boundaryCheck = (ball, canvas) => {

    //if a ball hits a canvas border, reverse its velocity on that axis

    if(ball.x + ball.radius > canvas.width + ball.radius*3|| ball.x - ball.radius < 0-ball.radius*3){
        if(ball.x + ball.radius > canvas.width + ball.radius*2){
            canvasManager.balls.splice(canvasManager.balls.indexOf(ball), 1);
            canvasManager.createBall(2);
        }else{
            canvasManager.balls.splice(canvasManager.balls.indexOf(ball), 1);
            canvasManager.createBall(4);
        }
    }
    if(ball.y + ball.radius > canvas.height + ball.radius*3 || ball.y - ball.radius < 0- ball.radius*3){
        if(ball.y + ball.radius > canvas.height + ball.radius*2){
            canvasManager.balls.splice(canvasManager.balls.indexOf(ball), 1);
            canvasManager.createBall(3);
        }else{
            canvasManager.balls.splice(canvasManager.balls.indexOf(ball), 1);
            canvasManager.createBall(1);
        }
    }
};

let animate = () =>{
    
    console.log(`animating, balls: ${canvasManager.balls.length}`);

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0,0,canvas.width, canvas.height);

    let bgGrad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 5, canvas.width/2, canvas.height/2, 350);
    bgGrad.addColorStop(1, '#2550a7');
    bgGrad.addColorStop(0, '#4FEBA2');
    
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    canvasManager.balls.forEach(ball => {
        ball.draw(ctx);
        ball.x += ball.vx;
        ball.y += ball.vy;

        boundaryCheck(ball, canvas);
        constellationCheck(ball, canvasManager.balls, canvas, 150, ctx);

    });
    requestAnimationFrame(animate);
}
let grabAnim = () =>{
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    animate(ctx, canvas, canvasManager);
}


let init = () =>{
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvasManager.createBalls();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;});
    window.requestAnimationFrame(animate);
    
}

window.onload = init;