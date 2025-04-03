let timer;

function resetTimer() {
    clearTimeout(timer); // Réinitialise le timer
    timer = setTimeout(() => {
        alert("Tu as été inactif trop longtemps ! Au boulot !");
    }, 60000); // 2 minutes
}

// Détecte uniquement les CLICS pour réinitialiser
window.onload = resetTimer;
document.onclick = resetTimer;