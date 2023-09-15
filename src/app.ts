import InputElement from "./InputElement.js";
import UserInputWord from "./userInputWord.js";

window.onload = (): void => {
  //variables
  // const words: string[] = ["alphabet", "test"];
  const computerWord: string = generateRandomWord();
  let userGuessCounter: number = 0;
  let readyToPlay: boolean = false;

  //start up
  main();

  //functions
  function main(): void {
    //game starts
    printTitle(computerWord);
    const inputElements: HTMLElement[] = new InputElement(computerWord).HTMLElement;
    printInputElements(inputElements);
    readyToPlay = true;
  }

  //event handlers
  function handleUserSubmit(): void {
    //triggered by "CHECK" button click
    if (!readyToPlay) {
      return;
    }

    //user input
    ++userGuessCounter;
    const allInputElements: HTMLInputElement[] = Array.from(document.getElementsByClassName("letter-input")) as HTMLInputElement[]; //casting from HTMLCollectionOf<Element> TO array TO HTMLElement[];
    let userInput: string = "";
    for (let i = 0; i < allInputElements.length; i++) {
      userInput += allInputElements[i].value;
      allInputElements[i].value = "";
    }
    const userInputWord: UserInputWord = new UserInputWord(userGuessCounter, userInput, computerWord);
    printUserInput(userInputWord.HTMLElement);

    //shifting focus
    const firstInput: HTMLInputElement = document.getElementById("input1") as HTMLInputElement;
    firstInput.focus();
  }

  //helper methods
  function generateRandomWord(): string {
    // return words[Math.round(Math.random())].toUpperCase(); //TO DO: randomise
    return "joey".toUpperCase();
  }

  function printUserInput(HTML: HTMLElement[]): void {
    const userWordHTML = document.getElementById("input-container") as HTMLDivElement;
    HTML.forEach((element) => userWordHTML.append(element));
  }

  function printTitle(word: string): void {
    (document.getElementById("computer-title") as HTMLElement).innerText = `Guess the ${word.length}-letter word`;
  }

  function printInputElements(inputElements: HTMLElement[]): void {
    const inputContainer: HTMLDivElement = document.getElementById("input-container") as HTMLDivElement;
    inputElements.forEach((element) => inputContainer.append(element));
  }

  //event listeners
  document.getElementById("user-submit")?.addEventListener("click", handleUserSubmit);
};
