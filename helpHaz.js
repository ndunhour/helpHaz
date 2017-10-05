$(document).ready(function(){
    var c = document.getElementById("imgBox");
    var start = document.getElementById("startBtn");
    var rect = c.getBoundingClientRect();
    var ctx = c.getContext("2d");

    // ball
    var ballRadius = 20;
    var circles = [  {x:100,y:100,r:20,vx:1,vy:1,color:"black"},
                     {x:275,y:300,r:20,vx:2,vy:-1,color:"black"},
                     {x:20,y:350,r:20,vx:-1,vy:-2,color:"black"},
                     {x:300,y:70,r:20,vx:-2,vy:1,color:"black"},
                     {x:450,y:50,r:20,vx:-1,vy:-2,color:"black"}
                    ];


    // collision Block
    var blockX = 175;
    var blockY = 100;
    var blockH = 175;
    var blockW = 500;

    var level = 0;
    var squashedEm = 0;
    var touched = 5;


    c.addEventListener('click', squashed);
    start.addEventListener('click', draw);

    function drawHearts(){
        for(var t = 0; t < touched; t++){
            $('#lives').append('<span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>');
        }
    }

    function drawBall() {

        for(var i=0; i <circles.length; i++){

             ctx.beginPath();
             ctx.fillStyle = circles[i].color;
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
        ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
        ctx.fill();
        ctx.closePath();

    }

    function collisionOfBoundry(){
        for(var j=0; j<circles.length; j++){
            if(circles[j].x === blockX || circles[j].x === blockX + blockY || circles[j].y === blockY || circles[j].y === blockY + blockH){
                // touched -= 1;
                // $('#lives span').remove();
                // drawHearts();
                if(touched === 0){
                    $('#lives').text('GAME OVER');
                }

            }
        }
    }



    // function levelUp(){
    //         level += 1;
    //         console.log('level', level);

    // }

    // get rid of circles
    function squashed(){
        var evtX = event.layerX;
        var evtY = event.layerY;
        for(var s=circles.length - 1; s >= 0; --s){
            if( circles[s].x - (circles[s].r + 40) < evtX && circles[s].y - (circles[s].r + 40) < evtY && circles[s].x + (circles[s].r + 40) > evtX && circles[s].y + (circles[s].r + 40) > evtY ){

                circles[s].color = "rgba(255, 255, 255, 0.01)";
                squashedEm  += 1;
            }
            if(circles.length === squashedEm){
                $('#lives').text('LEVEL UP');
                for(var redraw = 0; redraw < circles.length; redraw++){
                    circles[redraw].color = "black";
                    squashedEm = 0;
            }
        }
        }
        ctx.clearRect(0,0,c.width, c.height);

    }

    // randomly position the circles
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    // creates canvas, balls, boundry, and collision of boundry
    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        drawBall();
        drawBoundry();
        collisionOfBoundry();
    }

    setInterval(draw, 20);

});