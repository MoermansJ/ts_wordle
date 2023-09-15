export default class InputElement {
    constructor(computerWord) {
        InputElement._computerWord = computerWord;
        this._HTMLElement = this.render(computerWord);
    }
    get HTMLElement() {
        return this._HTMLElement;
    }
    render(computerWord) {
        let HTML = Array(document.createElement("div"));
        for (let i = 1; i <= computerWord.length; i++) {
            let inputHTML = document.createElement("input");
            inputHTML.type = "text";
            inputHTML.maxLength = 1;
            inputHTML.classList.add("letter-input");
            inputHTML.classList.add("flex-item");
            inputHTML.id = `input${i}`;
            inputHTML.style.gridRow = "0";
            inputHTML.style.gridColumn = "" + i;
            inputHTML.addEventListener("keydown", InputElement.jumpToNextOrPrevious);
            HTML.push(inputHTML);
        }
        let buttonHTML = document.createElement("button");
        buttonHTML.innerText = ">";
        buttonHTML.id = "user-submit";
        buttonHTML.style.cursor = "pointer";
        buttonHTML.style.gridRow = "0";
        buttonHTML.style.gridColumn = "" + (computerWord.length + 1);
        HTML.push(buttonHTML);
        return HTML;
    }
    static jumpToNextOrPrevious(event) {
        const key = event.key.toUpperCase();
        const target = event.target;
        const currentIndex = parseInt(target.id.substring(5));
        if (key === "BACKSPACE" || key === "DELETE") {
            if (event.target.value != "") {
                return;
            }
            if (currentIndex === 1) {
                return;
            }
            const previousInputId = "input" + (currentIndex - 1);
            const previousInput = document.getElementById(previousInputId);
            previousInput.focus();
            event.preventDefault();
            return;
        }
        const regex = /[A-Z]/;
        if (!regex.test(key) || key.length >= 2) {
            return;
        }
        target.value = key;
        event.preventDefault();
        if (currentIndex === InputElement._computerWord.length) {
            const button = document.getElementById("user-submit");
            button.focus();
            return;
        }
        const nextInput = document.getElementById("input" + (currentIndex + 1));
        nextInput.focus();
    }
}
