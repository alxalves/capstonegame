import BaseScene from "./BaseScene";
import PlayScene from "./PlayScene";

class PauseScene extends BaseScene {
  constructor(config) {
    super("PauseScene", config);

    this.homePage = [
      { scene: "PlayScene", text: "Resume" },
      { scene: "MenuScene", text: "Home" },
    ];
  }

  create() {
    super.create();
    this.createHomePage(this.homePage, this.createHomePageEvent.bind(this));
  }

  createHomePageEvent(homePageItem) {
    const textGO = homePageItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#e7deff" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#fff" });
    });
    textGO.on("pointerup", () => {
        if (homePageItem.scene && homePageItem.text === "Resume") {
            this.scene.stop();
            this.scene.resume(homePageItem.scene);
        }
        else {
            this.scene.stop('PlayScene');
            this.scene.start(homePageItem.scene);
        }
    });
  }
}

export default PauseScene;
