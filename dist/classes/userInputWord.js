export default class UserInputWord {
    constructor(guessCount, userInput, computerWord) {
        this._id = 0;
        this._userInput = "";
        this._computerWord = "";
        this._id = guessCount;
        this._computerWord = computerWord;
        this._userInput = userInput.substring(0, computerWord.length).toLocaleUpperCase();
        this._HTMLElement = this.render();
    }
    get id() {
        return this._id;
    }
    get computerWord() {
        return this._computerWord;
    }
    get userInput() {
        return this._userInput;
    }
    get HTMLElement() {
        return this._HTMLElement;
    }
    static convertWordToCharArray(word, computerWord) {
        let charArray = new Array(computerWord.length);
        charArray.fill("_");
        for (let i = 0; i < word.length; i++) {
            charArray[i] = word.charAt(i);
        }
        return charArray;
    }
    render() {
        const userInputCharArray = UserInputWord.convertWordToCharArray(this.userInput, this.computerWord);
        let guessRowHTML = [];
        for (let i = 0; i < userInputCharArray.length; i++) {
            let letterDivHTML = document.createElement("span");
            letterDivHTML.id = `user-word-${this._id}-letter-${i}`;
            letterDivHTML.innerText = `${userInputCharArray[i]}`;
            letterDivHTML.style.gridRow = "" + (this.id + 2);
            letterDivHTML.style.gridColumn = "" + (i + 1);
            letterDivHTML = this.styleColor(letterDivHTML, i, userInputCharArray);
            guessRowHTML.push(letterDivHTML);
        }
        return guessRowHTML;
    }
    styleColor(element, index, userInputCharArray) {
        const computerWordCharArray = UserInputWord.convertWordToCharArray(this.computerWord, this.computerWord);
        if (computerWordCharArray.includes(userInputCharArray[index])) {
            element.style.background = "#D1B036";
        }
        if (computerWordCharArray[index] === userInputCharArray[index]) {
            element.style.background = "#6AAA64";
        }
        return element;
    }
}
