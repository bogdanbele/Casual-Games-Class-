var stage;
var keys = {
    rkd:false,
    lkd:false,
    ukd:false,
    dkd:false
};
var i=0;
var gameLoss = false;
var player;
var enemyBlock ;
/*var player = new Object();
player.width = 20;
player.height = 40;
var enemyBlock = new Object();
enemyBlock.width = 20;
enemyBlock.heigh = 40;*/
var speed = 3;
var speedCurrent;
var jumpTemp = 0;
var jumpSpeed = 25;
var isJumping = false;
var mustTouchGround = false;
var enemySpeed = 6;

var goRight = function () {
    player.x += speedCurrent;
};
var goLeft = function () {
    player.x -= speedCurrent;
};
function fingerDown(e){
   /* console.log(e.keyCode);*/
    if(e.keyCode === 68 ){
        keys.rkd=true;
    }
    if(e.keyCode === 87 ){
        keys.ukd=true;
    }
    if(e.keyCode === 65 ){
        keys.lkd=true;
    }
    if(e.keyCode === 83 ){
        keys.dkd=true;
    }


}

function fingerUp(e){
/*    console.log(e.keyCode);*/
    if(e.keyCode === 68 ){
        keys.rkd=false;
    }
    if(e.keyCode === 87 ){
        keys.ukd=false;
    }
    if(e.keyCode === 65 ){
        keys.lkd=false;
    }
    if(e.keyCode === 83 ){
        keys.dkd=false;
    }


}

var charJump = function(){





            var factor = 0.2;
            if(isJumping){
                player.y -= jumpTemp;
                jumpTemp = (1 - factor) * jumpTemp ;

                if(jumpTemp <= 1)
                {
                    isJumping = false;
                }
            }
    else if(mustTouchGround)
            {
                player.y += jumpTemp;
                jumpTemp = (1 + factor) * jumpTemp;
            }


            //if((player.y)<100){
            //    console.log('stop');
            //    jumpSpeed=0;
            //}
            //else{}
            //console.log(jumpTemp);






    };


function hitTest(rect1,rect2) {
console.log (" rect1 x = " + rect1.x + " rect 2 .x " + rect2.x + " rect2 width  " + rect2.width + " rect2 height " + rect2.height)
    if ( rect1.x >= rect2.x + rect2.width

        || rect1.x + rect1.width <= rect2.x

        || rect1.y >= rect2.y + rect2.height

        || rect1.y + rect1.height <= rect2.y )

    {

console.log("nothit");
        return false;

    }

console.log("HIT");
    if( gameLoss == false) {
    alert("You lost this easy game, shame on you!");
        gameLoss = true;
    }
    return true;

}

function playerMove(directionPath) {
    for (var i = 1; i <=2; i++) {
        (function () {
            setTimeout(function () {
                speedCurrent = speedCurrent / 2;
                directionPath();
                if (speedCurrent < 0.5) {
                    speedCurrent = speed;
                }

            }, i * 100);
        })(i);
    }
}

function movePlayer(){
    if(keys.rkd){
        speedCurrent = speed;
        playerMove(goRight);
        player.x += speed;
    }
    if(keys.lkd){
        speedCurrent = speed;
        playerMove(goLeft);
        player.x -= speed;
    }
    if((keys.ukd)&&(isJumping==false)){


if(mustTouchGround){
    return;
}
        console.log("jump");
        console.log(player.y);
        isJumping = true;
        jumpTemp= jumpSpeed;
        mustTouchGround = true;
    }
}

function collider(){
    hitTest(enemyBlock,player);

}
function moveEnemy(){
    enemyBlock.x = enemyBlock.x -enemySpeed;
    if (enemyBlock.x < 0 - enemyBlock.width) {
        enemyBlock.x = 800;
    }
}


function initialize() {
    stage = new createjs.Stage("intro");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tickHappened);

    player = new createjs.Shape();
    player.graphics.beginFill("#FFF");
    player.graphics.drawRect(0, 0, 20, 40);
    player.x = 50;
    player.y = 400;
    player.width = 20;
    player.height = 40;

    enemyBlock = new createjs.Shape();
    enemyBlock.graphics.beginFill('#FFF');
    enemyBlock.graphics.drawRect(0,0,20,40);
    enemyBlock.x = 800;
    enemyBlock.y= 400;
    enemyBlock.width = 20;
    enemyBlock.height = 40;

    stage.addChild(enemyBlock);
    stage.addChild(player);
    console.log(player);


    window.addEventListener('keydown', fingerDown);
    window.addEventListener('keyup', fingerUp);
}


function tickHappened(e) {
    movePlayer();
    if(isJumping || mustTouchGround){
        charJump();
    }
    if(player.y>=400){
        mustTouchGround=false;
        player.y= 400;
    }
    collider();
    moveEnemy();


    stage.update(e);
}