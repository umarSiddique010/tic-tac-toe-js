import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import GameSound from '../src/GameSound.js';

let gameSound = null;

let sounds = null;

beforeEach(() => {
  gameSound = new GameSound();

  sounds = [
    'clickXAudio',
    'clickOAudio',
    'gameStartAudio',
    'gameOverAudio',
    'playAgainAudio',
    'gameRestartAudio',
  ];
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('GameSound.js', () => {
  describe('Constructor & Initialization', () => {
    it('should initialize all Audio elements', () => {
      const softSoundsSpy = vi.spyOn(GameSound.prototype, 'softSounds');
      new GameSound();

      sounds.forEach((key) => {
        expect(gameSound[key]).toBeInstanceOf(Audio);
      });

      expect(softSoundsSpy).toHaveBeenCalled();
    });
  });

  describe('Sound playback methods', () => {
    it('should play click sound for player X', () => {
      const spyClickX = vi
        .spyOn(gameSound.clickXAudio, 'play')
        .mockImplementation(() => {});

      gameSound.playClickXAudio();

      expect(spyClickX).toHaveBeenCalled();
    });

    it('should play click sound for player O', () => {
      const spyClickO = vi
        .spyOn(gameSound.clickOAudio, 'play')
        .mockImplementation(() => {});

      gameSound.playClickOAudio();

      expect(spyClickO).toHaveBeenCalled();
    });

    it('should play game start sound', () => {
      const spyStartSound = vi
        .spyOn(gameSound.gameStartAudio, 'play')
        .mockImplementation(() => {});

      gameSound.playGameStartAudio();

      expect(spyStartSound).toHaveBeenCalled();
    });

    it('should play game over sound', () => {
      const spyOverSound = vi
        .spyOn(gameSound.gameOverAudio, 'play')
        .mockImplementation(() => {});

      gameSound.playGameOverAudio();

      expect(spyOverSound).toHaveBeenCalled();
    });

    it('should play "play again" sound', () => {
      const spyPlayAgain = vi
        .spyOn(gameSound.playAgainAudio, 'play')
        .mockImplementation(() => {});

      gameSound.playPlayAgainAudio();

      expect(spyPlayAgain).toHaveBeenCalled();
    });

    it('should play game restart sound', () => {
      const spyRestart = vi
        .spyOn(gameSound.gameRestartAudio, 'play')
        .mockImplementation(() => {});

      gameSound.PlayGameRestartAudio();

      expect(spyRestart).toHaveBeenCalled();
    });
  });

  describe('Sound control utilities', () => {
    it('should mute all the audio elements', () => {
      gameSound.muteSounds();

      sounds.forEach((key) => {
        expect(gameSound[key].muted).toBe(true);
      });
    });

    it('should unmute all the audio elements', () => {
      gameSound.unMuteSounds();

      sounds.forEach((key) => {
        expect(gameSound[key].muted).toBe(false);
      });
    });

    it('should set correct volume levels for all sounds', () => {
      gameSound.softSounds();

      expect(gameSound.clickXAudio.volume).toBeCloseTo(0.15);
      expect(gameSound.clickOAudio.volume).toBeCloseTo(0.15);
      expect(gameSound.gameStartAudio.volume).toBeCloseTo(0.03);
      expect(gameSound.gameOverAudio.volume).toBeCloseTo(0.1);
      expect(gameSound.playAgainAudio.volume).toBeCloseTo(0.04);
      expect(gameSound.gameRestartAudio.volume).toBeCloseTo(0.03);
    });
  });
});
