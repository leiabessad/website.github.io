// Exemple de script JS pour ajouter des interactions, comme un effet au survol
document.addEventListener('DOMContentLoaded', function () {
    const projectLinks = document.querySelectorAll('.project-link');

    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.backgroundColor = '#ffb2da'; // change la couleur au survol
        });

        link.addEventListener('mouseleave', () => {
            link.style.backgroundColor = '#333'; // revient à la couleur initiale
        });
    });
});
