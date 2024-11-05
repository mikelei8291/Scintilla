const preventEvent = (e) => e.preventDefault();

document.querySelectorAll("img").forEach(n => {
    n.addEventListener("contextmenu", preventEvent);
    n.addEventListener("mousedown", preventEvent);
});

document.querySelectorAll(`a[href="#"]`).forEach(n => n.addEventListener("click", preventEvent));

const doubleLayerImage = document.querySelector(".double-layer > img.front");

doubleLayerImage.addEventListener("mousemove", (e) => {
    doubleLayerImage.style.setProperty("--x", e.layerX);
    doubleLayerImage.style.setProperty("--y", e.layerY);
    doubleLayerImage.style.setProperty("--width", e.target.width);
    doubleLayerImage.style.setProperty("--height", e.target.height);
});

const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    })
}, { threshold: 0.8 });

document.querySelectorAll(".art-collection figure").forEach(n => obs.observe(n));
