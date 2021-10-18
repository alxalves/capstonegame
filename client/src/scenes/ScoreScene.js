
import BaseScene from "./BaseScene";

class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', {...config, goBack: true});
  }

  create() {
    super.create();

    // const bestScoreText = localStorage.getItem('topScore');
    const HSTitle = { fontSize: `34px`, fill: "#FF0000" };
    let iterator = 0;
         this.add.text(this.pageCenter[0],(this.config.height /4.5), `Leaderboards:`, HSTitle)
        .setOrigin(0.5,0)
    this.highscores.forEach(score => {
        this.add.text(this.pageCenter[0], this.pageCenter[1]+iterator, `${score.username}:${score.highscore}`, this.fontOptions)
        .setOrigin(0.5,4)
        iterator+= 36;
    })

  }
}

export default ScoreScene;