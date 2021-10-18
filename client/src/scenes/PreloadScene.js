import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
//    this.load.image("sky", "assets/sky.png");
   this.load.image("sky", "assets/cave.png");
   this.load.image("pipe", "assets/cavespike.png");
   this.load.image("pause", "assets/pause.png");
   this.load.image("back", "assets/back.png");
   this.load.spritesheet('bat', "assets/bat.png", {
       frameWidth: 64, frameHeight: 24
   });
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;
