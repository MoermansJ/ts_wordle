// import UserInputWord from "./userInputWord";

window.onload = (): void => {
  //variables
  const computerWord: string = generateRandomWord();
  let userGuessCounter: number = 0;

  //start up
  main();

  //functions
  function main(): void {
    const obscureComputerWord: string = obscureWord(computerWord);
    printObscureWord(obscureComputerWord);
  }

  function handleUserSubmit(): void {
    //triggered by "CHECK" button click
    ++userGuessCounter;
    const userInput: string = (document.getElementById("user-input") as HTMLInputElement).value;
    const userInputWord: UserInputWord = new UserInputWord(userGuessCounter, userInput, computerWord);
    printUserInput(userInputWord.HTMLElement);
  }

  function printUserInput(HTML: HTMLElement): void {
    //appending HTML
    const userWordHTML = document.getElementById("user-word") as HTMLDivElement;
    userWordHTML.append(HTML);
  }

  function printObscureWord(word: string): void {
    //updating HTML
    (document.getElementById("obscure-word") as HTMLParagraphElement).innerText = word;
  }

  function generateRandomWord(): string {
    return "alphabet"; //TO DO: randomise
  }

  function obscureWord(word: string): string {
    //obscuring computerWord
    let obscureWord: string = "";
    for (let i = 0; i < word.length; i++) {
      obscureWord += "*";
    }

    return obscureWord;
  }

  //event listeners
  document.getElementById("user-submit")?.addEventListener("click", handleUserSubmit);
};

//classes - TO DO: export/import + webpack
class UserInputWord {
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
    return this._HTMLElement;
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
    guessRowHTML.id = `user-guess-row-${this._id}`;

    //individual letters
    for (let i = 0; i < userInputCharArray.length; i++) {
      //creating element
      let letterDivHTML: HTMLDivElement = document.createElement("span") as HTMLDivElement;
      letterDivHTML.id = `user-word-letter-${i}`;
      letterDivHTML.innerText = `${userInputCharArray[i]}`;

      //style - colouring
      //if letter is correct and in the right place - GREEN
      if (computerWordCharArray[i] === userInputCharArray[i]) {
        letterDivHTML.style.background = "green";
      }

      //if letter is correct but in wrong place
      //add logic - ORANGE

      //appending
      guessRowHTML.append(letterDivHTML);
    }

    return guessRowHTML;
  }
}
