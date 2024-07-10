

let init = () =>{
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let bgGrad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 5, canvas.width/2, canvas.height/2, 350);
    bgGrad.addColorStop(1, '#2550a7');
    bgGrad.addColorStop(0, '#4FEBA2');

    ctx.fillStyle = bgGrad;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = init;