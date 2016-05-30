/**
 * Created by Bogdan on 5/16/2016.
 */
var stage;
var keys = {
    rkd: false,
    lkd: false,
    ukd: false,
    dkd: false
};
var i = 0;
var gameLoss = false;
var player;
var enemyBlock;
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
var score = 0;
var scoreText;
var collideCheck = false;
var ground;
var ground2;
var container;
var sceneMove = 0;
var scene = 1;
var mouseCheck = false;
var mouseTickCount = 20;
var currMouseTickCount = 0;
var bulletId = 0;
var bulletCounter = 1;


var goRight = function () {
    player.x += speedCurrent;
};
var goLeft = function () {
    player.x -= speedCurrent;
};
function fingerDown(e) {
    /*  console.log(e.keyCode);*/
    if (e.keyCode === 68) {
        keys.rkd = true;
    }
    if (e.keyCode === 87) {
        keys.ukd = true;
    }
    if (e.keyCode === 65) {
        keys.lkd = true;
    }
    if (e.keyCode === 83) {
        keys.dkd = true;
    }
    if (e.keyCode === 49) {
        collideCheck = true;
    }
    if (e.keyCode === 50) {
        scene = 2;
    }


}

function fingerUp(e) {
    /*    console.log(e.keyCode);*/
    if (e.keyCode === 68) {
        keys.rkd = false;
    }
    if (e.keyCode === 87) {
        keys.ukd = false;
    }
    if (e.keyCode === 65) {
        keys.lkd = false;
    }
    if (e.keyCode === 83) {
        keys.dkd = false;
    }
    if (e.keyCode === 49) {
        collideCheck = false;
    }

}


function mouseDown(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);
    addBullet("black", 10, 2, player.x,player.y, event.x, event.y);
    mouseCheck = true;
}
function mouseUp() {
    mouseCheck = false;
    console.log("released");
}



function bullet(id, color, size, speed, x, y, eX, eY) {
    this.id = id;
    this.color = color;
    this.size = size;
    this.x = x;
    this.y = y;
    this.eX = eX;
    this.eY = eY;
    this.velocityX = 1;
    this.velocityY = 1;
    this.speed = speed;
}


var bulletList = [];

function addBullet(color, bsize, bspeed, x, y, eX, eY) {
    bulletList[bulletId] = new bullet(bulletId, color, bsize, bspeed, x, y, eX, eY);
    bulletId += 1;
}


function updateBullet(bullet, player) {
    var dx = (bullet.eX - player.x);
    var dy = (bullet.eY - player.y);
    var mag = Math.sqrt(dx * dx + dy * dy);
    bullet.velocityX = (dx / mag) * speed;
    bullet.velocityY = (dy / mag) * speed;
    bullet.x += bullet.velocityX;
    bullet.y += bullet.velocityY;
}


function charJump() {


    var factor = 0.2;
    if (isJumping) {
        player.y -= jumpTemp;
        jumpTemp = (1 - factor) * jumpTemp;

        if (jumpTemp <= 1) {
            isJumping = false;
        }
    }
    else if (mustTouchGround) {
        player.y += jumpTemp;
        jumpTemp = (1 + factor) * jumpTemp;
    }


    //if((player.y)<100){
    //    console.log('stop');
    //    jumpSpeed=0;
    //}
    //else{}
    //console.log(jumpTemp);


}

function hitTest(rect1, rect2) {
    /*  console.log(" rect1 x = " + rect1.x + " rect 2 .x " + rect2.x + " rect2 width  " + rect2.width + " rect2 height " + rect2.height)*/
    if (rect1.x >= rect2.x + rect2.width

        || rect1.x + rect1.width <= rect2.x

        || rect1.y >= rect2.y + rect2.height

        || rect1.y + rect1.height <= rect2.y) {

        return false;

    }

    /*   console.log("HIT");*/
    if (gameLoss == false) {
        /*   alert("You lost this easy game, shame on you!");*/
        gameLoss = true;
    }
    return true;

}

function playerMove(directionPath) {
    for (var i = 1; i <= 2; i++) {
        (function () {
            setTimeout(function () {
                speedCurrent = speedCurrent / 2;

                if (speedCurrent < 0.5) {
                    speedCurrent = speed;
                }

            }, i * 100);
        })(i);
    }
}


function movePlayer() {
    if (keys.rkd) {
        speedCurrent = speed;
        playerMove(goRight);
        player.x += speed;
    }
    if (keys.lkd) {
        speedCurrent = speed;
        playerMove(goLeft);
        player.x -= speed;
    }
    if ((keys.ukd) && (isJumping == false)) {


        if (mustTouchGround) {
            return;
        }
        /*        console.log("jump");
         console.log(player.y);*/
        isJumping = true;
        jumpTemp = jumpSpeed;
        mustTouchGround = true;
    }
}

function collide() {
    hitTest(enemyBlock, player);

}
function moveEnemy() {
    enemyBlock.x = enemyBlock.x - enemySpeed;
    if (enemyBlock.x < 0 - enemyBlock.width) {
        enemyBlock.x = 800;
    }
}

function groundMove() {
    ground.x--;
    ground2.x--;
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

    scoreText = new createjs.Text('Score : ', "30px Courier", "#FFF");


    enemyBlock = new createjs.Shape();
    enemyBlock.graphics.beginFill('#FFF');
    enemyBlock.graphics.drawRect(0, 0, 20, 40);
    // if checkColider = true ) {    enemyBlock = new createjs.Bitmap("img/shroom.png") }
    enemyBlock.x = 800;
    enemyBlock.y = 400;
    enemyBlock.width = 20;
    enemyBlock.height = 40;
    container = new createjs.Container();
    ground = new createjs.Bitmap("img/ground.png");
    ground.x = 0;
    ground.y = 440;
    ground2 = new createjs.Bitmap("img/ground.png");
    ground2.x = 800;
    ground2.y = 440;
    container.addChild(ground2, ground, enemyBlock);

    stage.addChild(container);
    stage.addChild(scoreText);

    stage.addChild(player);
    console.log(player);


    window.addEventListener('keydown', fingerDown);
    window.addEventListener('keyup', fingerUp);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
}
function createBullet() {
    console.log("Bullet fired");
}

function tickHappened(e) {
    /*console.log(container.x);*/
    movePlayer();
    if (isJumping || mustTouchGround) {
        charJump();
    }
    if (player.y >= 400) {
        mustTouchGround = false;
        player.y = 400;
    }
    if (player.x < 0) {
        player.x = 0;

    }
    if (ground.x < -800) {
        ground.x = 0;
    }
    if (ground2.x < 0) {
        ground2.x = 800;
    }
    collide();
    moveEnemy();
    score++;

    scoreText.text = "Score : " + score;


    if (collideCheck == true) {
        console.log("carnacxe");

        if (( sceneMove ) < 800 * scene) {

            container.x--;
            sceneMove++;
        }

    }
    currMouseTickCount = currMouseTickCount % mouseTickCount;

    if (mouseCheck) {
        if (currMouseTickCount == 0) {
            createBullet();
        }
        currMouseTickCount++;
    }
    $.each(bulletList, function (index, bullet) {
        updateBullet(bullet, player);
        bullet2 = new createjs.Shape();
        bullet2.graphics.beginFill("#FFF");
        bullet2.graphics.drawRect(bullet.x, bullet.y, bullet.size, bullet.size);
        console.log(bullet.x + "   "+ bullet.y + "   "+ bullet.size + "   "+ bullet.size);
        stage.addChild(bullet2);
        if ( bulletCounter%130 == 1) {
            console.log("trigger");
            stage.removeChild(bullet2);

        }




    });
    console.log(bulletCounter);
    bulletCounter ++;

    stage.update(e);
}