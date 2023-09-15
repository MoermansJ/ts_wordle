import IHTMLPrintable from "../interfaces/IHTMLPrintable.js";

export default class UserInputWord implements IHTMLPrintable {
  //properties
  private _id: number = 0;
  private _userInput: string = "";
  private _computerWord: string = "";
  private _HTMLElement: HTMLElement[];

  //constructor
  public constructor(guessCount: number, userInput: string, computerWord: string) {
    this._id = guessCount;
    this._computerWord = computerWord;
    this._userInput = userInput.substring(0, computerWord.length).toLocaleUpperCase(); //this does NOT cause bugs when computerWord.length > userinput.length
    this._HTMLElement = this.render();
  }

  //getters
  public get id(): number {
    return this._id;
  }
  public get computerWord(): string {
    return this._computerWord;
  }
  public get userInput(): string {
    return this._userInput;
  }
  public get HTMLElement(): HTMLElement[] {
    return this._HTMLElement;
  }

  //custom methods
  private static convertWordToCharArray(word: string, computerWord: string): string[] {
    let charArray: string[] = new Array(computerWord.length);
    charArray.fill("_");

    for (let i = 0; i < word.length; i++) {
      charArray[i] = word.charAt(i);
    }
    return charArray;
  }

  public render(): HTMLElement[] {
    const userInputCharArray: string[] = UserInputWord.convertWordToCharArray(this.userInput, this.computerWord);

    //creating row element
    let guessRowHTML: HTMLDivElement[] = [];

    //individual letters
    for (let i = 0; i < userInputCharArray.length; i++) {
      //creating element
      let letterDivHTML: HTMLDivElement = document.createElement("span") as HTMLDivElement;
      letterDivHTML.id = `user-word-${this._id}-letter-${i}`;
      letterDivHTML.innerText = `${userInputCharArray[i]}`;

      //style - layout
      letterDivHTML.style.gridRow = "" + (this.id + 2);
      letterDivHTML.style.gridColumn = "" + (i + 1);
      letterDivHTML = this.styleColor(letterDivHTML, i, userInputCharArray);

      //appending
      guessRowHTML.push(letterDivHTML);
    }

    return guessRowHTML;
  }

  private styleColor(element: HTMLDivElement, index: number, userInputCharArray: string[]): HTMLDivElement {
    const computerWordCharArray: string[] = UserInputWord.convertWordToCharArray(this.computerWord, this.computerWord);

    //if letter is correct but in wrong place - ORANGE
    if (computerWordCharArray.includes(userInputCharArray[index])) {
      element.style.background = "#D1B036";
    }

    //if letter is correct and in the right place - GREEN
    if (computerWordCharArray[index] === userInputCharArray[index]) {
      element.style.background = "#6AAA64";
    }

    return element;
  }
}
