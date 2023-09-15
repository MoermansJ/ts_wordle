import IEventHandler from "../interfaces/IEventHandler.js";
import ConfettiAnimation from "./ConfettiAnimation.js";
import Game from "./Game.js";
import UserInputWord from "./userInputWord.js";

export default class HandleUserSubmit implements IEventHandler {
  //properties
  private game: Game;

  //constructor
  public constructor(game: Game) {
    this.game = game;
  }

  //custom methods
  public handleEvent(event?: Event | undefined): void {
    //triggered by "CHECK" button click
    if (!this.game.readyToPlay) {
      return;
    }

    //max amount of guesses
    if (this.game.userGuessCounter === 7) {
      return;
    }

    //processing user input
    ++this.game.userGuessCounter;
    let userInput: string = "";
    const elements: HTMLInputElement[] = this.game.allInputElements;

    for (let i = 0; i < elements.length; i++) {
      userInput += elements[i].value;
      elements[i].value = "";
    }

    //printing
    const userInputWord: UserInputWord = new UserInputWord(this.game.userGuessCounter, userInput, this.game.computerWord);
    const userWordHTML = document.getElementById("input-container") as HTMLDivElement;
    Game.printHTML(userInputWord.HTMLElement, userWordHTML);
    Game.updateUserGuessCounter(this.game);

    //shifting focus back to input after pressing button
    const firstInput: HTMLInputElement = document.getElementById("input1") as HTMLInputElement;
    firstInput.focus();

    //checking if user guessed word correctly
    if (userInput === this.game.computerWord) {
      this.game.readyToPlay = false;
      new ConfettiAnimation().playAnimation();
    }
  }
}
