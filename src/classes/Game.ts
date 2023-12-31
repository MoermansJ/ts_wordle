import IGame from "../interfaces/IGame.js";
import InputElement from "./InputElement.js";
import IEventHandler from "../interfaces/IEventHandler.js";
import HandleUserSubmit from "./HandleUserSubmit.js";
import HandleButtonKeydown from "./HandleButtonKeydown.js";

export default class Game implements IGame {
  //properties
  private _computerWord: string;
  private _userGuessCounter: number;
  private _readyToPlay: boolean;
  private _allInputElements: HTMLInputElement[];

  //constructor
  public constructor() {
    this._computerWord = Game.generateRandomWord();
    this._allInputElements = new Array();
    this._userGuessCounter = 0;
    this._readyToPlay = false;
  }

  //main - game flow
  public main(): void {
    //loading modules
    this.printTitle(this.computerWord);
    const inputElements: HTMLElement[] = new InputElement(this.computerWord).HTMLElement;

    const inputContainer: HTMLDivElement = document.getElementById("input-container") as HTMLDivElement;
    Game.printHTML(inputElements, inputContainer);

    this._allInputElements = Array.from(document.getElementsByClassName("letter-input")) as HTMLInputElement[]; //casting from HTMLCollectionOf<Element> TO array TO HTMLElement[];

    //event handling & listening
    const handleUserSubmit: IEventHandler = new HandleUserSubmit(this);
    document.getElementById("user-submit")?.addEventListener("click", handleUserSubmit);

    const handleButtonKeydown: IEventHandler = new HandleButtonKeydown(this.computerWord.length);
    document.getElementById("user-submit")?.addEventListener("keydown", handleButtonKeydown);

    //hiding loadscreen
    this.hideLoadingScreen();
    this._readyToPlay = true;
  }

  //getters & setters
  public get computerWord(): string {
    return this._computerWord;
  }
  public get userGuessCounter(): number {
    return this._userGuessCounter;
  }
  public set userGuessCounter(value: number) {
    this._userGuessCounter = value;
  }
  public get readyToPlay(): boolean {
    return this._readyToPlay;
  }
  public set readyToPlay(value: boolean) {
    this._readyToPlay = value;
  }
  public get allInputElements(): HTMLInputElement[] {
    return this._allInputElements;
  }

  //custom methods
  private static generateRandomWord(): string {
    const words: string[] = [
      "abort",
      "break",
      "crazy",
      "dummy",
      "empty",
      "fresh",
      "great",
      "hello",
      "inner",
      "joins",
      "kilos",
      "lemon",
      "money",
      "opens",
      "price",
      "queen",
      "rusty",
      "saves",
      "think",
      "using",
      "value",
      "world",
      "xenon",
      "yours",
      "zeros",
    ];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toUpperCase(); //TO DO: randomise
  }

  public static printHTML(children: HTMLElement[] | HTMLElement, parent: HTMLElement): void {
    //children element array
    if (Array.isArray(children)) {
      children.forEach((child) => parent.append(child));
      return;
    }

    //children single element
    parent.append(children);
  }

  private printTitle(word: string): void {
    (document.getElementById("computer-title") as HTMLElement).innerText = `Guess the ${word.length}-letter word\nAttempt ${this._userGuessCounter}/7`;
  }

  public static updateUserGuessCounter(game: Game): void {
    (document.getElementById("computer-title") as HTMLElement).innerText = `Guess the ${game.computerWord.length}-letter word\nAttempt ${game.userGuessCounter}/7`;
  }

  private hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen") as HTMLDivElement;
    loadingScreen.style.animation = "fadeOut 1.6s forwards";
  }
}
