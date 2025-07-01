import { beforeEach, describe, expect, it, vi } from 'vitest';
import GameLogic from '../src/GameLogic.js';

let gameLogic,
  handleInput,
  outputMsg,
  gameSound,
  cells,
  cellsArray = null;

beforeEach(async () => {
  document.body.innerHTML = `
        ${Array(9).fill('<button class="cells"></button>').join('')}
          <div class="result-container hidden"></div>
    `;

  const gameUI = {
    resultContainer: document.querySelector('.result-container'),
  };
  GameLogic.prototype.gameUI = gameUI;

  outputMsg = {
    liveMsg: vi.fn(),
    resultMsg: vi.fn(),
    drawMsg: vi.fn(),
    clearMsg: vi.fn(),
  };

  handleInput = {
    playerOneName: 'Umar',
    playerTwoName: 'Sagar',
    submitHandler: vi.fn(),
    clearInput: vi.fn(),
    formContainer: document.createElement('div'),
  };

  gameSound = {
    playClickXAudio: vi.fn(),
    playClickOAudio: vi.fn(),
    playGameStartAudio: vi.fn(),
    playGameOverAudio: vi.fn(),
    playPlayAgainAudio: vi.fn(),
    PlayGameRestartAudio: vi.fn(),
    muteSounds: vi.fn(),
    unMuteSounds: vi.fn(),
    softSounds: vi.fn(),
  };

  gameLogic = new GameLogic(handleInput, outputMsg, gameSound);
  cells = document.querySelectorAll('.cells');
  cellsArray = Array.from(cells);
});

describe('GameLogic.js', () => {
  describe('turnGame behavior', () => {
    it('should add x on valid cell click and switches turn to O', () => {
      const firstCell = cells[0];
      const clickEvent = new MouseEvent('click', { button: true });

      firstCell.dispatchEvent(clickEvent);
      const spyWin = vi.spyOn(gameLogic, 'checkWin');

      gameLogic.turnGame({ target: firstCell }, cellsArray);

      expect(firstCell.disabled).toBe(true);
      expect(firstCell.getAttribute('aria-label')).toBe('x');
      expect(gameSound.playClickXAudio).toHaveBeenCalled();
      expect(spyWin).toHaveBeenCalledWith('x');
      expect(gameLogic.playerXcombination).toContain(0);
      expect(gameLogic.turnX).toBe(false);
      expect(gameLogic.turnO).toBe(true);
      expect(gameLogic.outputMsg.liveMsg).toHaveBeenCalledWith(
        handleInput.playerTwoName
      );
    });

    it('should ignore click when clicking on already marked cell', () => {
      const cell = document.querySelector('.cells');

      cell.classList.add('x');
      gameLogic.turnGame({ target: cell }, cellsArray);
      expect(gameLogic.playerXcombination.length).toBe(0);
    });
  });

  describe('checkWin behavior', () => {
    it('should draw the game when board is full without winner', () => {
      const drawPattern = ['x', 'o', 'x', 'o', 'x', 'o', 'o', 'x'];

      drawPattern.forEach((mark, i) => {
        cells[i].classList.add(mark);
        cells[i].setAttribute('aria-label', mark);
        cells[i].setAttribute('disabled', true);

        if (mark === 'x') {
          gameLogic.playerXcombination.push(i);
        } else {
          gameLogic.playerOcombination.push(i);
        }
      });

      const lastCell = cells[drawPattern.length];
      gameLogic.turnGame({ target: lastCell }, cellsArray);

      expect(gameLogic.outputMsg.drawMsg).toHaveBeenCalled();
      expect(
        gameLogic.gameUI.resultContainer.classList.contains('hidden')
      ).toBe(false);
      expect(gameLogic.gameSound.playGameOverAudio).toHaveBeenCalled();
      expect(gameLogic.playGame).toBe(false);
    });

    it('should win the game by x', () => {
      const winningPattern = ['x', 'o', 'x', 'o', 'x', 'o'];

      winningPattern.forEach((mark, i) => {
        cells[i].classList.add(mark);
        cells[i].setAttribute('aria-label', mark);
        cells[i].setAttribute('disabled', true);

        if (mark === 'x') {
          gameLogic.playerXcombination.push(i);
        } else {
          gameLogic.playerOcombination.push(i);
        }
      });

      const nextCell = cells[winningPattern.length];

      gameLogic.turnGame({ target: nextCell }, cellsArray);

      expect(gameLogic.outputMsg.resultMsg).toHaveBeenCalledWith(
        handleInput.playerOneName,
        handleInput.playerTwoName
      );

      expect(
        gameLogic.gameUI.resultContainer.classList.contains('hidden')
      ).toBe(false);

      expect(gameLogic.gameSound.playGameOverAudio).toHaveBeenCalled();
      expect(gameLogic.playGame).toBe(false);
    });
  });

  describe('Reset and Play again game', () => {
    it('should reset everything to fresh when resetLogin call', () => {
      cells[0].classList.add('x');
      cells[0].setAttribute('disabled', true);
      cells[0].setAttribute('aria-label', 'x');
      gameLogic.playerXcombination = [0];
      gameLogic.playerOcombination = [1];
      gameLogic.playGame = false;
      gameLogic.turnX = false;
      gameLogic.turnO = true;
      gameLogic.resetLogin();

      expect(gameSound.PlayGameRestartAudio).toHaveBeenCalled();
      expect(gameLogic.playGame).toBe(true);
      expect(gameLogic.turnX).toBe(true);
      expect(gameLogic.turnO).toBe(false);
      expect(gameLogic.playerXcombination).toEqual([]);
      expect(gameLogic.playerOcombination).toEqual([]);
      cells.forEach((cell) => {
        expect(cell.classList.contains('x', 'o')).toBe(false);
        expect(cell.hasAttribute('disabled')).toBe(false);
        expect(cell.hasAttribute('aria-label')).toBe(false);
      });
      expect(outputMsg.clearMsg).toHaveBeenCalled();
      expect(handleInput.clearInput).toHaveBeenCalled();
      expect(handleInput.formContainer.classList.contains('hidden')).toBe(
        false
      );
      expect(
        gameLogic.gameUI.resultContainer.classList.contains('hidden')
      ).toBe(true);
    });

    it('should reset game board and state when playAgainLogic is called', () => {
      cells[0].classList.add('x');
      cells[0].setAttribute('disabled', true);
      cells[0].setAttribute('aria-label', 'x');
      gameLogic.playerXcombination = [0];
      gameLogic.playerOcombination = [1];
      gameLogic.playGame = false;
      gameLogic.turnX = false;
      gameLogic.turnO = true;

      gameLogic.playAgainLogic();

      expect(gameSound.playPlayAgainAudio).toHaveBeenCalled();
      expect(gameLogic.playGame).toBe(true);
      expect(gameLogic.turnX).toBe(true);
      expect(gameLogic.turnO).toBe(false);
      expect(gameLogic.playerXcombination).toEqual([]);
      expect(gameLogic.playerOcombination).toEqual([]);
      cells.forEach((cell) => {
        expect(cell.classList.contains('x', 'o')).toBe(false);
        expect(cell.hasAttribute('disabled')).toBe(false);
        expect(cell.hasAttribute('aria-label')).toBe(false);
      });
      expect(
        gameLogic.gameUI.resultContainer.classList.contains('hidden')
      ).toBe(true);
    });
  });
});
