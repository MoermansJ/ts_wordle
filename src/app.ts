// import UserInputWord from "./userInputWord";

window.onload = (): void => {
  //
  //variables
  const computerWord: string = generateRandomWord();
  let userGuessCounter: number = 0;

  //
  //start up
  main();

  //
  //functions
  function main(): void {
    //game starts
    const obscureComputerWord: string = obscureWord(computerWord);
    printObscureWord(obscureComputerWord);
  }

  //
  //event handlers
  function handleUserSubmit(): void {
    //triggered by "CHECK" button click
    ++userGuessCounter;

    //saving user input
    const userInputHTML: HTMLInputElement = document.getElementById("user-input") as HTMLInputElement;
    const userInput: string = userInputHTML.value;
    userInputHTML.value = ""; //clearing for UX

    //handling user input
    const userInputWord: UserInputWord = new UserInputWord(userGuessCounter, userInput, computerWord);

    //updating view
    printUserInput(userInputWord.HTMLElement);
  }

  //helper methods
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
    return "ALPHABET"; //TO DO: randomise
  }

  function obscureWord(word: string): string {
    //obscuring word
    let obscureWord: string = "";
    for (let i = 0; i < word.length; i++) {
      obscureWord += "*";
    }

    return obscureWord;
  }

  //
  //event listeners
  document.getElementById("user-submit")?.addEventListener("click", handleUserSubmit);
};
//
//
//
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
      //if letter is correct and in the right place - GREEN
      if (computerWordCharArray[i] === userInputCharArray[i]) {
        letterDivHTML.style.background = "#638B54";
      }

      //if letter is correct but in wrong place
      //add logic - ORANGE

      //appending
      guessRowHTML.append(letterDivHTML);
    }

    return guessRowHTML;
  }
}
