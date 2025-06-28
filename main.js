import GameLogic from './src/GameLogic.js';
import GameSound from './src/GameSound.js';
import { OutputMsg, HandleInput } from './src/GameUI.js';

const gameSound = new GameSound();
const outputMsg = new OutputMsg();
const handleInput = new HandleInput(outputMsg, gameSound);
const gameLogic = new GameLogic(handleInput, outputMsg, gameSound);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.name-form');
  const muteBtn = document.querySelector('#muteBtn');
  const soundImg = document.querySelector('.sound-img');

  const cells = document.querySelectorAll('.cells');

  const cellsArray = Array.from(cells);

  muteBtn.addEventListener('click', () => {
    if (muteBtn.classList.contains('sound-on')) {
      gameSound.muteSounds();
      soundImg.src = './src/assets/music-note-off.svg';
      soundImg.alt = 'sound off';
      muteBtn.classList.remove('sound-on');
      muteBtn.classList.add('sound-off');
    } else {
      gameSound.unMuteSounds();
      soundImg.src = './src/assets/music-note.svg';
      soundImg.alt = 'sound on';
      muteBtn.classList.remove('sound-off');
      muteBtn.classList.add('sound-on');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    handleInput.submitHandler();
  });

  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      gameLogic.turnGame(e, cellsArray);
    });
  });

  document.querySelector('#resetGameBtn').addEventListener('click', () => {
    gameLogic.resetLogin();
  });
  document.querySelector('#playAgainGameBtn').addEventListener('click', () => {
    gameLogic.playAgainLogic();
  });
});
