export default class UserInputWord {
  //properties
  private _id: number = 0;
  private _userInput: string = "";
  private computerWord: string = "";
  private _HTMLElement: HTMLElement;

  //constructor
  public constructor(guessCount: number, userInput: string, computerWord: string) {
    this._id = guessCount;
    this.computerWord = computerWord;
    this._userInput = userInput.substring(0, computerWord.length).toLocaleUpperCase(); //this does NOT cause bugs when computerWord.length > userinput.length
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

  private createHTML(): HTMLElement {
    const userInputCharArray: string[] = UserInputWord.convertWordToCharArray(this.userInput, this.computerWord);
    const computerWordCharArray: string[] = UserInputWord.convertWordToCharArray(this.computerWord, this.computerWord);

    //creating row element
    const guessRowHTML: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    guessRowHTML.id = `user-guess-row-${this._id}`;

    //individual letters
    for (let i = 0; i < userInputCharArray.length; i++) {
      //creating element
      let letterDivHTML: HTMLDivElement = document.createElement("span") as HTMLDivElement;
      letterDivHTML.id = `user-word-letter-${i}`;
      letterDivHTML.innerText = `${userInputCharArray[i]}`;

      //style - colouring
      //if letter is correct but in wrong place - ORANGE
      if (computerWordCharArray.includes(userInputCharArray[i])) {
        letterDivHTML.style.background = "#D1B036";
      }

      if (computerWordCharArray[i] === userInputCharArray[i]) {
        //if letter is correct and in the right place - GREEN
        letterDivHTML.style.background = "#6AAA64";
      }

      //appending
      guessRowHTML.append(letterDivHTML);
    }

    return guessRowHTML;
  }
}
