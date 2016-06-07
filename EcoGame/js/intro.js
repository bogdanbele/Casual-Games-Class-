{
    var stage;
    var keys = {
        rkd: false,
        lkd: false,
        ukd: false,
        dkd: false
    };

    var textMultiply = 1;
    var textTimer = 1;
    var textFader = false;
    var bigText;
    var seaWeed;
    var seaWeedSS;
    var blockSS;
    var gameIsRunning = true;
    var player;
    var block = {};
    var plantList = [];
    block.width = 20;
    block.heigh = 40;
    var weaponColide = [];
    weaponColide.x = 0;
    weaponColide.y = 0;
    weaponColide.width = 0;
    weaponColide.height = 0;
    var speed = 3;
    var speedCurrent;
    var jumpTemp = 0;
    var jumpSpeed = 18;
    var isJumping = false;
    var mustTouchGround = false;
    var enemyKills = 0;
    var score = 0;
    var scoreText;
    var lifeText;
    var ground;
    var ground3;
    var ground4;
    var ground5;
    var ground6;
    var container;
    var mouseCheck = false;
    var weaponCooldown = 20;
    var weaponDuration = 1;
    var weaponWidh = 100;
    var weaponHeight = 80;
    var attackTimer = 0;
    var attackCheck = false;
    var weaponDamage = 1;
    var enemyList = [];
    var powerUpList = [];
    var queue;
    var preloadText;
    var playerSS;
    var lifeFull = 5;
    var timeUntilSummon = 0;
    var timeUntilPlant = 0;
    var timeUntilSummonMultiplier = 1;
    var timeUntilSummonMultiplierIncrease = 60;
    var summonMultiplierIncrease = 0.01;
    var fishBonusHealth = 0;
    var enemyHealthBonus = 0;
    var colideCheck = false;

    var random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var randomToFixedTwo= function( min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
    };
}

function gameReset() {
    textFader = false;
    gameIsRunning = true;
    block = {};
    plantList = [];
    block.width = 20;
    block.heigh = 40;
    weaponColide = [];
    weaponColide.x = 0;
    weaponColide.y = 0;
    weaponColide.width = 0;
    weaponColide.height = 0;
    speed = 3;
    jumpTemp = 0;
    jumpSpeed = 18;
    isJumping = false;
    mustTouchGround = false;
    enemyKills = 0;
    score = 0;
    mouseCheck = false;
    weaponCooldown = 20;
    weaponDuration = 1;
    weaponWidh = 100;
    weaponHeight = 80;
    attackTimer = 0;
    attackCheck = false;
    weaponDamage = 1;
    enemyList = [];
    powerUpList = [];
    lifeFull = 5;
    timeUntilSummon = 0;
    timeUntilPlant = 0;
    timeUntilSummonMultiplier = 1;
    timeUntilSummonMultiplierIncrease = 60;
    summonMultiplierIncrease = 0.01;
    fishBonusHealth = 0;
    enemyHealthBonus = 0;
    colideCheck = false;
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
    /*    console.log(e.keyCode);*/
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
        colideCheck = true;
    }
    if (e.keyCode === 50) {
  /*      gameIsRunning = false;
        lifeFull = 100;*/
        stage.clear();
        stage.removeAllChildren ();
        stage.removeAllEventListeners();
        gameReset();
        startPressed()
    }
    if (e.keyCode === 85) {
        mouseCheck = true;
    }
    if (e.keyCode == 51 ){
        lifeFull+=100;
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
colideCheck = false;
    }
    if (e.keyCode === 50) {
       gameIsRunning = true;
    }
    if (e.keyCode === 85) {
        mouseCheck = false;
    }

}

function mouseDown() {
    mouseCheck = true;
}

function mouseUp() {
    mouseCheck = false;
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
        jumpTemp = (1 + factor) * jumpTemp * 0.85;
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

        }
        isJumping = true;
        jumpTemp = jumpSpeed;
        mustTouchGround = true;
    }
    if (keys.dkd) {
        player.y += speed * 2;
    }
}

function playerMove() {
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
function movePlant() {
    for (var i = 0; i <plantList.length; i++) {
        plantList[i].x-=0.9*timeUntilSummonMultiplier;
        if ( plantList[i].position == 1 ) {
            container.addChildAt(plantList[i], 4);
        }
        else {
            stage.addChild(plantList[i]);
        }
        if (plantList[i].x < -500)  {
            plantList.splice(plantList[i], 1);
            container.removeChild(plantList[i]);


            console.log("deleted");

        }
    }
}
function movePowerUp() {
    for (var i = 0; i < powerUpList.length; i++) {
        var power = powerUpList[i];
        if ((power.y < 540 - power.height ) && (power.levitate == false)) {
            power.y += power.speed;
            power.speed = power.speed * 1.01;
            power.x--;
        }
        else if ((power.y + power.height > 380) && ( power.levitate == false)) {
            power.y = 540 - power.height;
            power.levitate = true;
        }

        if ((power.levitate) && (power.levCheck)) {
            power.y+=2;
            power.levAmount++;
            power.x--;

        }
        if ((power.levCheck) && (power.levAmount >= 12 )) {
            power.levCheck = false;
        }
        if (power.levCheck == false) {
            power.y-=2;
            power.levAmount--;
            power.x--;
        }
        if ((power.levCheck == false ) && ( power.levAmount < -20 )) {
            power.levCheck = true;
        }
    }
}

function moveEnemies() {
    for (var i = 0; i < enemyList.length; i++) {
        var block = enemyList[i];
        if (block.enemyMove == true) {
            if (block.alive) {
                block.x = block.x - block.speedX;
                if (block.goingUp) {
                    block.y -= block.speedY;
                    if (block.y < block.posHeight - block.maxHeightDiff + 30 ) {
                        block.goingUp = false;
                    }
                }
                else {
                    block.y += block.speedY;
                    if (block.y > block.posHeight + block.maxHeightDiff - 20) {
                        block.goingUp = true;
                    }
                }
                    if (block.x < 0 - block.width) {
                    block.container.removeChild(block);
                    block.alive = false;
                    if (block.name == "trash") {
                        lifeFull--;

                    }
                    else if (block.name == "special") {
                        score += 500;
                    }
                    else {
                        score += 50;
                    }
                    resetPosition(block);
                    block.container.removeChild(block.healthText);
                }
            }
        }

        block.healthText.x = block.x - block.regX;
        block.healthText.y = block.y - 20 - block.regY;
        block.healthText.text = "Health : " + block.currHealth;

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
    return true;
}

function collidePowerUp() {
    for (var i = 0; i < powerUpList.length; i++) {
        var powerCollider = {
            x: powerUpList[i].x,
            y: powerUpList[i].y,
            width: powerUpList[i].width,
            height: powerUpList[i].height
        };
        if (hitTest(powerCollider, player)) {
            bigText.x = stage.canvas.width /2 ;
            bigText.y = stage.canvas.height /2 - 150;
            bigText.textBaseline = "middle";
            bigText.textAlign = "center";
            switch(powerUpList[i].name){
                case "speed":
                    speed += 0.17;
                   if ( textFader == false ) {
                    bigText.text = " Swim Speed Increased !";
                    stage.addChild(bigText);
                    console.log("blue");
                       bigText.alpha= 1;
                       textFader = true;
                   }



                    break;
                case "attackSpeed":
                    weaponCooldown--;
                    if ( textFader == false ) {
                        bigText.text = " Attack Speed increased !";
                    bigText.color = "#ee9f17";
                    stage.addChild(bigText);
                    console.log("blue");
                    bigText.alpha= 1;
                    textFader = true;
                    }


                    break;
                case "damage":
                    weaponDamage++;
                    if ( textFader == false ) {
                        bigText.text = "Weapon Damage Increased !";
                        bigText.color = "#F00";
                        stage.addChild(bigText);
                        console.log("blue");
                        bigText.alpha= 1;
                        textFader = true;
                    }

                    break;
                case "reinforce":
                    fishBonusHealth++;
                    if ( textFader == false ) {
                        bigText.text = "Fish Health Increased !";
                        bigText.color = "#757575";
                        stage.addChild(bigText);
                        console.log("blue");
                        bigText.alpha= 1;
                        textFader = true;
                    }

                    break;
                case "life":
                    lifeFull++;
                    if ( textFader == false ) {
                        bigText.text = "Bonus health !";
                        bigText.color = "#eaaecb";
                        stage.addChild(bigText);
                        console.log("blue");
                        bigText.alpha= 1;
                        textFader = true;
                    }


                    break;
                case "jump":
                    jumpSpeed++;
                    if ( textFader == false ) {
                        bigText.text = "Jump Height Increased !";
                        bigText.color = "#a972ee"
                        stage.addChild(bigText);
                        console.log("blue");
                        bigText.alpha= 1;
                        textFader = true;
                    }

                    break;
                case "wave":
                    timeUntilSummonMultiplier= timeUntilSummonMultiplier * 0.9;
                    if ( textFader == false ) {
                        bigText.text = "The game is 10% Slower !";
                        bigText.color = "#72eaee";
                        stage.addChild(bigText);
                        console.log("blue");
                        bigText.alpha= 1;
                        textFader = true;
                    }

                    break;
            }
            container.removeChild(powerUpList[i]);
            resetPosition(powerUpList[i]);


        }
    }
}

function collideBlock() {
    for (var i = 0; i < enemyList.length; i++) {
        var currCollider = {
            x: enemyList[i].x + enemyList[i].container.x,
            y: enemyList[i].y,
            width: enemyList[i].width,
            height: enemyList[i].height
        };
        if (hitTest(currCollider, weaponColide)) {
            enemyList[i].currHealth -= weaponDamage;
            /*      console.log(enemyList[i].currHealth);*/
            damageEnemy(enemyList[i]);
            enemyList[i].healthDamage = true;
        }
    }
}

function damageEnemy(event) {
    if (event.currHealth < 1) {
        event.container.removeChild(event);
        event.alive = false;
        if (event.name == "trash") {
            score += 10;
            enemyKills++;
            if (enemyKills % 15 == 0) {
                summonPowerUp(event.x, event.y);
            }
            console.log(enemyKills);
        }
        else if (event.name == "special") {
            score += 50;
        }
        else {
            lifeFull--;
        }
        resetPosition(event);
        event.container.removeChild(event.healthText);
        delete enemyList[event];

    }
}

function summonPlant() {
    seaWeedSS = new createjs.SpriteSheet(queue.getResult("js/seaweed.json"));
    seaWeed = new createjs.Sprite( seaWeedSS, 'one');
    seaWeed.x = 800;

    seaWeed.width = 58;

    seaWeed.random = randomToFixedTwo(1,1.4);
    seaWeed.height = 73;
    seaWeed.y = random(540,560) - seaWeed.height;
    seaWeed.scaleX = seaWeed.random;
    seaWeed.scaleY = seaWeed.random;
    seaWeed.position = random(1,2);

    plantList.push(seaWeed);

}

function summonPowerUp(posX, posY) {
    var power = new createjs.Shape();
    power.type = random(1, 123);
    power.name ="";

    switch (power.type >= 0) {

        case (power.type<20):
            power.name = "speed";
            power.graphics.beginFill('#1782ee');


            break;
        case (power.type<40):
            power.name = "attackSpeed";
            power.graphics.beginFill('#ee9f17');

            break;
        case (power.type<43):
            power.name = "damage";
            power.graphics.beginFill('#F00');

            break;
        case (power.type<63):
            power.name = "reinforce";
            power.graphics.beginFill('#757575');

            break;
        case (power.type<83):
            power.name = "life";
            power.graphics.beginFill('#eaaecb');

            break;
        case (power.type<103):
            power.name = "jump";
            power.graphics.beginFill('#a972ee');

            break;
        case (power.type<123):
            power.name = "wave";
            power.graphics.beginFill('#72eaee');

            break;
    }



    power.graphics.drawRect(0, 0, 31, 31);
    power.width = 31;
    power.height = 31;
    power.x = posX;
    power.y = posY;
    power.speed = 1;
    power.levitate = false;
    power.levCheck = true;
    power.levAmount = 0;
    container.addChild(power);
    powerUpList.push(power);
}

function summonEnemy() {
    var block = new createjs.Shape();

    block.type = random(1, 100);
    block.name = "";
    if (block.type <= 20) {
        block.name = "fish";
    }
    else if (block.type >= 98) {
        block.name = "special";
    }
    else if (20 < block.type < 98) {
        block.name = "trash";
    }
    switch (block.name) {
        case "fish":
            console.log(block.name + " random number is : " + block.type);
            blockSS = new createjs.SpriteSheet(queue.getResult("js/fish.json"));
            console.log(playerSS);
            block = new createjs.Sprite(blockSS, 'one');
            block.random = randomToFixedTwo(0.7,1.2);
            block.width = 159 *  block.random;
            block.height = 40 *  block.random;
            block.scaleX =  block.random;
            block.scaleY =  block.random;
            block.speedY = 1;
            block.speedX = random(3,5);
            block.health = fishBonusHealth + 1 ;
            block.healthText = new createjs.Text('Health :', "15px Nova Flat", "#0F0");



            break;
        case "trash":

            block = new createjs.Bitmap(queue.getResult("img/trash1.png"));
            block.name = "trash";
            block.width = 40;
            block.height = 40;
            block.regX = block.width/2;
            block.regY = block.height/2;
            block.speedY = Math.floor(Math.random() * ((1.5 * (timeUntilSummonMultiplier) - 1) + 1) + 1);
            block.speedX = Math.floor(Math.random() * ((1.3 * (timeUntilSummonMultiplier) - 1) + 1) + 1);
            block.health = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            block.health += enemyHealthBonus;
            block.healthText = new createjs.Text('Health :', "15px Nova Flat", "#Fd0");

            break;
        case "special":
            console.log(block.name + " random number is : " + block.type);
            block = new createjs.Bitmap(queue.getResult("img/boxEmpty.png"));
            block.width = 70;
            block.height = 70;
            block.speedY = 0.6;
            block.speedX = 0.6;
            block.health = 1;
            block.healthText = new createjs.Text('Health :', "15px Nova Flat", "#0F0");

            break;
        default :
            break;
    }
    block.x = 800;
    block.maxHeightDiff = Math.floor(Math.random() * ((200 - 45) + 1) + 45);
    block.y = Math.floor(Math.random() * (((560 - block.height - block.maxHeightDiff) - (block.maxHeightDiff)) + 1) + block.maxHeightDiff);
    block.goingUp = Math.random() <= 0.5;
    block.posHeight = block.y;


    container.addChild(block.healthText);
    block.currHealth = block.health;
    block.alive = true;
    block.enemyMove = true;
    block.container = container;
    block.healthDamage = true;

    container.addChild(block);
    enemyList.push(block);
}

function resetPosition(event) {
    event.x = -500;
    event.y = -500;
    event.width = 0;
    event.height = 0;
}

function weaponAttack() {
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
    preload();

}

function preload() {
    preloadText = new createjs.Text("Loading", "30px Roboto", "#3e3e3e");
    preloadText.textBaseline = "middle";
    preloadText.textAlign = "center";
    preloadText.x = stage.canvas.width / 2;
    preloadText.y = stage.canvas.height / 2;
    stage.addChild(preloadText);
    queue = new createjs.LoadQueue(true);
    queue.on("progress", progress);
    queue.on("complete", startGame);
    queue.loadManifest(

        [  "img/backgroundback.png", "img/trash1.png", "img/hero.png", "img/background.png", "img/newground.png", "img/boxEmpty.png", "img/helpC.png",
            "img/start.png", "img/help.png", "img/options.png",
            { id:'seaWeed', src: "js/seaweed.json"},
            /*  "img/1.jpg", "img/star.png",*/
            { id: "fish" , src: "js/fish.json"},
            {id: "hero", src: "js/playerrun.json"}
        ]
    );
}

function progress(e) {
    var percent = Math.round(e.progress * 100);
    preloadText.text = "Loading: " + percent + "%";
    stage.update()
}

function startGame() {
    playerSS = new createjs.SpriteSheet(queue.getResult("js/playerrun.json"));
    stage.removeChild(preloadText);
    startButton = new createjs.Bitmap(queue.getResult("img/start.png"));
    startButton.addEventListener('click', startClick);
    startButton.width = startButton.getBounds().width;
    startButton.x = stage.canvas.width / 2 - startButton.width/2;
    startButton.y = 100 ;
    stage.addChild(startButton);

    helpButton = new createjs.Bitmap(queue.getResult("img/help.png"));
    helpButton.addEventListener('click', helpClick);
    helpButton.width = helpButton.getBounds().width;
    helpButton.x = stage.canvas.width / 2 - helpButton.width/2;
    helpButton.y = 200;
    stage.addChild(helpButton);

    optionsButton = new createjs.Bitmap(queue.getResult("img/options.png"));
    optionsButton.addEventListener('click', startClick);
    optionsButton.width = optionsButton.getBounds().width;
    optionsButton.x = stage.canvas.width / 2 - optionsButton.width/2;
    optionsButton.y = 300;
    stage.addChild(optionsButton);

function helpClick() {

helpButton.image = (queue.getResult("img/helpC.png"));
    stage.update();
}
    stage.update();
    function startClick() {
        startPressed();
        stage.removeChild(startButton);
        stage.removeChild(optionsButton);
        stage.removeChild(helpButton);
        stage.update();
    }

    }

function startPressed() {
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', tickHappened);



        console.log(playerSS);
        player = new createjs.Sprite(playerSS, 'idle');
        player.width = 50;
        player.height = 70;

        player.x = 50;
        player.y = 540 - player.height;
        player.scaleX = 0.5;
        player.scaleY = 0.5;
        scoreText = new createjs.Text('Score : ', "30px  Nova Flat", "#FFF");
        scoreText.y = 50;
        lifeText = new createjs.Text('Text : ', "30px  Nova Flat", "#FFF");
        //healthText = new createjs.Text('Health :', "30px Calibri", "#0F0");
        container = new createjs.Container();
        ground = new createjs.Bitmap(queue.getResult("img/newground.png"));
        ground.x = 0;
        ground.y = 400;
        ground2 = new createjs.Bitmap(queue.getResult("img/newground.png"));
        ground2.x = 800;
        ground2.y = 400;
        ground3 = new createjs.Bitmap(queue.getResult("img/background.png"));
        ground4 = new createjs.Bitmap(queue.getResult("img/background.png"));
        ground5 = new createjs.Bitmap(queue.getResult("img/backgroundback.png"));
        ground6 = new createjs.Bitmap(queue.getResult("img/backgroundback.png"));
        ground3.x = 0;
        ground3.y = 345;
        ground3.alpha = 1;
        ground4.x = 800;
        ground4.y = 345;
        ground4.alpha = 1;
        ground5.x = 0;
        ground5.y = 000;
        ground6.x = 800;
        ground6.y = 000;
        bigText = new createjs.Text('Swim Speed Increased :', "45px Nova Flat", "#1782ee");
        bigText.x = 150;
        bigText.y = 200;

        container.addChild(ground5, ground6);
        container.addChild(ground3, ground4);
        container.addChild(ground, ground2);


        stage.addChild(container);
        stage.addChild(scoreText);
        stage.addChild(lifeText);
        stage.addChild(player);

        console.log(player);
        window.addEventListener('keydown', fingerDown);
        window.addEventListener('keyup', fingerUp);
        window.addEventListener("mousedown", mouseDown);
        window.addEventListener("mouseup", mouseUp);
        enemyList = [];
    }


function tickHappened(e) {
    if (gameIsRunning) {


        console.log(timeUntilSummonMultiplier);
        timeUntilSummon--;
        if (timeUntilSummon <= 0) {
            summonEnemy();
            summonEnemy();
            summonEnemy();
            timeUntilSummon = Math.floor(Math.random() * ((390 - 90) + 1) + 90);
            timeUntilSummon /= timeUntilSummonMultiplier;
        }
        timeUntilSummonMultiplierIncrease--;
        if (timeUntilSummonMultiplierIncrease <= 0 && timeUntilSummonMultiplier <= 5) {
            timeUntilSummonMultiplier += summonMultiplierIncrease * timeUntilSummonMultiplier;
            timeUntilSummonMultiplierIncrease = 200;
        }

        timeUntilPlant--;
        if(timeUntilPlant <= 0 ){
            summonPlant();
            timeUntilPlant = Math.floor(Math.random() *((400-60)+1)+30);
            timeUntilPlant /= timeUntilSummonMultiplier;

    }
        movePlayer();
        if (isJumping || mustTouchGround) {
            charJump();
        }
        if (player.y >= 540 - player.height) {
            mustTouchGround = false;
            player.y = 540 - player.height;
        }
        if (player.x < 0) {
            player.x = 0;
        }
        if (ground.x < -800) {
            ground.x = 0;
            ground2.x = 800;
        }
        if (ground3.x < - 800 ){
            ground3.x= 0;
            ground4.x = 800;
        }
        if (ground5.x < - 800 ){
            ground5.x= 0;
            ground6.x = 800;
        }

        scoreText.text = "Score : " + score;
        lifeText.text = "Health left " + lifeFull;
        if (mouseCheck) {

            if(player.currentAnimation!='attack'){
                player.gotoAndPlay('attack');

            }
            if (weaponDuration == 0) {
                weaponAttack();
            }
        }
        else {
            if ((keys.lkd ) ||  (keys.rkd) || (keys.ukd)){
                if(player.currentAnimation!='move'){
                    player.gotoAndPlay('move');
            }
                }
            else {
                    if(player.currentAnimation != 'idle')
                    {
                        player.gotoAndPlay('idle');
                    }
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

            var block = enemyList[i];
            switch (block.name) {
                case "trash":
                    block.rotation--;
                    break;
            }
            if ((( block.health - block.currHealth) >= block.health) && (block.healthDamage == true)) {
                block.healthDamage = false;
            }
            else if ((( block.health - block.currHealth) >= block.health / 2) && (block.healthDamage == true)) {
                if (block.name == "trash"){
                block.healthDamage = false;
                block.healthText.color = "#F00";
                }
            }
        }


        if (lifeFull <= 0) {
            gameIsRunning = false;
        }
        if (weaponCooldown <= 7) {
            weaponCooldown = 7;
        }
        if (colideCheck) {
   /*         var check = new createjs.Shape();
            check.graphics.beginFill('#000');
            check.graphics.drawRect(0, 0, player.width, player.height);
            check.x = player.x;
            check.y = player.y;
            container.addChild(check)*/
        timeUntilSummonMultiplier += 0.5;
            colideCheck = false;
        }
if ( textFader ) {
    textTimer-=(0.001)*textMultiply;
    bigText.alpha= textTimer;
    textMultiply+=0.2;
}
        if ( textTimer <= 0 ) {
            textFader = false;
            textTimer =1 ;
            textMultiply =1;

            stage.removeChild(bigText);
        }
        ground.x-=0.9*timeUntilSummonMultiplier;
        ground2.x-=0.9*timeUntilSummonMultiplier;
        ground4.x-=0.4*timeUntilSummonMultiplier;
        ground3.x-= 0.4*timeUntilSummonMultiplier;
        ground5.x-=0.2*timeUntilSummonMultiplier;
        ground6.x-= 0.2*timeUntilSummonMultiplier;

        movePlant();
        moveEnemies();
        movePowerUp();
        collidePowerUp();
        stage.update(e);


    }
}