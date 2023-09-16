export default class HandleButtonKeydown {
    constructor(max) {
        this._highestInputIndex = max;
    }
    handleEvent(event) {
        const key = event.key.toUpperCase();
        const target = event.target;
        if (key === "BACKSPACE" || key === "DELETE") {
            const nearestInputId = "input" + this._highestInputIndex;
            const nearestInput = document.getElementById(nearestInputId);
            nearestInput.focus();
            event.preventDefault();
        }
    }
}
