export default class GameSound {
  constructor() {
    this.clickXAudio = new Audio("./src/assets/sounds/click-x.mp3");
    this.clickOAudio = new Audio("./src/assets/sounds/click-o.mp3");
    this.gameStartAudio = new Audio("./src/assets/sounds/game-start.mp3");
    this.gameOverAudio = new Audio("./src/assets/sounds/game-over.mp3");
    this.playAgainAudio = new Audio("./src/assets/sounds/play-again.mp3");
    this.gameRestartAudio = new Audio("./src/assets/sounds/game-restart.mp3");
    this.softSounds();
  }

  playClickXAudio() {
    this.clickXAudio.play();
  }

  playClickOAudio() {
    this.clickOAudio.play();
  }

  playGameStartAudio() {
    this.gameStartAudio.play();
  }

  playGameOverAudio() {
    this.gameOverAudio.play();
  }

  playPlayAgainAudio() {
    this.playAgainAudio.play();
  }

  PlayGameRestartAudio() {
    this.gameRestartAudio.play();
  }

  muteSounds() {
    this.clickXAudio.muted = true;
    this.clickOAudio.muted = true;
    this.gameStartAudio.muted = true;
    this.gameOverAudio.muted = true;
    this.playAgainAudio.muted = true;
    this.gameRestartAudio.muted = true;
  }

  unMuteSounds() {
    this.clickXAudio.muted = false;
    this.clickOAudio.muted = false;
    this.gameStartAudio.muted = false;
    this.gameOverAudio.muted = false;
    this.playAgainAudio.muted = false;
    this.gameRestartAudio.muted = false;
  }

  softSounds() {
    this.clickXAudio.volume = 0.15;
    this.clickOAudio.volume = 0.15;
    this.gameStartAudio.volume = 0.03;
    this.gameOverAudio.volume = 0.1;
    this.playAgainAudio.volume = 0.04;
    this.gameRestartAudio.volume = 0.03;
  }
}
