document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.zoomable-image');
    const overlay = document.querySelector('.overlay');

    images.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('zoomed');
            overlay.classList.toggle('show');
        });
    });

    overlay.addEventListener('click', () => {
        const zoomedImage = document.querySelector('.zoomable-image.zoomed');
        if (zoomedImage) {
            zoomedImage.classList.remove('zoomed');
            overlay.classList.remove('show');
        }
    });
});