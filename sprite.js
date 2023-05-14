const PAGES = ['index', 'gallery', 'game', 'contact'];
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const playerImage = new Image();
playerImage.src = 'Images/spritesheet.png';
const spriteWidth = 575;
const spriteHeight = 540;
let playerState = 'idleright';

if (!window.location.pathname.endsWith(".html")) {
    window.location.href = window.location.href + 'index.html';
}

const movementSpeed = 0.5;

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
    for (let j = 0; j < state.frames; j++) {
        let positionx = j * spriteWidth;
        let positiony = index * spriteHeight;
        frames.loc.push({ x: positionx, y: positiony });
    }
    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);


    gameFrame++;
    requestAnimationFrame(animate); //creates animation loop
};
animate();

window.addEventListener('keydown', function (event) {
    if (event.key == 'a' || event.key == 'ArrowLeft') {
        playerState = 'walkleft';
        let currentX = parseFloat(canvas.style.transform.match(/(\d*\.)?\d+/g)[0]);
        if (currentX < 10) {
            let currentPage = window.location.href.match(/[^\/]+$/)[0];
            let index = PAGES.indexOf(currentPage.match(/[^\.]+/)[0]);
            if (index > 0) {
                window.location.href = PAGES[index - 1] + '.html';
            }
        }
        else {

            canvas.style.transform = `translateX(${currentX - movementSpeed}vw)`;
        }
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key == 'a' || event.key == 'ArrowLeft') {
        playerState = 'idleleft';
    }
});

window.addEventListener('keydown', function (event) {
    if (event.key == 'd' || event.key == 'ArrowRight') {
        playerState = 'walkright';
        let currentX = parseFloat(canvas.style.transform.match(/(\d*\.)?\d+/g)[0]);
        if (currentX > 90) {
            let currentPage = window.location.href.match(/[^\/]+$/)[0];
            let index = PAGES.indexOf(currentPage.match(/[^\.]+/)[0]);
            if (index < PAGES.length - 1) {
                window.location.href = PAGES[index + 1] + '.html';
            }
        }
        else {
            canvas.style.transform = `translateX(${currentX + movementSpeed}vw)`;
        }
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key == 'd' || event.key == 'ArrowRight') {
        playerState = 'idleright';
    }
});
