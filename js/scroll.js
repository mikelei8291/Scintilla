export class ScrollObserver {
    constructor() {
        this.targets = [];
        window.addEventListener("scroll", this.listener, { passive: true });
    }

    listener = () => {
        this.targets.forEach(({ element, callback, overshot, delay }) => {
            let progress = ((window.innerHeight - element.getBoundingClientRect().top) / window.innerHeight - 1) * overshot - delay;
            if (progress < 0) {
                progress = 0;
            } else if (progress > 1) {
                progress = 1;
            }
            element.style.setProperty("--progress", progress.toString());
            if (callback) {
                callback(progress);
            }
        });
    }

    observe(element, callback = null, overshot = 1, delay = 0) {
        this.targets.push({ element, callback, overshot, delay });
        this.listener();
    }

    unobserve(element) {
        this.targets = this.targets.filter(t => t.element !== element);
    }
}
