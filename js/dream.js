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
