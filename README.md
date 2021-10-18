# capstonegame

This is a game inspired heavily by a combination of flappy bird and helicopter game, both of which took up an inordinate amount of my time when I was a kid. Name is still pending but in the sake of halloween I will tentatively go with "flappy boo-ird". The game is written almost entirely in JS, with the help of the Phaser engine- which made the process, while long and difficult, bearable with its combination of built in functions and fairly straightforward documentation.


The user experience has been designed to require as little interaction as possible with a very simple and streamlined UI. The player will land on load of game after authorization on a home menu with 3 options- Play, Scores, and Exit. 


## Home Scene


The homepage or landing screen is meant to take away all confusion for how to play the game. The only command the user needs to navigate the menu is click. It is rendered with Phaser Scene functionality, which functions similarly to automated window load functions. Images and other assets are automatically loaded here with a "Preload Scene" that runs before the home page renders, loading the background image, styling, etc.



## Score Scene


The score scene logs high scores based on the highest score the logged in user has achieved and logs them to a database, that can be accessed by clicking the link on the home page. 



## Play Scene


This is the bread and butter of the game, being the actual game itself. It features a long list of functionalities that gave me varying levels of headaches to achieve.


The base gameplay loop involves clicking (or pressing space) to make your bat "jump" and counteract gravity which is always pulling you down. Touching any pillars or the ground/ceiling will trigger game over. As you progress through the game the difficulty will scale upwards, increasing the speed that the pillars are travelling and increasing the length that the pillars can randomly spawn at, allowing less room to navigate.


The pause button in the corner can be used to freeze the game, where clicking "home" will return you to the home screen with your score registered or "resume" will pick up the game where it left off, following a 3 second countdown. 