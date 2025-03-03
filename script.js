window.onload = () => {
    // Fonction pour placer les vignettes
    function placeVignettes() {
        const container = document.querySelector('#desktop');
        const vignettes = document.querySelectorAll('.icon');

        const margin = 20; // Marge de 100px autour de l'écran

        vignettes.forEach(vignette => {
            // Calculer les positions de manière centrée avec les marges
            const vignetteWidth = vignette.offsetWidth;
            const vignetteHeight = vignette.offsetHeight;

            // Calculer les positions X et Y pour que la vignette soit dans la zone visible
            const maxX = container.offsetWidth - vignetteWidth - 2 * margin; // Limiter la position à la largeur de l'écran moins les marges
            const maxY = container.offsetHeight - vignetteHeight - 2 * margin; // Limiter la position à la hauteur de l'écran moins les marges

            // Calculer une position aléatoire centrée dans cette zone
            const x = margin + Math.random() * maxX;
            const y = margin + Math.random() * maxY;

            // Appliquer la position calculée à la vignette
            vignette.style.position = 'absolute';
            vignette.style.left = `${x}px`;
            vignette.style.top = `${y}px`;
            vignette.style.zIndex = '10';
        });
    }

    // Ajuster l'arrière-plan pour qu'il occupe toute la taille de l'écran sans dépasser
    const background = document.querySelector('#background');
    background.style.width = '100%';
    background.style.height = '100vh';  // Prendre toute la hauteur de l'écran

    // Placer les vignettes
    placeVignettes();

    // Code pour gérer l'affichage et la fermeture de la "playlist"
    const playlistItems = document.querySelectorAll('.Invariant img[alt="Playlist"]');
    const stripedBox = document.getElementById('striped-box');
    const closeBtn = document.getElementById('closeBtn');

    // Afficher la boîte en double-clic
    playlistItems.forEach(item => {
        item.addEventListener('dblclick', () => {
            stripedBox.style.display = 'flex';  // Affiche la boîte en utilisant flex pour centrer
        });
    });

    // Fermer la boîte en cliquant sur la croix
    closeBtn.addEventListener('click', () => {
        stripedBox.style.display = 'none';  // Cache la boîte
    });

    // Fermer la boîte si l'on clique en dehors de la boîte
    window.addEventListener('click', (e) => {
        if (!stripedBox.contains(e.target) && !e.target.closest('.Invariant img[alt="Playlist"]')) {
            stripedBox.style.display = 'none';  // Cache la boîte si l'utilisateur clique en dehors
        }
    });

    // Code pour gérer l'affichage de chaque chanson sélectionnée dans la playlist
    const playlistItemsDivs = document.querySelectorAll('.playlist');  // Chaque chanson dans la playlist
    playlistItemsDivs.forEach(item => {
        item.addEventListener('dblclick', (e) => {
            // Ouvrir la boîte si elle est cachée
            stripedBox.classList.remove('hidden');

            // Obtenir le message associé à la chanson sélectionnée
            const songMessage = e.target.closest('.playlist').getAttribute('data-message');

            // Créer une nouvelle boîte avec le contenu de la chanson (lecteur audio)
            const songContainer = document.createElement('div');
            songContainer.classList.add('song-container');
            songContainer.innerHTML = `
                <h3>${songMessage}</h3>
                <audio controls>
                    <source src="path/to/your/song.mp3" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
            `;

            // Si la boîte contient déjà un contenu, on le remplace par le nouveau
            const existingSongContent = stripedBox.querySelector('.song-container');
            if (existingSongContent) {
                stripedBox.replaceChild(songContainer, existingSongContent);
            } else {
                stripedBox.appendChild(songContainer);
            }
        });
    });

    // Déplacement des vignettes avec une marge de 100px tout autour
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
                const maxX = container.clientWidth - icon.clientWidth - 20;  // 100px de marge à droite
                const maxY = container.clientHeight - icon.clientHeight - 20;  // 100px de marge en bas

                // Limiter le mouvement des vignettes aux marges définies
                newX = Math.max(20, Math.min(newX, maxX)); // Limiter la marge à 100px à gauche
                newY = Math.max(20, Math.min(newY, maxY)); // Limiter la marge à 100px en haut

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


    
};
