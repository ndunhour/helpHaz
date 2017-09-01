$(document).ready(function(){

    var c = document.getElementById("imgBox");
    var rect = c.getBoundingClientRect();
    var ctx = c.getContext("2d");

    // ball
    var ballRadius = 20;
    var circles = [  {x:100,y:100,r:30,vx:1,vy:1}, // orange ball
                     // {x:275,y:300,r:30,vx:1,vy:-1}, // green ball
                     // {x:20,y:350,r:30,vx:-2,vy:-1}, // purple
                     // {x:300,y:70,r:30,vx:-1,vy:1}, // pink ball
                     // {x:450,y:50,r:30,vx:-2,vy:-2}  // tourquoise
                    ];


    // collision Block
    var blockX = 175;
    var blockY = 100;
    var blockH = 175;
    var blockW = 500;


    var numOfFlies = 3;
    var level = 1;
    var squashedEm = 1;
    var touched = 5;

    c.addEventListener('click', squashed);

    function drawBall() {

        for(var i=0; i <circles.length; i++){
             ctx.beginPath();
             ctx.fillStyle = "black";
             ctx.arc(circles[i].x,circles[i].y,circles[i].r,0,2*Math.PI,false);
             ctx.fill();

             var passTop = circles[i].x + circles[i].vx + circles[i].r;
             var rectAll = rect.top + rect.width;
             var passBott = circles[i].x - circles[i].r + circles[i].vx;
             var daTop = rect.top;

            if(circles[i].x + circles[i].vx > c.width-ballRadius || circles[i].x + circles[i].vx < ballRadius) {
                circles[i].vx = - circles[i].vx;
            }
            if(circles[i].y + circles[i].vy > c.height-ballRadius || circles[i].y + circles[i].vy < ballRadius) {
                circles[i].vy = - circles[i].vy;
            }

             circles[i].x += circles[i].vx;
             circles[i].y += circles[i].vy;
         }
    }

    function drawBoundry() {
        ctx.beginPath();
        ctx.rect(blockX, blockY, blockW, blockH);
        // ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
        // ctx.fillStyle = "rgba(255, 255, 255)";

        ctx.fill();
        ctx.closePath();

    }

    function collisionOfBoundry(){
        for(var j=0; j<circles.length; j++){

            if(circles[j].x === blockX || circles[j].x === blockX + blockY || circles[j].y === blockY || circles[j].y === blockY + blockH){
                touched -= 1;
                $('#lives span').remove();
                drawHearts();
                if(touched === 0){
                    $('#lives').text('GAME OVER')
                }
            }

        }

    }



    // function levelUp(){
    //     level += 1;
    //     numOfFlies += 5;
    //     dx += 1;
    //     dx += 1;
    //     $('#level').text(level);
    // }

    function squashed(){
        console.log('event', event)
        var evtX = event.layerX;
        var evtY = event.layerY;
        for(var s=circles.length - 1; s >= 0; --s){
            if( circles[s].x - circles[s].r < evtX && circles[s].y - circles[s].r < evtY && circles[s].x + circles[s].r > evtX && circles[s].y + circles[s].r > evtY ){
                circles.splice(s,1);
            }
        }
        ctx.clearRect(0,0,c.width, c.height);

        // squashedEm += 1;
        // var remainder = numOfFlies - squashedEm;
        // $('#squashed').text(remainder);

    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        drawBall();
        drawBoundry();
        collisionOfBoundry();
    }

    setInterval(draw, 10);

    function drawHearts(){
        for(var t = 0; t < touched; t++){
            $('#lives').append('<span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>');
        }
    }
});