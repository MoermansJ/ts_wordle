import UserInputWord from "./userInputWord.js";

window.onload = (): void => {
  //variables
  const words: string[] = ["alphabet", "test"];
  const computerWord: string = generateRandomWord();
  let userGuessCounter: number = 0;

  //start up
  main();

  //functions
  function main(): void {
    //game starts
    const obscureComputerWord: string = obscureWord(computerWord);
    printObscureWord(obscureComputerWord);
  }

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
    return words[Math.round(Math.random())]; //TO DO: randomise
  }

  function obscureWord(word: string): string {
    //obscuring word
    let obscureWord: string = "";
    for (let i = 0; i < word.length; i++) {
      obscureWord += "*";
    }

    return obscureWord;
  }

  function jumpToNextOrPrevious(event: KeyboardEvent): void {
    const key: string = event.key.toUpperCase();
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const currentIndex: number = parseInt(target.id.substring(5));

    //going backward
    if (key === "BACKSPACE" || key === "DELETE") {
      if ((event.target as HTMLInputElement).value != "") {
        return;
      }
      if (currentIndex === 1) {
        return;
      }

      const previousInputId = "input" + (currentIndex - 1);
      const previousInput = document.getElementById(previousInputId) as HTMLInputElement;
      previousInput.focus();
      event.preventDefault();
      return;
    }

    // Check if the pressed key matches regex
    const regex: RegExp = /[A-Z]/; //A - Z
    if (!regex.test(key)) {
      event.preventDefault();
    }

    target.value = key; //assigning key value to input field
    event.preventDefault(); //preventing input from being "written" AFTER nextInput.focus();

    if (currentIndex === 5) {
      return;
    }

    const nextInput = document.getElementById("input" + (currentIndex + 1)) as HTMLInputElement;
    nextInput.focus();
  }

  //event listeners
  document.getElementById("user-submit")?.addEventListener("click", handleUserSubmit);

  //adding event listeners to each input field
  const elements: HTMLElement[] = Array.from(document.getElementsByClassName("letter-input")) as HTMLElement[]; //casting from HTMLCollectionOf<Element> TO array TO HTMLElement[];
  elements.forEach((element) => element?.addEventListener("keydown", jumpToNextOrPrevious));
};
