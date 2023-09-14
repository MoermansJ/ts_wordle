import InputElement from "./InputElement.js";
import UserInputWord from "./userInputWord.js";

window.onload = (): void => {
  //variables
  // const words: string[] = ["alphabet", "test"];
  const computerWord: string = generateRandomWord();
  let userGuessCounter: number = 0;

  //start up
  main();

  //functions
  function main(): void {
    //game starts
    const obscureComputerWord: string = obscureWord(computerWord);
    printObscureWord(obscureComputerWord);
    const inputElements: HTMLElement[] = new InputElement(computerWord).HTMLElement;
    printInputElements(inputElements);
  }

  //event handlers
  function handleUserSubmit(): void {
    //triggered by "CHECK" button click
    ++userGuessCounter;

    //saving user input
    const allInputElements: HTMLInputElement[] = Array.from(document.getElementsByClassName("letter-input")) as HTMLInputElement[]; //casting from HTMLCollectionOf<Element> TO array TO HTMLElement[];
    let userInput: string = "";
    for (let i = 0; i < allInputElements.length; i++) {
      userInput += allInputElements[i].value;
      allInputElements[i].value = "";
    }

    //focusing back on first input box
    document.getElementById("input-1")?.focus();

    //handling user input
    const userInputWord: UserInputWord = new UserInputWord(userGuessCounter, userInput, computerWord);

    //updating view
    printUserInput(userInputWord.HTMLElement);

    //shifting focus
    const firstInput: HTMLInputElement = document.getElementById("input1") as HTMLInputElement;
    firstInput.focus();
  }

  //helper methods
  function printUserInput(HTML: HTMLElement[]): void {
    //appending HTML
    const userWordHTML = document.getElementById("input-container") as HTMLDivElement;
    HTML.forEach((element) => userWordHTML.append(element));
  }

  function printObscureWord(word: string): void {
    //updating HTML
    (document.getElementById("obscure-word") as HTMLParagraphElement).innerText = word;
  }

  function generateRandomWord(): string {
    // return words[Math.round(Math.random())]; //TO DO: randomise
    return "JOEY";
  }

  function obscureWord(word: string): string {
    //obscuring word
    let obscureWord: string = "";
    for (let i = 0; i < word.length; i++) {
      obscureWord += "*";
    }

    return obscureWord;
  }

  function printInputElements(inputElements: HTMLElement[]): void {
    const inputContainer: HTMLDivElement = document.getElementById("input-container") as HTMLDivElement;
    inputElements.forEach((element) => inputContainer.append(element));
  }

  //event listeners
  document.getElementById("user-submit")?.addEventListener("click", handleUserSubmit);
};
