import Phaser, { Scene } from "phaser";
import PlayScene from './scenes/PlayScene';
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import ScoreScene from "./scenes/ScoreScene";
import PauseScene from "./scenes/PauseScene";

import axios from 'axios'; 

let baseURL;
// if(process.env.mode =="development") {
    baseURL = "http://localhost:3000";
// }

// let highscores;
// (async () => {
//   highscores = await axios.request({
//       url: `${baseURL}/highscores`,
//       method: 'GET'
//   })

//   console.log(highscores.data)

// })();

const width = 800;
const height = 600;
// const width = window.innerWidth;
// const height = window.innerHeight;
const birdPosition = {x: width /10, y: height/2};

const shared_config = {
  width: width,
  height: height,
  startPosition: birdPosition
};

const Scenes = [PreloadScene, MenuScene, ScoreScene, PlayScene, PauseScene];
const createScene = Scene => new Scene(shared_config);
const startScenes = () => Scenes.map((createScene));

const config = {
  type:Phaser.AUTO,
  ...shared_config,
  pixelArt:true,
  physics: {
    default: "arcade",
      arcade: {
        debug: false,
        // gravity: {
        //  y: 400 
      //  },
    },
  },

  scene: [PreloadScene, new MenuScene(shared_config), new ScoreScene(shared_config), new PlayScene(shared_config), new PauseScene(shared_config)]
};








new Phaser.Game(config);
