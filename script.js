let score = 0;
let isGameOver = false;
let gameInterval;

const player = document.getElementById('player');
const fallingObject = document.getElementById('falling-object');
const scoreDisplay = document.getElementById('score');

const gameContainer = document.getElementById('game-container');
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

function startGame() {
    score = 0;
    isGameOver = false;
    scoreDisplay.textContent = score;
    player.style.left = (containerWidth / 2 - 30) + 'px'; // Inicia no centro
    fallingObject.style.top = '0px';
    fallingObject.style.left = Math.random() * (containerWidth - 20) + 'px'; // Posição aleatória no topo

    gameInterval = setInterval(function () {
        if (isGameOver) {
            clearInterval(gameInterval);
            alert('Game Over! Pontuação Final: ' + score);
            return;
        }

        // Movimento do objeto
        let objectTop = parseInt(fallingObject.style.top);
        fallingObject.style.top = objectTop + 5 + 'px';

        // Verifica se o objeto caiu fora da tela
        if (objectTop > containerHeight) {
            fallingObject.style.top = '0px';
            fallingObject.style.left = Math.random() * (containerWidth - 20) + 'px';
        }

        // Verifica colisão com o jogador
        const objectRect = fallingObject.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            objectRect.top + objectRect.height > playerRect.top &&
            objectRect.left + objectRect.width > playerRect.left &&
            objectRect.left < playerRect.left + playerRect.width
        ) {
            // Acerta o objeto
            score++;
            scoreDisplay.textContent = score;
            fallingObject.style.top = '0px';
            fallingObject.style.left = Math.random() * (containerWidth - 20) + 'px';
        }
    }, 30);
}

// Movimento do jogador com as setas
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        let playerLeft = parseInt(player.style.left);
        if (playerLeft > 0) {
            player.style.left = playerLeft - 20 + 'px';
        }
    } else if (e.key === 'ArrowRight') {
        let playerLeft = parseInt(player.style.left);
        if (playerLeft < containerWidth - 60) {
            player.style.left = playerLeft + 20 + 'px';
        }
    }
});

// Iniciar o jogo
startGame();