import Phaser from "phaser";
import axios from 'axios';

class BaseScene extends Phaser.Scene {
constructor(key, config) {
    super(key);
    this.config = config;
    this.fontSize = 28;
    this.lineGap = 42;
    this.fontOptions = {fontSize: `${this.fontSize}px`, fill: '#fff'};
    this.pageCenter = [config.width/2, config.height /2];

    this.getHighScores();
  }

  create() {
    // this.add.image(0, 0, "sky").setOrigin(0);
    let image = this.add.image(0, 0, "sky").setOrigin(0);
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    if (this.config.goBack) {
        const backButton = this.add.image(this.config.width - 10, this.config.height -10, "back")
        .setOrigin(1).setScale(2).setInteractive()

        backButton.on('pointerup', () => {
            this.scene.start('MenuScene');
        })
    }
  }
  async getHighScores() {
        try {
            let hs = await axios.request({
                url: 'http://localhost:3000/highscores',
                method: 'GET'
            });

            this.highscores = hs.data;
        }
        catch(error) {
            console.log(error)
        }
  }
  createHomePage(homePage, createHomepageEvent) {
    let lastPositionY = 0;
//      debugger 
    homePage.forEach(homePageItem => {
    //    console.log('homepageforeach',homePageItem);
       const homePagePosition = [this.pageCenter[0], this.pageCenter[1] + lastPositionY];
       homePageItem.textGO = this.add.text(...homePagePosition, homePageItem.text, this.fontOptions).setOrigin(.5,1);
       lastPositionY += this.lineGap;
       createHomepageEvent(homePageItem);
    })
  }
}

export default BaseScene;