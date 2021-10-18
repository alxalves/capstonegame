import BaseScene from "./BaseScene";
import PauseScene from "./PauseScene";


class PlayScene extends BaseScene{
    constructor(config) {
        super('PlayScene', config);
        this.bird = null;
        this.pipes = null;
        
        this.pipeHorizSeparation = 0;
        this.jumpHeight = 300;
        this.score = 0;
        this.scoreText = '';
        this.isPaused = false;
        this.amountOfPipe = Math.ceil(config.width / 60);

        this.currentDifficulty = 'easy';
        this.difficulties = {
          easy: {
            // pipeHorizRange: [350, 400],
            // pipeGapRange: [150, 200],
            pipeHorizRange: [60,60],
            pipeGapRange: [400, 700],
          },
          normal: {
            pipeHorizRange: [60, 60],
            pipeGapRange: [350, 650],
          },
          hard: {
            pipeHorizRange: [60, 60],
            pipeGapRange: [300, 700],
          },
          eeeevil: {
              pipeHorizRange: [60,60],
              pipeGapRange: [250 ,700]
          }
        };
    }


    create() {
        // debugger
        this.currentDifficulty = "easy";
        super.create();
         this.createBird();
         this.createPipes();
         this.createColliders();
         this.createScore();
         this.playerInputs();
         this.pauseGame();
         this.listenToEvents();
         
         this.anims.create({
             key:'flap',
             frames: this.anims.generateFrameNumbers('bat', {start: 0, end: 7}),
             frameRate: 8,
             repeat: -1
         })

         this.bird.play('flap')

        //  console.log("playing...");
    }

    update() {
        this.positionStatus();
        this.replacePipe();
    }
    listenToEvents() {
        if (this.pauseEvent) {return;}

        this.pauseEvent=this.events.on('resume', () => {
            this.resumeTimerMax = 3;
            this.countDownText = this.add.text(...this.pageCenter, 'Resume in: ' + this.resumeTimerMax, this.fontOptions).setOrigin(0.5);
            this.timedEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true
            });
        })
    }
    countDown() {
        this.resumeTimerMax--;
        this.countDownText.setText('Resume in: ' + this.resumeTimerMax);
        if (this.resumeTimerMax <= 0) {
            this.isPaused = false,
            this.countDownText.setText('');
            this.physics.resume();
            this.timedEvent.remove();
        }
    }
    createBackground() {
        this.add.image(0, 0, "sky-bg").setOrigin(0);
    }

    createBird() {
        this.bird = this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bat")
        .setScale(2).setOrigin(0);
        this.bird.setBodySize(this.bird.width -34, this.bird.height )

        this.bird.body.gravity.y = 600;
        this.bird.setCollideWorldBounds(true);
    }

    createPipes() {
        this.pipes = this.physics.add.group();

        for (let i = 0; i < this.amountOfPipe; i++) {
        const upperPipe = this.pipes.create(0, 0, "pipe").setImmovable(true).setOrigin(0, 1);
        const lowerPipe = this.pipes.create(0, 0, "pipe").setImmovable(true).setOrigin(0, 0);

        this.placePipe(upperPipe, lowerPipe);
        }

        this.pipes.setVelocityX(-200);
    }
    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);

    }
    async createScore() {
        // const topScoreText = localStorage.getItem("topScore");

        let topScoreText = 0;
        if(localStorage.getItem("token")) {
            let data = parseJwt(localStorage.getItem("token"));
            // console.log('topscore', data);
            // topScoreText = data.highscore;
            let id = data.id;
            let devURL = "http://localhost:3000/score/"+data.id;
            let prodURL = "http://137.184.218.164:3000/score/" + data.id;

            // await fetch(devURL, {
            await fetch(prodURL, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(res => {
                console.log('res', res)
                topScoreText = res.highscore;
            })
            .catch(error => {
                console.error(error);
            });

        }
        this.score= 0;
        this.scoreText = this.add.text(16, 16, `Score: ${0}`, {fontSize: '28px', fill: '#ffffff'})
        this.add.text(16, 52, `Personal Best: ${topScoreText || 0}`, {fontSize: "20px",fill: "#ffffff",});

        if(!localStorage.getItem("token")) {
            this.add.text(16, 82, `Login to save your score`, {fontSize: "12px",fill: "#ff0000",});
        }
    }

    pauseGame() {
        this.isPaused = false;
        const pauseButton = this.add.image(this.config.width - 10, this.config.height -10, "pause")
            .setInteractive()
            .setScale(2)
            .setOrigin(1,1);
        
        pauseButton.on('pointerdown', () => {
            this.isPaused = true;
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene');
        })
    }

    playerInputs() {
        this.input.on("pointerdown", this.jump, this);
        this.input.keyboard.on("keydown_SPACE", this.jump, this);
    }

    positionStatus() {
         if (this.bird.y <= 0 || this.bird.getBounds().bottom >= this.config.height) {
           this.gameOver();
         }
    }

    placePipe(uPipe, lPipe) {
        const difficulties = this.difficulties[this.currentDifficulty];
        const rightMostX = this.rightMostPipe();
        const pipeGapVert = Phaser.Math.Between(...difficulties.pipeGapRange);
        const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - pipeGapVert);
        const pipeHorizSeparation = Phaser.Math.Between(...difficulties.pipeHorizRange);

    uPipe.x = rightMostX + pipeHorizSeparation;
    uPipe.y = pipeVerticalPosition;
    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeGapVert
    };

    replacePipe() {
        const tempPipes = [];
        this.pipes.getChildren().forEach(pipe => {
        if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
            if (tempPipes.length === 2) {
            this.placePipe(...tempPipes);
            this.addScore();
            this.setTopScore();
            this.increaseDifficulty();
         };
        };
     });
    };

    increaseDifficulty() {
        if (this.score === 50) {
            this.currentDifficulty = 'normal'
            this.pipes.setVelocityX(-250)
        }
        if (this.score === 150) {
            this.currentDifficulty = 'hard'
            this.pipes.setVelocityX(-300)
        }
        if (this.score === 300) {
            this.currentDifficulty = 'eeeevil'
            this.pipes.setVelocityX(-400)
        }
    }
    rightMostPipe() {
        let rightMostX= 0;
        // debugger
        this.pipes.getChildren().forEach(function(pipe) {
            rightMostX =  Math.max(pipe.x, rightMostX);
        })
            return rightMostX;
        }
    setTopScore(){
        const topScoreText = localStorage.getItem("topScore");
        const topScore = topScoreText && parseInt(topScoreText, 10);

        if (!topScore || this.score > topScore) {
          localStorage.setItem("topScore", this.score);
        }
  
    }
     gameOver() {
        this.physics.pause();
        this.bird.setTint(0x9d132f);
        // debugger
        this.setTopScore();
        this.time.addEvent({
            delay: 1000,
            callback: ()=> {
                this.scene.restart();
            },
            loop: false 
        })

        if (localStorage.getItem("token")) {
            let tokendata = parseJwt(localStorage.getItem("token"));
            let hsURL = 'http://137.184.218.164:3000/score/' +tokendata.id;
            let hs = null;
          
            fetch(hsURL, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'Application/json'
                    }
            })
            .then(res => res.json())
            .then(res => {
                hs = res;
                console.log('hs', hs);


                /////
                     if (hs == null) return;
                     console.log("score at game over", this.score);
                     if (this.score > hs.highscore) {
                       let prodURL =
                         "http://137.184.218.164:3000/score/update/" +
                         tokendata.id;

                       // fetch(devURL, {
                       fetch(prodURL, {
                         method: "POST",
                         headers: {
                           "Content-type": "application/json",
                           Authorization:
                             "Bearer " + localStorage.getItem("token"),
                         },
                         body: JSON.stringify({
                           _id: tokendata.id,
                           highscore: this.score,
                         }),
                       })
                         .then((res2) => res2.json())
                         .then((res2) => {
                           console.log(res2);
                           alert("New personal highscore saved successfully!");
                           window.location.reload();
                         })
                         .catch((error) => {
                           console.log(error);
                         });
                     }

                /////
            })
            .catch(error => {
                console.error(error);
                alert('problem saving score');
            })
            
        }
        // this.bird.x = this.config.startPosition.x;
        // this.bird.y = this.config.startPosition.y;
        // this.bird.body.velocity.y= 0
        
        
    };

    jump() {
        // debugger
        if (this.isPaused) {return;}
        this.bird.body.velocity.y= -this.jumpHeight
    };


    addScore() {
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`)
        
    }


  }

export default PlayScene;