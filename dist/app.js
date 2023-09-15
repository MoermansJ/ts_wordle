import InputElement from "./InputElement.js";
import UserInputWord from "./userInputWord.js";
window.onload = () => {
    var _a;
    const computerWord = generateRandomWord();
    let userGuessCounter = 0;
    let readyToPlay = false;
    main();
    function main() {
        printTitle(computerWord);
        const inputElements = new InputElement(computerWord).HTMLElement;
        printInputElements(inputElements);
        readyToPlay = true;
    }
    function handleUserSubmit() {
        if (!readyToPlay) {
            return;
        }
        ++userGuessCounter;
        const allInputElements = Array.from(document.getElementsByClassName("letter-input"));
        let userInput = "";
        for (let i = 0; i < allInputElements.length; i++) {
            userInput += allInputElements[i].value;
            allInputElements[i].value = "";
        }
        const userInputWord = new UserInputWord(userGuessCounter, userInput, computerWord);
        printUserInput(userInputWord.HTMLElement);
        const firstInput = document.getElementById("input1");
        firstInput.focus();
    }
    function generateRandomWord() {
        return "joey".toUpperCase();
    }
    function printUserInput(HTML) {
        const userWordHTML = document.getElementById("input-container");
        HTML.forEach((element) => userWordHTML.append(element));
    }
    function printTitle(word) {
        document.getElementById("computer-title").innerText = `Guess the ${word.length}-letter word`;
    }
    function printInputElements(inputElements) {
        const inputContainer = document.getElementById("input-container");
        inputElements.forEach((element) => inputContainer.append(element));
    }
    (_a = document.getElementById("user-submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleUserSubmit);
};
