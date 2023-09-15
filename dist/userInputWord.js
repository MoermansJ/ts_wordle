export default class UserInputWord {
    constructor(guessCount, userInput, computerWord) {
        this._id = 0;
        this._userInput = "";
        this.computerWord = "";
        this._id = guessCount;
        this.computerWord = computerWord;
        this._userInput = userInput.substring(0, computerWord.length).toLocaleUpperCase();
        this._HTMLElement = this.render();
    }
    get id() {
        return this._id;
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
        const computerWordCharArray = UserInputWord.convertWordToCharArray(this.computerWord, this.computerWord);
        let guessRowHTML = [];
        for (let i = 0; i < userInputCharArray.length; i++) {
            let letterDivHTML = document.createElement("span");
            letterDivHTML.id = `user-word-${this._id}-letter-${i}`;
            letterDivHTML.innerText = `${userInputCharArray[i]}`;
            letterDivHTML.style.gridRow = "" + (this.id + 2);
            letterDivHTML.style.gridColumn = "" + (i + 1);
            if (computerWordCharArray.includes(userInputCharArray[i])) {
                letterDivHTML.style.background = "#D1B036";
            }
            if (computerWordCharArray[i] === userInputCharArray[i]) {
                letterDivHTML.style.background = "#6AAA64";
            }
            guessRowHTML.push(letterDivHTML);
        }
        return guessRowHTML;
    }
}
