$(document).ready(function(){
    var c = document.getElementById("imgBox");
    var ctx = c.getContext("2d");
    var rect = c.getBoundingClientRect();

    var cont = document.getElementById("continueBtn");
    var setImg = document.getElementById("imgBox");
    var again = document.getElementById("againBtn");


    var ballRadius = 20; // ball
    var circles = [  {x:100,y:100,r:10,vx:1,vy:-2,color:"black"},
                     {x:275,y:300,r:10,vx:-1,vy:3,color:"red"},
                     {x:35,y:350,r:10,vx:-2,vy:-2,color:"blue"},
                     {x:300,y:70,r:10,vx:-2,vy:1,color:"black"},
                     {x:450,y:50,r:10,vx:-1,vy:-2,color:"black"}
                    ];

    var images = [  ('private/underDeck.jpg'),
                    ('private/onDeck.jpg'),
                    ('private/atThePark.jpg')
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
    cont.addEventListener('click', next);
    again.addEventListener('click', next);

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
        // ctx.fillStyle = "rgba(255, 255, 255)";

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
                for(var redraw = 0; redraw < circles.length; redraw++){
                    circles[redraw].color = "black";
                    squashedEm = 0;
                }
                level += 1;
                document.getElementById('canvas').style.display = "none";
                document.getElementById('continueBtn').style.display = "block";


                // resets game back to level 1
                if(level === images.length){
                    level = 0;

                    document.getElementById('canvas').style.display = "none";
                    document.getElementById('gameOver').style.display = "block";
                    document.getElementById('continueBtn').style.display = "none";
                    document.getElementById('score-container').style.display = "none";


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
        // setImg.setAttribute("style","background-image: url(" + images[level] + ");");
        setImg.style.backgroundImage = "url('" + images[level] + "')";
        ctx.clearRect(0, 0, c.width, c.height);
        drawBall();
        drawBoundry();
        collisionOfBoundry();
        $('#level').html('<h2>LEVEL ' + (level + 1) + '<h2>');

    }

    function next(){
        document.getElementById('continueBtn').style.display = "none";
        document.getElementById('canvas').style.display = "block";
        document.getElementById('gameOver').style.display = "none";
        document.getElementById('score-container').style.display = "block";

    }

    function playAgain(){
        console.log('in again');
    }

    setInterval(draw, 20);

});