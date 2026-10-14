
const slidesContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");
const slider = document.querySelector(".slider");

let currentIndex = 0;
let autoPlay;

// Create 4 dots automatically
slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Go to image ${index + 1}`);

    dot.addEventListener("click", () => {
        showSlide(index);
        restartAutoPlay();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

// Show selected image
function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slidesContainer.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

// Next image
function nextSlide() {
    showSlide(currentIndex + 1);
}

// Previous image
function prevSlide() {
    showSlide(currentIndex - 1);
}

// Start automatic slider
function startAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, 3000);
}

// Restart autoplay after manual navigation
function restartAutoPlay() {
    startAutoPlay();
}

nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoPlay();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoPlay();
});

// Pause when mouse is over the slider
slider.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
});

slider.addEventListener("mouseleave", startAutoPlay);

// Initial display
showSlide(0);
startAutoPlay();
