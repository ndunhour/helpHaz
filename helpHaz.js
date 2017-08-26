$(document).ready(function(){
    $('.bkgrnd').on('click', function(){
        $('.fly').fadeIn('fast');
    });
    $('#hiddenDiv').on('click', function(event){
        console.log(event);
    });

    var c = document.getElementById("test");
    var rect = c.getBoundingClientRect()
    console.log( 'rect', rect );
    console.log('c', c.width)
    var ctx = c.getContext("2d");
    var ballRadius = 20;
    var x = c.width/5;
    console.log('x', x)
    var y = c.height-20;
    var dx = 1;
    var dy = -1;
    var blockH = 50;
    var blockW = 50;
    var numOfFlies = 5;
    var level = 1;
    var squashedEm = 1;
    var touched = 1;



    document.addEventListener('click', function(){
        console.log(event)
    });

    function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
    }

    function drawBoundry() {
        ctx.beginPath();
        ctx.rect(180, 80, blockH, blockW, 7);
        ctx.fillStyle = "#00f0f0";
        // ctx.fillStyle = "rgba(255, 255, 255, .01)";
        ctx.fill();
        ctx.closePath();
    }

    function collisionOfBoundry() {
        var locOfBlockX = 110;
        var locOfBlockY = 80;

        if(x > locOfBlockX && x < locOfBlockX + blockH && y > locOfBlockY && locOfBlockY < locOfBlockY + blockW){
            $('#bark').css('visibility', 'visable');
            console.log('touching haz')
        }else{
            console.log('not')

            $('#bark').css('visibility', 'hidden');
        }
    }

    // function levelUp(){
    //     level += 1;
    //     numOfFlies += 5;
    //     dx += 1;
    //     dx += 1;
    //     $('#level').text(level);
    // }

    // function squashed(){
    //     squashedEm += 1;
    //     var remainder = numOfFlies - squashedEm;
    //     $('#squashed').text(remainder);
    // }

    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        drawBall();
        drawBoundry();
        collisionOfBoundry();

        if(x + dx > c.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy > c.height-ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }

        x += dx;
        y += dy;
    }

    setInterval(draw, 10);

});