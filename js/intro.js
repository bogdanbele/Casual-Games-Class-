{
    var stage;
    var keys = {
        rkd: false,
        lkd: false,
        ukd: false,
        dkd: false
    };

    var gameLoss = false;
    var player;
    var enemyBlock = {};
    enemyBlock.width = 20;
    enemyBlock.heigh = 40;
    var weaponColide = [];
    weaponColide.x = 0;
    weaponColide.y = 0;
    weaponColide.width = 0;
    weaponColide.height = 0;
    var speed = 3;
    var speedCurrent;
    var jumpTemp = 0;
    var jumpSpeed = 25;
    var isJumping = false;
    var mustTouchGround = false;
    var enemySpeed = 6;
    var score = 0;
    var scoreText;
    var healthText;
    var sceneChange = false;
    var ground;
    var ground2;
    var container;
    var sceneMove = 0;
    var scene = 1;
    var mouseCheck = false;
    var weaponCooldown = 20;
    var weaponDuration = 1;
    var weaponWidh = 50;
    var weaponHeight = 50;
    var attackTimer = 0;
    var attackCheck = false;
    var weaponDamage = 2;
    var enemyList = [];
}


function resetWeapon() {
    weaponColide.x = 0;
    weaponColide.y = 0;
    weaponColide.width = 0;
    weaponColide.height = 0;
}

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
        sceneChange = true;
    }
    if (e.keyCode === 50) {
        scene = 2;
    }
}

function fingerUp(e) {
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
        sceneChange = false;
    }
}

function mouseDown(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);
    mouseCheck = true;
}

function mouseUp() {
    mouseCheck = false;
    console.log("released");
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
        isJumping = true;
        jumpTemp = jumpSpeed;
        mustTouchGround = true;
    }
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

function moveEnemies() {
for ( var i = 0; i < enemyList.length; i++){



    var enemyBlock = enemyList[i];
    if (enemyBlock.enemyMove == true ) {
    if (enemyBlock.alive) {
    enemyBlock.x = enemyBlock.x - enemySpeed;
    if (enemyBlock.x < 0 - enemyBlock.width) {
        enemyBlock.x = 780;
        }
    }
    }
}
}


function hitTest(rect1, rect2) {
    /*  console.log(" rect1 x = " + rect1.x + " rect 2 .x " + rect2.x + " rect2 width  " + rect2.width + " rect2 height " + rect2.height)*/
    if (rect1.x >= rect2.x + rect2.width
        || rect1.x + rect1.width <= rect2.x
        || rect1.y >= rect2.y + rect2.height
        || rect1.y + rect1.height <= rect2.y) {
        return false;
    }
    console.log("HIT");
    return true;
}


/*

 function collide() {
 if (hitTest(enemyBlock, player)) {
 }
 if (hitTest(enemyBlock, weaponColide)) {
 for (var i = 1; i < enemyList.length; i++) {

 if (enemyBlock.id == i) {
 enemyBlock.currHealth -= weaponDamage;
 console.log(enemyBlock.currHealth);
 damageEnemy(enemyBlock);}
 enemyBlock.healthDamage = true;
 }

 }
 }
 */

function collideBlock() {

    for (var i = 0; i < enemyList.length; i++) {

        var currCollider = {
            x : enemyList[i].x + enemyList[i].container.x,
            y : enemyList[i].y,
            width : enemyList[i].width,
            height : enemyList[i].height
        };

        if (hitTest(currCollider, weaponColide)) {


            enemyList[i].currHealth -= weaponDamage;
            console.log(enemyList[i].currHealth);
            damageEnemy(enemyList[i]);
            enemyList[i].healthDamage = true;
        }


    }
}


function damageEnemy(event) {
    if (event.currHealth < 1) {
        event.container.removeChild(event);
        event.alive = false;
        resetPosition(event);
        event.container.removeChild(event.healthText);
        delete enemyList[event];


    }
}

function summonEnemy(x,y, moveCheck, containerTarget) {


    var block = new createjs.Shape();
    block.graphics.beginFill('#FFF');
    block.graphics.drawRect(0, 0, 20, 40);
    block.x = x;
    block.y = y;
    block.width = 20;
    block.height = 40;
    block.health = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
    block.currHealth = block.health;
    block.alive = true;
    block.healthText = new createjs.Text('Health :', "30px Calibri", "#0F0");
    block.enemyMove = moveCheck;
    block.container = containerTarget;
    block.healthDamage = true;
    containerTarget.addChild(block.healthText);

    containerTarget.addChild(block);
    enemyList.push(block);

}

function resetPosition(event) {
    event.x = -500;
    event.y = -500;
    event.width = 0;
    event.height = 0;
}

function weaponAttack() {
    console.log("Attacked");
    weaponColide = new createjs.Shape();
    weaponColide.graphics.beginFill('#FFF');
    weaponColide.graphics.drawRect(0, 0, weaponWidh, weaponHeight);
    stage.addChild(weaponColide);
    weaponColide.x = player.x + player.width;
    weaponColide.y = player.y - weaponHeight / 2 + player.height / 2;
    weaponColide.width = weaponWidh;
    weaponColide.height = weaponHeight;
    attackCheck = true;
    weaponDuration = weaponCooldown;
    weaponColide.alpha = 1;
    collideBlock();
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
    //healthText = new createjs.Text('Health :', "30px Calibri", "#0F0");



    container = new createjs.Container();
    ground = new createjs.Bitmap("img/ground.png");
    ground.x = 0;
    ground.y = 440;
    ground2 = new createjs.Bitmap("img/ground.png");
    ground2.x = 800;
    ground2.y = 440;
    container2 = new createjs.Container();
    container2.x = 800;

    container.addChild(ground2, ground);
    stage.addChild(container, container2);
    stage.addChild(scoreText);
    stage.addChild(player);
    console.log(player);
    window.addEventListener('keydown', fingerDown);
    window.addEventListener('keyup', fingerUp);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    enemyList = [];
    summonEnemy(400,400, true, container);
    summonEnemy(200,400, false, container2);
    summonEnemy(700,400, true, container2);
    summonEnemy(500,400, false, container2);

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
    /*    collide();*/

    score++;
    scoreText.text = "Score : " + score;
    if (sceneChange == true) {

        if (( sceneMove ) < 800 * scene) {
            container.x -= 5;
            container2.x -= 5;
            sceneMove += 5;
            console.log("carnacxe");
        }
    }

    if (mouseCheck) {
        if (weaponDuration == 0) {
            weaponAttack();
        }
    }

    weaponDuration--;
    if (weaponDuration < 0) {
        weaponDuration = 0;
    }

    if (attackCheck) {
        attackTimer++;
    }

    if (attackTimer == 2) {
        attackTimer = 0;
        stage.removeChild(weaponColide);
        resetWeapon();
        attackCheck = false;
    }

    for (var i = 0; i < enemyList.length; i++) {
        var enemyBlock = enemyList[i];
        if (enemyBlock.alive == false) {
            sceneChange = true;
        }
        if ((( enemyBlock.health - enemyBlock.currHealth) >= enemyBlock.health) && (enemyBlock.healthDamage == true)) {
            console.log("dead");
            enemyBlock.healthDamage = false;
        }
        else if ((( enemyBlock.health - enemyBlock.currHealth) > enemyBlock.health / 2) && (enemyBlock.healthDamage == true)) {
            console.log("damaged");
            enemyBlock.healthDamage = false;
            enemyBlock.healthText.color = "#f00";

        }

        enemyBlock.healthText.x = enemyBlock.x - enemyBlock.width / 2;
        enemyBlock.healthText.y = enemyBlock.y - enemyBlock.height;
        enemyBlock.healthText.text = "Health : " + enemyBlock.currHealth;

    }
    moveEnemies();
    stage.update(e);
}