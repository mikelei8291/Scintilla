import { CharacterReplacer, CharacterShow, CursorMovementObserver } from "./dream.js";
import { ScrollObserver } from "./scroll.js";

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

const replacers = Array.from(document.querySelectorAll(".multilingual p:not(.alt)")).map(p => new CharacterReplacer(p));
const cmobs = new CursorMovementObserver(document.querySelector(".dream figure.assembly"));
const scobs = new ScrollObserver();
scobs.observe(document.querySelector(".dream"), (progress) => {
    if (progress === 1) {
        cmobs.observe();
    } else {
        cmobs.unobserve();
    }
    replacers.forEach(r => r.setProgress(progress));
}, 1.2, 0.5);

const titleShow = new CharacterShow(document.querySelector(".dream h1.p1"));
(new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            titleShow.show();
            obs.disconnect();
        }
    })
}, { threshold: 0.9 })).observe(document.querySelector(".dream .view"));

const animism = document.querySelector(".animism");
Promise.all(Array.from(document.querySelectorAll(`img[src$="svg"]`)).map(
    svg => fetch(svg.src).then(data => data.text()).then(data => {
        svg.insertAdjacentHTML("beforebegin", data);
        svg.previousElementSibling.id = svg.id;
        svg.previousElementSibling.pauseAnimations();
        svg.remove();
    }).catch(e => console.error(e))
)).then(() => {
    scobs.observe(animism, (progress) => {
        if (progress === 1) {
            animism.classList.add("animate");
            animism.querySelectorAll("svg").forEach(svg => svg.unpauseAnimations());
        } else if (progress < 1) {
            animism.classList.remove("animate");
            animism.querySelectorAll("svg").forEach(svg => {
                svg.pauseAnimations();
                svg.setCurrentTime(0);
            });
        }
    }, 1.2);
});
