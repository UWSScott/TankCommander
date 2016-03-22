/**
 * Created by B00252403 on 22/03/2016.
 */
var myId=0;

var land;
var shadow;
var tank;
var turret;
var player;

var single_tank;
var single_tank_turret;




Tank = function (index, game, player) {
    this.cursor = {
        left:false,
        right:false,
        up:false,
        fire:false
    }

    this.input = {
        left:false,
        right:false,
        up:false,
        fire:false
    }

    var x = 0;
    var y = 0;

    this.game = game;
    this.health = 30;
    this.player = player;

    this.dead = false;

    this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
    this.tank = game.add.sprite(x, y, 'single_tank', 'Tank_001');
    this.turret = game.add.sprite(x, y, 'single_tank_turret', 'Tank_Turret_001');

    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5);
    this.turret.anchor.set(0.3, 0.5);

    this.tank.id = index;
    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(0, 0);

    this.tank.angle = 0;

    game.physics.arcade.velocityFromRotation(this.tank.rotation, 0, this.tank.body.velocity);

};

Tank.prototype.update = function() {
    this.shadow.x = this.tank.x;
    this.shadow.y = this.tank.y;
    this.shadow.rotation = this.tank.rotation;

    this.turret.x = this.tank.x;
    this.turret.y = this.tank.y;
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Tank Commander', { preload: preload, create: create, update: update, render: render });

function preload () {
    game.load.image('single_tank_turret', 'assets/Tank_Turret_001.png');
    game.load.image('single_tank', 'assets/Tank_001.png');
    game.load.image('ground', 'assets/Terrain_Snow.jpg');
}



function create ()
{
    game.world.setBounds(-1000, -1000, 2000, 2000);
    game.stage.disableVisibilityChange  = true;

    land = game.add.tileSprite(0, 0, 800, 600, 'ground');
    land.fixedToCamera = true;

    player = new Tank(myId, game, tank);
    tank = player.tank;
    turret = player.turret;
    tank.x=0;
    tank.y=0;
    shadow = player.shadow;

    tank.bringToTop();
    turret.bringToTop();

    game.camera.follow(tank);
    game.camera.focusOnXY(0, 0);

}

function update () {
    player.input.tx = game.input.x + game.camera.x;
    player.input.ty = game.input.y + game.camera.y;
    turret.rotation = game.physics.arcade.angleToPointer(turret);

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
}

function render () {}

