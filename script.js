window.onload = () => {
    // Fonction pour placer les vignettes de manière aléatoire sans superposition
    function placeVignettes() {
        const container = document.querySelector('#desktop');
        const vignettes = document.querySelectorAll('.icon');
        const margin = 20; // Marge autour de l'écran
        const occupiedPositions = [];

        vignettes.forEach(vignette => {
            const vignetteWidth = vignette.offsetWidth;
            const vignetteHeight = vignette.offsetHeight;
            let x, y;

            // Recherche d'une position libre pour la vignette
            do {
                const maxX = container.offsetWidth - vignetteWidth - 2 * margin;
                const maxY = container.offsetHeight - vignetteHeight - 2 * margin;
                x = margin + Math.random() * maxX;
                y = margin + Math.random() * maxY;
            } while (isPositionOccupied(x, y, vignetteWidth, vignetteHeight, occupiedPositions));

            vignette.style.position = 'absolute';
            vignette.style.left = `${x}px`;
            vignette.style.top = `${y}px`;
            vignette.style.zIndex = '10';

            // Marquer cette position comme occupée
            occupiedPositions.push({ x, y, width: vignetteWidth, height: vignetteHeight });
        });
    }

    // Fonction pour vérifier si une position est occupée par une autre vignette
    function isPositionOccupied(x, y, width, height, occupiedPositions) {
        return occupiedPositions.some(pos => {
            return !(x + width < pos.x || x > pos.x + pos.width || y + height < pos.y || y > pos.y + pos.height);
        });
    }

    // Placer les vignettes sans superposition
    placeVignettes();

    // Fonction pour déplacer la corbeille lorsque une vignette la survole
    function moveTrashIfNear(icon) {
        const trash = document.querySelector('#corbeille');
        const trashRect = trash.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        const threshold = 10; // Distance à laquelle la corbeille se déplace

        const dx = iconRect.left - trashRect.left;
        const dy = iconRect.top - trashRect.top;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
            // Trouver une nouvelle position pour la corbeille
            const container = document.querySelector('#desktop');
            const maxX = container.offsetWidth - trashRect.width;
            const maxY = container.offsetHeight - trashRect.height;
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;

            // Déplacer la corbeille à une nouvelle position
            trash.style.left = `${newX}px`;
            trash.style.top = `${newY}px`;
        }
    }


    
    

    const logo = document.getElementById('logo');

// Fonction pour démarrer l'animation de manière aléatoire
function randomDirection() {
    const random = Math.random(); // Génère un nombre entre 0 et 1

    if (random < 0.5) {
        // Déplacement de gauche à droite
        logo.style.animation = 'moveLogoLeftToRight 5s linear infinite';
    } else {
        // Déplacement de droite à gauche
        logo.style.animation = 'moveLogoRightToLeft 5s linear infinite';
    }
}



// 1. Ouvrir la modal au double-clic
const projectImages = document.querySelectorAll('.project-img');

projectImages.forEach((image) => {
  image.addEventListener('dblclick', () => {
    // Récupérer l'id du projet à partir de l'attribut data-project
    const projectId = image.getAttribute('data-project');

    // Trouver la modal correspondante
    const modal = document.getElementById(`modal${projectId}`);

    // Afficher la modal
    modal.style.display = "block";
  });
});

// Sélectionne tous les boutons "Ouvrir" dans les modales
document.querySelectorAll('.open-project').forEach(button => {
    button.addEventListener('click', function () {
        // Récupère l'URL stockée dans data-page
        const pageUrl = this.getAttribute('data-page');
        
        // Redirige vers la page correspondante
        if (pageUrl) {
            window.location.href = pageUrl;
        }
    });
});


// 2. Fermer la modal lorsque l'on clique sur la croix
const closeModalButtons = document.querySelectorAll('.close-modal');

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Trouver la modal correspondante et la fermer
    const modal = button.closest('.modal');
    modal.style.display = "none";
  });
});

// 3. Fermer la modal si on clique en dehors
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    // Vérifie si l'utilisateur clique en dehors de la modal
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};





// Fonction qui change la direction de l'animation à chaque fin
logo.addEventListener('animationiteration', randomDirection);


// Démarre l'animation
randomDirection();


    // Gestion du déplacement des vignettes
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.addEventListener('mousedown', (e) => {
            e.preventDefault();
            let startX = e.clientX;
            let startY = e.clientY;
            let iconX = icon.offsetLeft;
            let iconY = icon.offsetTop;

            function moveAt(e) {
                let newX = iconX + (e.clientX - startX);
                let newY = iconY + (e.clientY - startY);

                const container = document.querySelector('#desktop');
                const maxX = container.clientWidth - icon.clientWidth - 20;
                const maxY = container.clientHeight - icon.clientHeight - 20;

                newX = Math.max(20, Math.min(newX, maxX));
                newY = Math.max(20, Math.min(newY, maxY));

                icon.style.left = `${newX}px`;
                icon.style.top = `${newY}px`;

                // Déplacer la corbeille si la vignette s'en approche
                moveTrashIfNear(icon);
            }

            function stopDrag() {
                document.removeEventListener('mousemove', moveAt);
                document.removeEventListener('mouseup', stopDrag);
            }

            document.addEventListener('mousemove', moveAt);
            document.addEventListener('mouseup', stopDrag);
        });
    });

    // Ajuster l'arrière-plan
    const background = document.querySelector('#background');
    background.style.width = '100%';
    background.style.height = '100vh';

    // Gestion de la boîte Playlist
    const playlistItems = document.querySelectorAll('.Invariant img[alt="Playlist"]');
    const stripedBox = document.getElementById('striped-box');
    const closeBtn = document.getElementById('closeBtn');

    playlistItems.forEach(item => {
        item.addEventListener('dblclick', () => {
            stripedBox.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        stripedBox.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (!stripedBox.contains(e.target) && !e.target.closest('.Invariant img[alt="Playlist"]')) {
            stripedBox.style.display = 'none';
        }
    });

    // Gestion de l'affichage des chansons dans la Playlist
    const playlistItemsDivs = document.querySelectorAll('.playlist');
    playlistItemsDivs.forEach(item => {
        item.addEventListener('dblclick', (e) => {
            stripedBox.classList.remove('hidden');

            const songMessage = e.target.closest('.playlist').getAttribute('data-message');

            const songContainer = document.createElement('div');
            songContainer.classList.add('song-container');
            songContainer.innerHTML = `
                <h3>${songMessage}</h3>
                <audio id="song" controls>
                    <source src="son/THEODORA - FNG.mp3" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
            `;

            const existingSongContent = stripedBox.querySelector('.song-container');
            if (existingSongContent) {
                stripedBox.replaceChild(songContainer, existingSongContent);
            } else {
                stripedBox.appendChild(songContainer);
            }

            // Réinitialiser la gestion du bouton Play/Pause après l'ajout de l'audio
            initializeAudioControls();
        });
    });

    // Initialisation des contrôles audio
    function initializeAudioControls() {
        const song = document.getElementById("song");
        const progress = document.getElementById("progress");
        const ctrlIcon = document.getElementById("ctrlIcon");

        if (!song || !progress || !ctrlIcon) {
            console.error("Un élément audio ou de contrôle est manquant !");
            return;
        }

        song.onloadedmetadata = function () {
            progress.max = song.duration;
            progress.value = song.currentTime;
        };

        song.addEventListener("timeupdate", function () {
            progress.value = song.currentTime;
        });

        function playPause() {
            if (song.paused) {
                song.play();
                ctrlIcon.classList.remove("fa-play");
                ctrlIcon.classList.add("fa-pause");
            } else {
                song.pause();
                ctrlIcon.classList.remove("fa-pause");
                ctrlIcon.classList.add("fa-play");
            }
        }

        ctrlIcon.addEventListener("click", playPause);

        setInterval(() => {
            if (!song.paused) {
                progress.value = song.currentTime;
            }
        }, 500);

        progress.addEventListener("input", function () {
            song.currentTime = progress.value;
        });
    }

    // Initialisation des contrôles si l'audio est déjà présent dans la page
    initializeAudioControls();

};



