import {describe, expect, test} from 'vitest';
import usePhaseOne from './usePhaseOne';

describe('usePhaseOne', () => {
  test('initialization', () => {
    const game = usePhaseOne(4);

    expect(game.startDate).toBeInstanceOf(Date);
    expect(game.results).toHaveLength(4);
    expect(game.results[0]).toStrictEqual({completed: false, attempts: 0});
    expect(game.results[1]).toStrictEqual({completed: false, attempts: 0});
    expect(game.results[2]).toStrictEqual({completed: false, attempts: 0});
    expect(game.results[3]).toStrictEqual({completed: false, attempts: 0});
    expect(game.allCompleted()).toBe(false);
  });

  test('exercise 1 completed', () => {
    const game = usePhaseOne(4);

    game.setExerciseCompleted(0);
    expect(game.results).toHaveLength(4);
    expect(game.results[0]).toStrictEqual({completed: true, attempts: 1});
    expect(game.results[1]).toStrictEqual({completed: false, attempts: 0});
    expect(game.results[2]).toStrictEqual({completed: false, attempts: 0});
    expect(game.results[3]).toStrictEqual({completed: false, attempts: 0});
    expect(game.allCompleted()).toBe(false);
  });

  test('exercise 1 failed', () => {
    const game = usePhaseOne(4);

    game.setExerciseFail(0);

    expect(game.results).toHaveLength(4);
    expect(game.results[0]).toStrictEqual({completed: false, attempts: 1});
    expect(game.results[1]).toStrictEqual({completed: false, attempts: 0});
    expect(game.results[2]).toStrictEqual({completed: false, attempts: 0});
    expect(game.results[3]).toStrictEqual({completed: false, attempts: 0});
    expect(game.allCompleted()).toBe(false);
  });

  test('exercise 2 completed', () => {
    const game = usePhaseOne(4);

    game.setExerciseCompleted(1);
    expect(game.results).toHaveLength(4);
    expect(game.results[0]).toStrictEqual({completed: false, attempts: 0});
    expect(game.results[1]).toStrictEqual({completed: true, attempts: 1});
    expect(game.results[2]).toStrictEqual({completed: false, attempts: 0});
    expect(game.results[3]).toStrictEqual({completed: false, attempts: 0});
    expect(game.allCompleted()).toBe(false);
  });

  test('all exercises completed', () => {
    const game = usePhaseOne(1);

    game.setExerciseCompleted(0);
    expect(game.results).toHaveLength(1);
    expect(game.results[0]).toStrictEqual({completed: true, attempts: 1});
    expect(game.allCompleted()).toBe(true);
  });
});
