import ConfettiAnimation from "./ConfettiAnimation.js";
import Game from "./Game.js";
import UserInputWord from "./userInputWord.js";
export default class HandleUserSubmit {
    constructor(game) {
        this.game = game;
    }
    handleEvent(event) {
        if (!this.game.readyToPlay) {
            return;
        }
        if (this.game.userGuessCounter === 7) {
            return;
        }
        ++this.game.userGuessCounter;
        let userInput = "";
        const elements = this.game.allInputElements;
        for (let i = 0; i < elements.length; i++) {
            userInput += elements[i].value;
            elements[i].value = "";
        }
        const userInputWord = new UserInputWord(this.game.userGuessCounter, userInput, this.game.computerWord);
        const userWordHTML = document.getElementById("input-container");
        Game.printHTML(userInputWord.HTMLElement, userWordHTML);
        Game.updateUserGuessCounter(this.game);
        const firstInput = document.getElementById("input1");
        firstInput.focus();
        if (userInput === this.game.computerWord) {
            this.game.readyToPlay = false;
            new ConfettiAnimation().playAnimation();
        }
    }
}
