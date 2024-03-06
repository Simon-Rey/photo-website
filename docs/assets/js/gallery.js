const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-image');
const modalControls = document.querySelectorAll('.modal-control');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const modalClose = document.getElementById('modal-close');
const modalDetails = document.getElementById('modal-details-box');
const galleryImages = document.querySelectorAll('.photo-thumbnail');
let currentSlideIndex = 0;

function preloadImages() {
    photoSrcs.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    preloadImages(); // Preload images when the DOM is ready
});

galleryImages.forEach((image) => {
    image.addEventListener('click', () => {
        showModal();
        showPhoto(parseInt(image.dataset.orderindex));
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('close')) {
        hideModal();
    }
});

modalImg.addEventListener('load', function() {
    modalControls.forEach( (c) => {
        c.classList.add('hidden');
    });
});

modalPrev.addEventListener('click', () => {
    showPhoto(currentSlideIndex - 1);
});

modalNext.addEventListener('click', () => {
    showPhoto(currentSlideIndex + 1);
});

function showModal() {
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Hide the scrollbar
}

function hideModal() {
    modal.classList.remove('visible');
    document.body.style.overflow = 'auto'; // Restore the scrollbar
    modalPrev.classList.remove('hidden');
    modalNext.classList.remove('hidden');
    modalImg.src = "";
}

function showPhoto(n) {
    if (n >= photoSrcs.length) {
        n = 0;
    }
    if (n < 0) {
        n = photoSrcs.length - 1;
    }
    currentSlideIndex = n;
    modalImg.src = photoSrcs[n];
    const details = photoDetails[n];
    if (details) {
        modalDetails.innerHTML = "<p>" + details + "</p>"
        modalDetails.classList.add('visible');
    } else if (modalDetails.classList.contains('visible')) {
        modalDetails.classList.remove('visible');
    }
}

document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('visible')) {
        if (e.key === 'ArrowLeft' || e.keyCode === 37) {
            showPhoto(currentSlideIndex - 1);
        } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
            showPhoto(currentSlideIndex + 1);
        } else if (e.key === 'Escape' || e.keyCode === 27) {
            hideModal();
        }
    }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    if (modal.classList.contains('visible')) {
        touchStartX = e.changedTouches[0].screenX
    }
})

document.addEventListener('touchend', e => {
    if (modal.classList.contains('visible')) {
        if (e.target === modalClose) {
            hideModal();
        }
        touchEndX = e.changedTouches[0].screenX
        updateOnSwipe()
    }
})
function updateOnSwipe() {
    const diff = touchEndX - touchStartX
    if (diff < -50) {
        showPhoto(currentSlideIndex - 1);
    } else if (diff > 50) {
        showPhoto(currentSlideIndex + 1);
    }
}