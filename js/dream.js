export class CharacterReplacer {
    constructor(element, steps = 10) {
        this.element = element;
        this.oldText = element.textContent ?? "";
        if (!!element.nextElementSibling && element.nextElementSibling.matches(".alt")) {
            this.newText = element.nextElementSibling.textContent;
        } else {
            this.newText = "";
        }
        this.steps = steps;
        this.removeLength = Math.ceil(this.oldText.length / steps);
        this.addLength = Math.ceil(this.newText.length / steps);
        this.progress = 0;
    }

    replace(step) {
        this.element.textContent = `${this.newText.slice(0, this.addLength * step)}${this.oldText.slice(this.removeLength * step)}`;
    }

    setProgress(progress) {
        this.replace(Math.round(progress * this.steps));
    }
}

export class CharacterShow {
    constructor(element, interval = 300) {
        this.element = element;
        this.interval = interval;
        this.text = element.textContent;
        this.shown = false;
        element.textContent = "";
    }

    show() {
        if (!this.shown) {
            let end = 1;
            const i = setInterval(() => {
                this.element.textContent = this.text.slice(0, end++);
                if (end > this.text.length) {
                    clearInterval(i);
                    this.shown = true;
                }
            }, this.interval);
        }
    }
}

export class CursorMovementObserver {
    constructor(element, range = "1rem") {
        this.element = element;
        element.style.setProperty("--cursor-range", range);
        this.callback = (e) => {
            const { width, height } = element.getBoundingClientRect();
            element.style.setProperty("--cursor-h", `${2 * e.layerX / width - 1}`);
            element.style.setProperty("--cursor-v", `${2 * e.layerY / height - 1}`);
        };
        this.observing = false;
    }

    observe() {
        if (!this.observing) {
            this.element.addEventListener("mousemove", this.callback);
            this.observing = true;
        }
    }

    unobserve() {
        if (this.observing) {
            this.element.removeEventListener("mousemove", this.callback);
            this.observing = false;
        }
    }
}
