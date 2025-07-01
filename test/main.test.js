import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/GameLogic.js', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      turnGame: vi.fn(),
      checkWin: vi.fn(),
      resetLogin: vi.fn(),
      playAgainLogic: vi.fn(),
    })),
  };
});

vi.mock('../src/GameUI.js', () => {
  return {
    GameUI: vi.fn().mockImplementation(() => ({})),
    OutputMsg: vi.fn().mockImplementation(() => ({
      liveMsg: vi.fn(),
      resultMsg: vi.fn(),
      drawMsg: vi.fn(),
      clearMsg: vi.fn(),
    })),
    HandleInput: vi.fn().mockImplementation(() => ({
      submitHandler: vi.fn(),
      clearInput: vi.fn(),
    })),
  };
});

vi.mock('../src/GameSound.js', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      muteSounds: vi.fn(),
      unMuteSounds: vi.fn(),
      playGameStartAudio: vi.fn(),
    })),
  };
});

let GameSound,
  HandleInput,
  OutputMsg,
  GameLogic = null;

beforeEach(async () => {
  document.body.innerHTML = `
   <form class="name-form"></form>
    <button id="muteBtn" class="sound-on">
      <img class="sound-img" src="./src/assets/music-note.svg" alt="sound on"/>
    </button>
    <button id="resetGameBtn"></button>
    <button id="playAgainGameBtn"></button>
     <button class="cells"></button>
      <button class="cells"></button>
      <button class="cells"></button>
      
`;
  GameSound = (await import('../src/GameSound.js')).default;
  const GameUIBundle = await import('../src/GameUI.js');
  HandleInput = GameUIBundle.HandleInput;
  OutputMsg = GameUIBundle.OutputMsg;
  GameLogic = (await import('../src/GameLogic.js')).default;

  await import('../main.js');

  document.dispatchEvent(new Event('DOMContentLoaded'));
});

describe('main.js', () => {
  describe('Class Instantiations', () => {
    it('should instantiate HandleInput, OutputMsg, GameLogic', () => {
      expect(HandleInput).toHaveBeenCalledTimes(1);
      expect(OutputMsg).toHaveBeenCalledTimes(1);
      expect(GameLogic).toHaveBeenCalledTimes(1);
      expect(GameSound).toHaveBeenCalledTimes(1);
    });
  });

  describe('User events: form submission, sound toggle, and cell clicks', () => {
    it('should call submitHandler when the form is submitted', () => {
      const form = document.querySelector('.name-form');
      const event = new Event('submit');
      event.preventDefault = vi.fn();

      form.dispatchEvent(event);

      const { submitHandler } = HandleInput.mock.results[0].value;

      expect(submitHandler).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should turn off sound and update icon when mute button is clicked', () => {
      const muteBtn = document.querySelector('#muteBtn');
      const soundImg = document.querySelector('.sound-img');

      const { muteSounds } = GameSound.mock.results[0].value;

      muteBtn.click();
      expect(muteSounds).toHaveBeenCalled();
      expect(soundImg.src).toContain('music-note-off.svg');
      expect(soundImg.alt).toBe('sound off');
      expect(muteBtn.classList.contains('sound-off')).toBe(true);
      expect(muteBtn.classList.contains('sound-on')).toBe(false);
    });

    it('should turn on sound and restore icon on second mute button click', () => {
      const muteBtn = document.querySelector('#muteBtn');
      const soundImg = document.querySelector('.sound-img');

      const gameSoundInstance = GameSound.mock.results[0].value;

      
      muteBtn.click(); // first click to mute
     
      muteBtn.click();  //second click to unmute

      expect(gameSoundInstance.unMuteSounds).toHaveBeenCalled();
      expect(soundImg.src).toMatch(/music-note.svg/i);
      expect(soundImg.alt).toBe('sound on');
      expect(muteBtn.classList.contains('sound-on')).toBe(true);
      expect(muteBtn.classList.contains('sound-off')).toBe(false);
    });

    it('should call turnGame with event and cell array when any cell is clicked', () => {
      const cells = document.querySelectorAll('.cells');
      const { turnGame } = GameLogic.mock.results[0].value;
      const cellToClick = cells[1];

      const clickEvent = new MouseEvent('click', { bubbles: true });
      cellToClick.dispatchEvent(clickEvent);

      expect(turnGame).toHaveBeenCalledTimes(1);
      expect(turnGame).toHaveBeenCalledWith(clickEvent, Array.from(cells));
    });
  });

  describe('Game reset and replay buttons', () => {
    it('should call resetLogin when the "Reset Game" button is clicked', () => {
      const resetGameBtn = document.querySelector('#resetGameBtn');

      const { resetLogin } = GameLogic.mock.results[0].value;

      const clickEvent = new MouseEvent('click', { bubbles: true });

      resetGameBtn.dispatchEvent(clickEvent);

      expect(resetLogin).toHaveBeenCalled();
      expect(resetLogin).toHaveBeenCalledTimes(1);
    });

    it('should call playAgainLogic when the "Play Again" button is clicked', () => {
      const playAgainGameBtn = document.querySelector('#playAgainGameBtn');
      const { playAgainLogic } = GameLogic.mock.results[0].value;

      const clickEvent = new MouseEvent('click', { bubbles: true });

      playAgainGameBtn.dispatchEvent(clickEvent);

      expect(playAgainLogic).toHaveBeenCalled();
      expect(playAgainLogic).toHaveBeenCalledTimes(1);
    });
  });
});
