const preventEvent = (e) => e.preventDefault();

document.querySelectorAll("img").forEach(n => {
    n.addEventListener("contextmenu", preventEvent);
    n.addEventListener("mousedown", preventEvent);
});

document.querySelectorAll(`a[href="#"]`).forEach(n => n.addEventListener("click", preventEvent));

const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    })
}, { threshold: 0.8 });

document.querySelectorAll(".art-collection figure").forEach(n => obs.observe(n));
