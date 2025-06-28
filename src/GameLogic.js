import { GameUI } from './GameUI.js';

export default class GameLogic {
  constructor(handleInput, outputMsg, gameSound) {
    this.outputMsg = outputMsg;
    this.handleInput = handleInput;
    this.gameSound = gameSound;
    this.gameUI = new GameUI();
    this.cells = document.querySelectorAll('.cells');
    this.playGame = true;
    this.turnX = true;
    this.turnO = false;

    this.winningCombinations = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];

    this.playerXcombination = [];
    this.playerOcombination = [];
  }

  turnGame(e, element) {
    const cell = e.target;

    if (
      !this.playGame ||
      !cell.classList.contains('cells') ||
      cell.classList.contains('x') ||
      cell.classList.contains('o')
    ) {
      return;
    }

    const cellIndex = element.indexOf(cell);

    if (this.turnX === true) {
      cell.setAttribute('disabled', true);
      cell.setAttribute('aria-label', 'x');
      this.gameSound.playClickXAudio();
      cell.classList.add('x');
      this.playerXcombination.push(cellIndex);
      this.checkWin('x');
      this.turnX = false;
      this.turnO = true;
      this.outputMsg.liveMsg(this.handleInput.playerTwoName);
    } else {
      cell.setAttribute('disabled', true);
      cell.setAttribute('aria-label', 'o');
      this.gameSound.playClickOAudio();
      cell.classList.add('o');
      this.playerOcombination.push(cellIndex);
      this.checkWin('o');
      this.turnO = false;
      this.turnX = true;
      this.outputMsg.liveMsg(this.handleInput.playerOneName);
    }
  }

  checkWin(player) {
    const currentCombination =
      player === 'x' ? this.playerXcombination : this.playerOcombination;

    if (this.playerXcombination.length + this.playerOcombination.length === 9) {
      this.outputMsg.drawMsg();
      this.gameUI.resultContainer.classList.remove('hidden');
      this.gameSound.playGameOverAudio();
      this.playGame = false;
      return;
    }

    for (const winningCombination of this.winningCombinations) {
      const hasWon = winningCombination.every((number) =>
        currentCombination.includes(number)
      );

      if (hasWon) {
        this.gameUI.resultContainer.classList.remove('hidden');
        this.gameSound.playGameOverAudio();
        if (player === 'x') {
          this.outputMsg.resultMsg(
            this.handleInput.playerOneName,
            this.handleInput.playerTwoName
          );
        } else {
          this.outputMsg.resultMsg(
            this.handleInput.playerTwoName,
            this.handleInput.playerOneName
          );
        }
        this.playGame = false;
        return;
      }
    }
  }

  resetLogin() {
    this.gameSound.PlayGameRestartAudio();
    this.playGame = true;
    this.turnX = true;
    this.turnO = false;
    this.playerXcombination = [];
    this.playerOcombination = [];
    this.cells.forEach((cell) => {
      cell.classList.remove('x', 'o');
      cell.setAttribute('disabled', false);
    });
    this.outputMsg.clearMsg();
    this.handleInput.clearInput();
    this.handleInput.formContainer.classList.remove('hidden');
    this.gameUI.resultContainer.classList.add('hidden');
  }

  playAgainLogic() {
    this.gameSound.playPlayAgainAudio();
    this.playGame = true;
    this.turnX = true;
    this.turnO = false;
    this.playerXcombination = [];
    this.playerOcombination = [];
    this.cells.forEach((cell) => {
      cell.classList.remove('x', 'o');
      cell.setAttribute('disabled', false);
    });
    this.gameUI.resultContainer.classList.add('hidden');
  }
}
