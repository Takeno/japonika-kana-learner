import {describe, expect, test} from 'vitest';
import createKanaQuiz from './createKanaQuiz';

describe('createKanaQuiz', () => {
  test('main phase is start', () => {
    const game = createKanaQuiz();

    expect(game.state()).toBe('start');
  });

  test('exercise 1 after startGame()', () => {
    const game = createKanaQuiz();

    game.startGame(['あ'], {
      exerciseTypes: ['kana2romaji'],
    });

    expect(game.state()).toBe('exercise');
    expect(game.kanas()).toContain('あ');
    expect(game.currentExerciseType()).toBe('kana2romaji');
  });

  test('exercise 2 after exerciseCompleted()', () => {
    const game = createKanaQuiz();

    game.startGame(['あ'], {
      exerciseTypes: ['kana2romaji', 'romaji2kana'],
    });

    game.handleExerciseCompleted({
      failedAttempts: 0,
      elapsedTime: 10,
    });

    expect(game.state()).toBe('exercise');
    expect(game.kanas()).toContain('あ');
    expect(game.currentExerciseType()).toBe('romaji2kana');
  });

  test('summary after last exerciseCompleted()', () => {
    const game = createKanaQuiz();

    game.startGame(['あ'], {
      exerciseTypes: ['kana2romaji'],
    });

    game.handleExerciseCompleted({
      failedAttempts: 0,
      elapsedTime: 10,
    });

    expect(game.state()).toBe('summary');
  });
});
