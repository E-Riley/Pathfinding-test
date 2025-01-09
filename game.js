const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

let player;
let enemy;
let cursors;
let gridSize;
let gridGraphics;
let currentSquareGraphics;
let skeletonSquareGraphics;

function preload() {
  this.load.image("floor", "src/assets/floor.png");
  this.load.atlas(
    "player",
    "src/assets/Crusader.png",
    "src/assets/crusader-sprites.json"
  );

  this.load.atlas(
    "skeleton",
    "src/assets/Skeleton.png",
    "src/assets/skeleton-sprites.json"
  );
}

function create() {
  this.add.image(400, 300, "floor");

  this.anims.create({
    key: "walkUp",
    frames: this.anims.generateFrameNames("player", {
      prefix: "walkUp",
      end: 8,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "walkLeft",
    frames: this.anims.generateFrameNames("player", {
      prefix: "walkLeft",
      end: 8,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "walkRight",
    frames: this.anims.generateFrameNames("player", {
      prefix: "walkRight",
      end: 8,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "walkDown",
    frames: this.anims.generateFrameNames("player", {
      prefix: "walkDown",
      end: 8,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "skeletonWalkUp",
    frames: this.anims.generateFrameNames("skeleton", {
      prefix: "walkUp",
      end: 8,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "skeletonWalkLeft",
    frames: this.anims.generateFrameNames("skeleton", {
      prefix: "walkLeft",
      end: 8,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "skeletonWalkRight",
    frames: this.anims.generateFrameNames("skeleton", {
      prefix: "walkRight",
      end: 8,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "skeletonWalkDown",
    frames: this.anims.generateFrameNames("skeleton", {
      prefix: "walkDown",
      end: 8,
      zeroPad: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  skeleton = this.physics.add.sprite(620, 420, "skeleton");
  player = this.physics.add.sprite(100, 200, "player");
  skeleton.setCollideWorldBounds(true);
  player.setCollideWorldBounds(true);

  gridSize = 40;
  gridGraphics = this.add.graphics();
  gridGraphics.lineStyle(1, 0xffffff, 0.5);

  for (let x = 0; x < config.width; x += gridSize) {
    gridGraphics.moveTo(x, 0);
    gridGraphics.lineTo(x, config.height);
  }
  for (let y = 0; y < config.height; y += gridSize) {
    gridGraphics.moveTo(0, y);
    gridGraphics.lineTo(config.width, y);
  }
  gridGraphics.strokePath();

  currentSquareGraphics = this.add.graphics();
  skeletonSquareGraphics = this.add.graphics();
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown && cursors.up.isDown) {
    player.setVelocityX(-115);
    player.setVelocityY(-115);
    player.anims.play("walkLeft", true);
  } else if (cursors.right.isDown && cursors.up.isDown) {
    player.setVelocityX(115);
    player.setVelocityY(-115);
    player.anims.play("walkRight", true);
  } else if (cursors.left.isDown && cursors.down.isDown) {
    player.setVelocityX(-115);
    player.setVelocityY(115);
    player.anims.play("walkLeft", true);
  } else if (cursors.right.isDown && cursors.down.isDown) {
    player.setVelocityX(115);
    player.setVelocityY(115);
    player.anims.play("walkRight", true);
  } else if (cursors.up.isDown) {
    player.setVelocityX(0);
    player.setVelocityY(-160);
    player.anims.play("walkUp", true);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
    player.setVelocityX(0);
    player.anims.play("walkDown", true);
  } else if (cursors.left.isDown) {
    player.setVelocityY(0);
    player.setVelocityX(-160);
    player.anims.play("walkLeft", true);
  } else if (cursors.right.isDown) {
    player.setVelocityY(0);
    player.setVelocityX(160);
    player.anims.play("walkRight", true);
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);

    player.anims.stop();
  }

  const currentGridX = Math.floor(player.x / gridSize) * gridSize;
  const currentGridY = Math.floor(player.y / gridSize) * gridSize;

  const skeletonGridX = Math.floor(skeleton.x / gridSize) * gridSize;
  const skeletonGridY = Math.floor(skeleton.y / gridSize) * gridSize;

  currentSquareGraphics.clear();
  currentSquareGraphics.fillStyle(0xffff00, 0.5);
  currentSquareGraphics.fillRect(
    currentGridX,
    currentGridY,
    gridSize,
    gridSize
  );

  skeletonSquareGraphics.clear();
  skeletonSquareGraphics.fillStyle(0xff0000, 0.5);
  skeletonSquareGraphics.fillRect(
    skeletonGridX,
    skeletonGridY,
    gridSize,
    gridSize
  );
}
