import BaseScene from "./BaseScene";


class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);

    this.homePage = [
        {scene: 'PlayScene', text: "Play"},
        {scene: 'ScoreScene', text: "Leaderboards"},
        {scene: null, text: 'Exit'},
    ]
  }

  create() {
    super.create();   
    this.createHomePage(this.homePage, this.createHomePageEvent.bind(this)); 
  }

  createHomePageEvent(homePageItem) {
      const textGO = homePageItem.textGO;
      console.log(homePageItem);
      textGO.setInteractive();

      textGO.on('pointerover', () => {
          textGO.setStyle({fill: '#e7deff'})
      })

      textGO.on("pointerout", () => {
        textGO.setStyle({ fill: "#fff" });
      });
      textGO.on('pointerup', () => {
          console.log(homePageItem.scene)
          homePageItem.scene && this.scene.start(homePageItem.scene);

        if(homePageItem.text === 'Exit') {
            this.game.destroy(true);
        }

      })
  }
}


export default MenuScene;