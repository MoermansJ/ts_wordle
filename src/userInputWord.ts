export default class UserInputWord {
  //properties
  private _id: number = 0;
  private _userInput: string = "";
  private computerWord: string = "";
  private _HTMLElement: HTMLElement;

  //constructor
  public constructor(guessCount: number, userInput: string, computerWord: string) {
    this._id = guessCount;
    // this._charArray = UserInputWord.convertWordToCharArray(userInput);
    this._userInput = userInput;
    this.computerWord = computerWord;
    // this._HTMLElement = this.createHTML(this._charArray);
    this._HTMLElement = this.createHTML();
  }

  //getters
  public get id(): number {
    return this._id;
  }

  public get userInput(): string {
    return this._userInput;
  }

  public get HTMLElement(): HTMLElement {
    return this.HTMLElement;
  }

  //custom methods
  private static convertWordToCharArray(word: string): string[] {
    let charArray: string[] = [];
    for (let i = 0; i < word.length; i++) {
      charArray.push(word.charAt(i));
    }
    return charArray;
  }

  private createHTML(): HTMLElement {
    const userInputCharArray: string[] = UserInputWord.convertWordToCharArray(this.userInput);
    const computerWordCharArray: string[] = UserInputWord.convertWordToCharArray(this.computerWord);

    //creating row element
    const guessRowHTML: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    guessRowHTML.innerHTML = `<div id="user-guess-row-${this._id}">`;

    //adding individual letters to row
    for (let i = 0; i < userInputCharArray.length; i++) {
      //creating letter element
      let letterDivHTML: HTMLDivElement = document.createElement("span") as HTMLDivElement;
      letterDivHTML.innerHTML = `<span id="user-word-letter-${this._id}">${userInputCharArray[i]}</span>`;

      //colouring letter
      //if letter is correct and in the right place - GREEN
      if (computerWordCharArray[i] === userInputCharArray[i]) {
        letterDivHTML.style.background = "green";
      }

      //if letter is correct but in wrong place
      //add logic - ORANGE

      guessRowHTML.append(letterDivHTML);
    }

    //closing element
    guessRowHTML.innerHTML += `</div>`;

    return guessRowHTML;
  }
}
