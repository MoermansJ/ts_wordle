import InputElement from "./InputElement.js";
import HandleUserSubmit from "./HandleUserSubmit.js";
export default class Game {
    constructor() {
        this._computerWord = Game.generateRandomWord();
        this._allInputElements = new Array();
        this._userGuessCounter = 0;
        this._readyToPlay = false;
    }
    main() {
        var _a;
        this.printTitle(this.computerWord);
        const inputElements = new InputElement(this.computerWord).HTMLElement;
        const inputContainer = document.getElementById("input-container");
        Game.printHTML(inputElements, inputContainer);
        this._allInputElements = Array.from(document.getElementsByClassName("letter-input"));
        this._readyToPlay = true;
        const handleUserSubmit = new HandleUserSubmit(this);
        (_a = document.getElementById("user-submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleUserSubmit);
    }
    get computerWord() {
        return this._computerWord;
    }
    get userGuessCounter() {
        return this._userGuessCounter;
    }
    set userGuessCounter(value) {
        this._userGuessCounter = value;
    }
    get readyToPlay() {
        return this._readyToPlay;
    }
    set readyToPlay(value) {
        this._readyToPlay = value;
    }
    get allInputElements() {
        return this._allInputElements;
    }
    static generateRandomWord() {
        return "Joey".toUpperCase();
    }
    static printHTML(children, parent) {
        if (Array.isArray(children)) {
            children.forEach((child) => parent.append(child));
            return;
        }
        parent.append(children);
    }
    printTitle(word) {
        document.getElementById("computer-title").innerText = `Guess the ${word.length}-letter word\nAttempt ${this._userGuessCounter}/7`;
    }
    static updateUserGuessCounter(game) {
        document.getElementById("computer-title").innerText = `Guess the ${game.computerWord.length}-letter word\nAttempt ${game.userGuessCounter}/7`;
    }
}
