var oldcamera;
var worldScale = 1;
var currentBounds;
var mapSizeMax;
var worldwidth=600;
var worldheight=600;
var mapSizeX = 8000;
var mapSizeY = 8000; 
var prevScale ={};
var nextScale={};
var zoompoint={};
var mapSizeCurrent;
var distance =0;
var olddistance =0;
var distancedelta=0;
var easing=0.1;



var Menu = {
    preload: function() {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setScreenSize(true);
        game.load.image('clouds', 'https://fc08.deviantart.net/fs71/f/2010/328/c/e/seamless_tiling___cracked_by_cesstrelle-d33i6by.jpg');
        game.load.image('coin', 'http://png-3.findicons.com/files/icons/1588/farm_fresh_web/32/box.png');
    },
    create: function () {
        worldScale=1;
        stageGroup = game.add.group(); // this group will contain everything except the UI for scaling
        backgroundobjects = game.add.group();
        groundobjects = game.add.group();

        mapSizeMax = mapSizeX;
        mapSizeCurrent = mapSizeMax;
        coin = game.add.sprite(4000,4000,'coin');
        coin.scale.setTo(4,4);
        coin.anchor.setTo(0.5,0.5);
        background1=game.add.tileSprite(0, 0, mapSizeX,mapSizeY ,'clouds');
        backgroundobjects.add(background1);
        backgroundobjects.add(coin);
        stageGroup.add(backgroundobjects);
        stageGroup.add(groundobjects);
        currentBounds = new Phaser.Rectangle(-mapSizeX, -mapSizeY, mapSizeX*2, mapSizeY*2);
        game.camera.bounds=currentBounds;
        game.camera.focusOnXY(4000,4000);
        game.input.mouse.mouseWheelCallback = function (event) {
            var wheelDelt = game.input.mouse.wheelDelta;
            if (wheelDelt < 0)  {
               mapSizeCurrent -= 400;
                mapSizeCurrent = Phaser.Math.clamp(mapSizeCurrent, worldwidth , mapSizeMax);}
            else                {
              mapSizeCurrent += 400;
               mapSizeCurrent = Phaser.Math.clamp(mapSizeCurrent, worldwidth , mapSizeMax);}
            worldScale = (mapSizeCurrent/mapSizeMax);
        };
   },
    update: function () {

        //touch zoom
        if(game.input.pointer1.isDown && game.input.pointer2.isDown){
            olddistance = distance;
            distance = Phaser.Math.distance(game.input.pointer1.x, game.input.pointer1.y, game.input.pointer2.x, game.input.pointer2.y);
            distancedelta = Math.abs(olddistance - distance);

            if (olddistance > distance && distancedelta > 4 ){ mapSizeCurrent -= 200;  }
            else if (olddistance < distance && distancedelta > 4 ){  mapSizeCurrent += 200;}
            mapSizeCurrent = Phaser.Math.clamp(mapSizeCurrent, worldwidth , mapSizeMax); //prevent odd scalefactors - set a minimum and maximum scale value
            worldScale = (mapSizeCurrent/mapSizeMax);

            //calculate point between fingers (zoompoint.x and zoompoint.y)
            if (game.input.pointer1.x < game.input.pointer2.x) { zoompoint.x =  game.input.pointer1.worldX + (Math.abs(game.input.pointer1.worldX - game.input.pointer2.worldX)/2); }
            else {zoompoint.x =  game.input.pointer2.worldX + (Math.abs(game.input.pointer1.worldX - game.input.pointer2.worldX)/2);  }
            if (game.input.pointer1.y < game.input.pointer2.y) { zoompoint.y =  game.input.pointer1.worldY + (Math.abs(game.input.pointer1.worldY - game.input.pointer2.worldY)/2); }
            else {zoompoint.y =  game.input.pointer2.worldY + (Math.abs(game.input.pointer1.worldY - game.input.pointer2.worldY)/2);  }
        }
        else {  // wheelzoom
            zoompoint.x = game.input.mousePointer.worldX;
            zoompoint.y = game.input.mousePointer.worldY;
        }

        // move camera / pan
        if(game.input.activePointer.isDown && !game.input.pointer2.isDown){
            if (oldcamera) { // if moving the world always continue from the last position
                game.camera.x += oldcamera.x - game.input.activePointer.position.x;
                game.camera.y += oldcamera.y - game.input.activePointer.position.y;
            }
            oldcamera = game.input.activePointer.position.clone();
        }
        // adjust camera center and zoom here
        else {
            oldcamera = null;
            rescalefactorx = mapSizeX / (mapSizeX * stageGroup.scale.x); // multiply by rescalefactor to get original world value
            rescalefactory = mapSizeY / (mapSizeY * stageGroup.scale.y);

            prevScale.x = stageGroup.scale.x;
            prevScale.y = stageGroup.scale.y;

            nextScale.x = prevScale.x + (worldScale-stageGroup.scale.x)*easing;
            nextScale.y = prevScale.y + (worldScale-stageGroup.scale.y)*easing;

            var xAdjust = (zoompoint.x - game.camera.position.x) * (nextScale.x - prevScale.x);
            var yAdjust = (zoompoint.y - game.camera.position.y) * (nextScale.y - prevScale.y);


            //Only move screen if we're not the same scale
            if (prevScale.x != nextScale.x || prevScale.y != nextScale.y) {
                var scaleAdjustX = nextScale.x / prevScale.x;
                var scaleAdjustY = nextScale.y / prevScale.y;
                var focusX = (game.camera.position.x * scaleAdjustX) + xAdjust*(rescalefactorx);
                var focusY = (game.camera.position.y * scaleAdjustY) + yAdjust*(rescalefactory);
                  game.camera.focusOnXY(focusX, focusY);
            }

            //now actually scale the stage
            stageGroup.scale.x += (worldScale-stageGroup.scale.x)*easing;   //easing
            stageGroup.scale.y += (worldScale-stageGroup.scale.y)*easing;
        }
    }
}




var game = new Phaser.Game(worldwidth, worldheight, Phaser.CANVAS, '', {});
game.state.add('menu', Menu, true);
