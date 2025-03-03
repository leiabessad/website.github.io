window.onload = () => {
    // Fonction pour placer les vignettes
    function placeVignettes() {
        const container = document.querySelector('#desktop');
        const vignettes = document.querySelectorAll('.icon');
        const margin = 20; // Marge autour de l'écran

        vignettes.forEach(vignette => {
            const vignetteWidth = vignette.offsetWidth;
            const vignetteHeight = vignette.offsetHeight;

            const maxX = container.offsetWidth - vignetteWidth - 2 * margin;
            const maxY = container.offsetHeight - vignetteHeight - 2 * margin;

            const x = margin + Math.random() * maxX;
            const y = margin + Math.random() * maxY;

            vignette.style.position = 'absolute';
            vignette.style.left = `${x}px`;
            vignette.style.top = `${y}px`;
            vignette.style.zIndex = '10';
        });
    }

    // Ajuster l'arrière-plan
    const background = document.querySelector('#background');
    background.style.width = '100%';
    background.style.height = '100vh';

    // Placer les vignettes
    placeVignettes();

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

    // Déplacement des vignettes
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
            }

            function stopDrag() {
                document.removeEventListener('mousemove', moveAt);
                document.removeEventListener('mouseup', stopDrag);
            }

            document.addEventListener('mousemove', moveAt);
            document.addEventListener('mouseup', stopDrag);
        });
    });

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
