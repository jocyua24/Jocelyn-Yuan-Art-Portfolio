const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'Images/spritesheet1.png';
const spriteWidth = 575;
const spriteHeight = 540;
let playerState = 'walkright';

let gameFrame = 0;
const staggerFrames = 20;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idleright',
        frames: 1,
    },
    {
        name: 'walkright',
        frames: 2,
    },
    {
        name: 'idleleft',
        frames: 1,
    },
    {
        name: 'walkleft',
        frames: 2,
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionx = j * spriteWidth;
        let positiony = index * spriteHeight;
        frames.loc.push({x: positionx, y: positiony});
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations)

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);


    gameFrame++;
    requestAnimationFrame(animate); //creates animation loop
};
animate();