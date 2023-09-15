import Game from "./classes/Game.js";
window.onload = () => {
    main();
    function main() {
        const game = new Game();
        game.main();
    }
};
