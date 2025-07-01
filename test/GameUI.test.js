import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GameUI, OutputMsg, HandleInput } from '../src/GameUI.js';
import GameSound from '../src/GameSound.js';

let gameUI,
  outputMsg,
  handleInput,
  gameSound = null;

beforeEach(() => {
  document.body.innerHTML = `
    <button id="muteBtn" class="sound-on"></button>
    <p id="liveFeedback"></p>
    <div class="form-container">
      <form class="name-form">
        <input type="text" id="playerOne" minlength="3" required placeholder="Enter name" />
        <input type="text" id="playerTwo" minlength="3" required placeholder="Enter name" />
        <button id="submitBtn" type="submit">Submit</button>
      </form>
    </div>
    <div class="game-board">
      ${Array(9).fill('<button class="cells"></button>').join('')}
    </div>
    <div class="result-container hidden">
      <div class="game-over-box"><p class="game-over">GAME OVER</p></div>
      <div class="result-msgs">
        <p id="winMatch"></p>
        <p id="loseMatch"></p>
      </div>
      <div class="result-btns">
        <button id="resetGameBtn">Restart</button>
        <button id="playAgainGameBtn">Play again</button>
      </div>
    </div>
  `;

  gameUI = new GameUI();
  gameSound = new GameSound();
  outputMsg = new OutputMsg();
  handleInput = new HandleInput(outputMsg, gameSound);
});

describe('GameUI.js', () => {
  describe('GameUI class', () => {
    it('should return truthy for all GameUI DOM elements', () => {
      [
        'liveFeedback',
        'winMatch',
        'loseMatch',
        'resetGameBtn',
        'playAgainGameBtn',
        'playerOne',
        'playerTwo',
        'formContainer',
        'resultContainer',
        'submitBtn',
      ].forEach((key) => {
        expect(gameUI[key]).toBeInstanceOf(HTMLElement);
      });
    });
  });

  describe('OutputMsg methods', () => {
    it('should update turn feedback', () => {
      outputMsg.liveMsg('Umar');
      expect(gameUI.liveFeedback.textContent).toBe("Umar's turn");
    });

    it('should show winner and loser message', () => {
      outputMsg.resultMsg('Umar', 'Sagar');
      expect(gameUI.winMatch.textContent).toBe('Umar win the match 🎉');
      expect(gameUI.loseMatch.textContent).toBe(
        'Sagar, better luck next time 🤞'
      );
    });

    it('should show draw message', () => {
      outputMsg.drawMsg();
      expect(gameUI.winMatch.textContent).toBe("It's a Draw");
      expect(gameUI.loseMatch.textContent).toBe('🤝');
    });

    it('should clear all feedback messages', () => {
      gameUI.liveFeedback.textContent = 'some text';
      gameUI.winMatch.textContent = 'some text';
      gameUI.loseMatch.textContent = 'some text';
      outputMsg.clearMsg();
      expect(gameUI.liveFeedback.textContent).toBe('');
      expect(gameUI.winMatch.textContent).toBe('');
      expect(gameUI.loseMatch.textContent).toBe('');
    });
  });

  describe('HandleInput methods', () => {
    it('should alert if players names are missing', () => {
      gameUI.playerOne.value = '';
      gameUI.playerTwo.value = ' ';
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      handleInput.submitHandler();
      expect(alertSpy).toHaveBeenCalledWith('Please enter name of both player');
      alertSpy.mockRestore();
    });

    it('should work if players names are provided', () => {
      const playAudioSpy = vi
        .spyOn(gameSound, 'playGameStartAudio')
        .mockImplementation(() => {});
      const liveMsgSpy = vi.spyOn(outputMsg, 'liveMsg');

      gameUI.playerOne.value = 'Umar';
      gameUI.playerTwo.value = 'Sagar';

      handleInput.submitHandler();

      expect(playAudioSpy).toHaveBeenCalled();
      expect(handleInput.playerOneName).toBe('Umar');
      expect(handleInput.playerTwoName).toBe('Sagar');
      expect(gameUI.formContainer.classList.contains('hidden')).toBe(true);
      expect(liveMsgSpy).toHaveBeenCalledWith('Umar');

      playAudioSpy.mockRestore();
    });

    it('should clear players name if clearInput() runs', () => {
      gameUI.playerOne.value = 'some name';
      gameUI.playerTwo.value = 'some name';
      handleInput.playerOneName = 'some name';
      handleInput.playerTwoName = 'some name';

      handleInput.clearInput();

      expect(gameUI.playerOne.value).toBe('');
      expect(gameUI.playerTwo.value).toBe('');
      expect(handleInput.playerOneName).toBe('');
      expect(handleInput.playerTwoName).toBe('');
    });
  });
});
