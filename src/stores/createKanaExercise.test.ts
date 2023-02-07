import {describe, expect, test} from 'vitest';
import createKanaExercise from './createKanaExercise';

describe('createKanaExercise', () => {
  test('initialization', () => {
    const game = createKanaExercise({
      kanas: new Set(['あ']),
    });

    expect(game.results()).toHaveLength(1);

    expect(game.results()[0]).toMatchObject({
      item: 'あ',
      completed: false,
      failedAttempts: 0,
    });

    expect(game.allCompleted()).toBe(false);
  });

  test('set correct attempt', () => {
    const game = createKanaExercise({
      kanas: new Set(['あ']),
    });

    game.setAttempt(0, true);

    expect(game.results()[0]).toMatchObject({
      item: 'あ',
      completed: true,
      failedAttempts: 0,
    });

    expect(game.allCompleted()).toBe(true);
  });

  test('set failed attempt', () => {
    const game = createKanaExercise({
      kanas: new Set(['あ']),
    });

    game.setAttempt(0, false);

    expect(game.results()[0]).toMatchObject({
      item: 'あ',
      completed: false,
      failedAttempts: 1,
    });

    expect(game.allCompleted()).toBe(false);
  });

  test('get result 100% perfect', () => {
    const game = createKanaExercise({
      kanas: new Set(['あ', 'い']),
    });

    game.setAttempt(0, true);
    game.setAttempt(1, true);

    expect(game.exerciseResult()).toMatchObject({
      elapsedTime: 0,
      failedAttempts: 0,
      successStrikePercentage: 100,
    });
  });

  test('get result 50% perfect', () => {
    const game = createKanaExercise({
      kanas: new Set(['あ', 'い']),
    });

    game.setAttempt(0, true);
    game.setAttempt(1, false);
    game.setAttempt(1, true);

    expect(game.exerciseResult()).toMatchObject({
      elapsedTime: 0,
      failedAttempts: 1,
      successStrikePercentage: 50,
    });
  });

  test('get result incompleted items', () => {
    const game = createKanaExercise({
      kanas: new Set(['あ', 'い']),
    });

    game.setAttempt(0, true);

    expect(game.exerciseResult()).toMatchObject({
      elapsedTime: 0,
      failedAttempts: 1,
      successStrikePercentage: 50,
    });
  });
});
