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
        const computerWordCharArray = UserInputWord.convertWordToCharArray(this.computerWord, this.computerWord);
        let computerWordCharMap = new Map();
        for (const item of computerWordCharArray) {
            const count = computerWordCharMap.get(item);
            if (count !== undefined) {
                computerWordCharMap.set(item, count + 1);
            }
            else {
                computerWordCharMap.set(item, 1);
            }
        }
        let availableOrange = new Map(computerWordCharMap);
        for (let i = 0; i < userInputCharArray.length; i++) {
            if (userInputCharArray[i] === computerWordCharArray[i]) {
                availableOrange.set(userInputCharArray[i], availableOrange.get(userInputCharArray[i]) - 1);
            }
        }
        let guessRowHTML = [];
        for (let i = 0; i < computerWordCharArray.length; i++) {
            const currentChar = userInputCharArray[i];
            let letterDivHTML = document.createElement("span");
            letterDivHTML.id = `user-word-${this._id}-letter-${i}`;
            letterDivHTML.innerText = `${userInputCharArray[i]}`;
            letterDivHTML.style.gridRow = "" + (this.id + 2);
            letterDivHTML.style.gridColumn = "" + (i + 1);
            if (computerWordCharArray[i] === userInputCharArray[i]) {
                letterDivHTML.style.background = "#6AAA64";
            }
            if (computerWordCharArray.includes(userInputCharArray[i]) && computerWordCharArray[i] !== userInputCharArray[i]) {
                if (availableOrange.get(userInputCharArray[i]) >= 1) {
                    letterDivHTML.style.background = "#D1B036";
                    availableOrange.set(userInputCharArray[i], availableOrange.get(userInputCharArray[i]) - 1);
                }
            }
            guessRowHTML.push(letterDivHTML);
        }
        return guessRowHTML;
    }
}
