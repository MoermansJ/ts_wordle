import Game from "./classes/Game.js";
import IGame from "./interfaces/IGame.js";

window.onload = (): void => {
  main();

  // main();
  function main(): void {
    const game: IGame = new Game();
    game.main();
  }

  //custom functions

  //even listeners
};
