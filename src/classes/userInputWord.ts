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
    const computerWordCharArray: string[] = UserInputWord.convertWordToCharArray(this.computerWord, this.computerWord);

    //creating map, key = character, value = occurances in computerWord
    let computerWordCharMap: Map<string, number> = new Map();
    for (const item of computerWordCharArray) {
      const count = computerWordCharMap.get(item);
      if (count !== undefined) {
        computerWordCharMap.set(item, count + 1);
      } else {
        computerWordCharMap.set(item, 1);
      }
    }

    //calculating available orange letters
    let availableOrange: Map<String, number> = new Map(computerWordCharMap);
    for (let i = 0; i < userInputCharArray.length; i++) {
      if (userInputCharArray[i] === computerWordCharArray[i]) {
        availableOrange.set(userInputCharArray[i], (availableOrange.get(userInputCharArray[i]) as number) - 1);
      }
    }

    //creating elements
    let guessRowHTML: HTMLDivElement[] = [];
    for (let i = 0; i < computerWordCharArray.length; i++) {
      const currentChar: string = userInputCharArray[i];
      let letterDivHTML: HTMLDivElement = document.createElement("span") as HTMLDivElement;
      letterDivHTML.id = `user-word-${this._id}-letter-${i}`;
      letterDivHTML.innerText = `${userInputCharArray[i]}`;

      //style - layout
      letterDivHTML.style.gridRow = "" + (this.id + 2);
      letterDivHTML.style.gridColumn = "" + (i + 1);

      //style - colour - green
      if (computerWordCharArray[i] === userInputCharArray[i]) {
        letterDivHTML.style.background = "#528D4D"; //green
      }

      //style - colour - orange
      if (computerWordCharArray.includes(userInputCharArray[i]) && computerWordCharArray[i] !== userInputCharArray[i]) {
        if ((availableOrange.get(userInputCharArray[i]) as number) >= 1) {
          letterDivHTML.style.background = "#B49F3B"; //orange
          availableOrange.set(userInputCharArray[i], (availableOrange.get(userInputCharArray[i]) as number) - 1); //decrementing available orange for character
        }
      }

      guessRowHTML.push(letterDivHTML);
    }

    return guessRowHTML;
  }
}
