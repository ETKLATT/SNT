const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

const box = 20; // Taille d'une case
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = { 
    x: Math.floor(Math.random() * 20) * box, 
    y: Math.floor(Math.random() * 20) * box 
};
let score = 0;
let gameInterval = null; // Stocker l'intervalle du jeu

// Détection des touches clavier
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function changeDirection(event) {
    event.preventDefault(); // Empêche le défilement de la page

    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Mise à jour du jeu
function update() {
    let head = { x: snake[0].x, y: snake[0].y };

    // Déplacement du serpent
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // Vérification de la collision avec la nourriture
    if (head.x === food.x && head.y === food.y) {
        food = { 
            x: Math.floor(Math.random() * 20) * box, 
            y: Math.floor(Math.random() * 20) * box 
        };
        score++; // Augmenter le score
    } else {
        snake.pop();
    }

    // Vérification des collisions avec les murs ou soi-même
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || 
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);
}

// Affichage du jeu
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessin du serpent
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });

    // Dessin de la nourriture
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Affichage du score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score : " + score, 10, 20);
}

// Fin du jeu
function endGame() {
    clearInterval(gameInterval); // Arrêter la boucle du jeu
    canvas.style.display = "none"; // Cacher le canvas
    startButton.style.display = "block"; // Réafficher le bouton de départ

    // Affichage du message selon le score
    if (score >= 10) {
        alert("Félicitations ! Le code pour accéder à la séance 2 est 4321");
    } else {
        alert("Essaie encore ! Fais un score d'au moins 10 pour accéder à la suite.");
    }
}

// Lancement du jeu quand on clique sur le bouton
startButton.addEventListener("click", function () {
    snake = [{ x: 10 * box, y: 10 * box }]; // Réinitialiser le serpent
    direction = "RIGHT"; // Réinitialiser la direction
    score = 0; // Réinitialiser le score
    food = { 
        x: Math.floor(Math.random() * 20) * box, 
        y: Math.floor(Math.random() * 20) * box 
    };

    canvas.style.display = "block"; // Afficher le canvas
    startButton.style.display = "none"; // Cacher le bouton
    gameInterval = setInterval(() => {
        update();
        draw();
    }, 150); // Lancer le jeu
});
