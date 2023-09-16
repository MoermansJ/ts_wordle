import IEventHandler from "../interfaces/IEventHandler.js";

export default class HandleButtonKeydown implements IEventHandler {
  //properties
  readonly _highestInputIndex: number;

  //constructor
  constructor(max: number) {
    this._highestInputIndex = max;
  }

  //custom methods
  handleEvent(event: KeyboardEvent): void {
    const key: string = event.key.toUpperCase();
    const target: HTMLInputElement = event.target as HTMLInputElement;

    //going backward
    if (key === "BACKSPACE" || key === "DELETE") {
      //shifting focus
      const nearestInputId = "input" + this._highestInputIndex;
      const nearestInput = document.getElementById(nearestInputId) as HTMLInputElement;
      nearestInput.focus();
      event.preventDefault();
    }
  }
}
