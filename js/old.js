/*var stage;
 var mainCircle;
 var circ1;
 var circ2;
 var circ3;
 var circ4;
 var stem;
 var flower;*/
var player;
var i;
i = 1;
var x = 1;
function initialize(){


    stage = new createjs.Stage("intro");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tickHappened );


    player = new createjs.Shape();
    player.graphics.beginFill("#FFF");
    player.graphics.drawRect(40,40,40,90);
    player.x = 50;
    player.y = 400;
    /*  stage = new createjs.Stage("intro");
     createjs.Ticker.setFPS(60);
     createjs.Ticker.addEventListener('tick', tickHappened );


     mainCircle = new createjs.Shape();
     mainCircle.graphics.beginFill("#FFF");
     mainCircle.graphics.drawCircle(50,50, 30);
     mainCircle.x = 200;
     mainCircle.y = 60;

     circ1 = new createjs.Shape();
     circ1.graphics.beginFill("#FF0");
     circ1.graphics.drawCircle(80,80, 50);
     circ1.x = 200;
     circ1.y = 60;

     circ2 = new createjs.Shape();
     circ2.graphics.beginFill("#EE0");
     circ2.graphics.drawCircle(20,20, 50);
     circ2.x = 200;
     circ2.y = 60;

     circ3 = new createjs.Shape();
     circ3.graphics.beginFill("#FE0");
     circ3.graphics.drawCircle(20,80, 50);
     circ3.x = 200;
     circ3.y = 60;

     circ4 = new createjs.Shape();
     circ4.graphics.beginFill("#EF0");
     circ4.graphics.drawCircle(80,20, 50);
     circ4.x = 200;
     circ4.y = 60;

     stem = new createjs.Shape();
     stem.graphics.beginFill("#0F0");
     stem.graphics.drawRect(40,50, 20, 200);
     stem.x = 200;
     stem.y = 60;

     flower = new createjs.Container();
     flower.addChild(stem);
     flower.addChild(circ1);
     flower.addChild(circ2);
     flower.addChild(circ3);
     flower.addChild(circ4);

     flower.addChild(mainCircle);
     flower.x = 100;
     flower.y = 100;

     stage.addChild(flower);
     console.log(mainCircle);
     */
    stage.addChild(player);
    console.log(player);

}

function tickHappened(e){

    /*


     if ((i < 200)&&( x == 1 ))
     {
     i++;
     flower.x++;

     }

     else if (( i == 200)&&(x == 1 ))
     {


     i++;
     x = 0;
     console.log(i);

     }

     else if (( x == 0 ) &&  ( i > 0 ))
     {
     i--;
     flower.x--;
     }

     else if ( i == 0 )
     {
     x = 1;
     }

     console.log("I is " + i + "  x is  " + x);*/

    stage.update(e);
}/**
 * Created by Bogdan on 5/12/2016.
 */
