import IHTMLPrintable from "../interfaces/IHTMLPrintable.js";

export default class InputElement implements IHTMLPrintable {
  //properties
  private static _computerWord: string;
  private _HTMLElement: HTMLElement[];

  //constructor
  constructor(computerWord: string) {
    InputElement._computerWord = computerWord;
    this._HTMLElement = this.render(computerWord);
  }

  //getter
  public get HTMLElement(): HTMLElement[] {
    return this._HTMLElement;
  }

  //custom methods
  public render(computerWord: string): HTMLElement[] {
    let HTML: HTMLElement[] = Array(document.createElement("div"));

    for (let i = 1; i <= computerWord.length; i++) {
      let inputHTML: HTMLInputElement = document.createElement("input") as HTMLInputElement;
      inputHTML.type = "text";
      inputHTML.maxLength = 1;
      inputHTML.classList.add("letter-input");
      inputHTML.classList.add("flex-item"); //spaces not allowed so 2 lines of classList.add
      inputHTML.id = `input${i}`;
      inputHTML.style.gridRow = "0";
      inputHTML.style.gridColumn = "" + i;
      inputHTML.addEventListener("keydown", InputElement.jumpToNextOrPrevious); //behavior
      HTML.push(inputHTML);
    }

    let buttonHTML: HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
    buttonHTML.innerText = ">";
    buttonHTML.id = "user-submit";
    buttonHTML.style.cursor = "pointer";
    buttonHTML.style.gridRow = "0";
    buttonHTML.style.gridColumn = "" + (computerWord.length + 1);
    HTML.push(buttonHTML);

    return HTML;
  }

  //behavior
  private static jumpToNextOrPrevious(event: KeyboardEvent): void {
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

      //shifting focus
      const previousInputId = "input" + (currentIndex - 1);
      const previousInput = document.getElementById(previousInputId) as HTMLInputElement;
      previousInput.focus();
      event.preventDefault();
      return;
    }

    // Check if the pressed key matches regex AND pressed key is a character
    const regex: RegExp = /[A-Z]/; //A - Z
    if (!regex.test(key) || key.length >= 2) {
      return;
    }

    //writing key to current input only
    target.value = key;
    event.preventDefault(); //prevents input from being "written" AFTER nextInput.focus();

    if (currentIndex === InputElement._computerWord.length) {
      const button: HTMLButtonElement = document.getElementById("user-submit") as HTMLButtonElement;
      button.focus();
      return;
    }

    //shifting focus
    const nextInput = document.getElementById("input" + (currentIndex + 1)) as HTMLInputElement;
    nextInput.focus();
  }
}
