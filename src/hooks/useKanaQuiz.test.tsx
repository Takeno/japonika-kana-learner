import { describe, expect, test } from 'vitest'
import { fireEvent, render } from 'solid-testing-library'
import useKanaQuiz from './useKanaQuiz';

describe('useKanaQuiz', () => {
  test('main phase is start', () => {
    const game = useKanaQuiz();

    expect(game.state()).toBe('start');
  });

  test('phase-2 after startGame()', () => {
    const game = useKanaQuiz();

    expect(game.state()).toBe('start');
    game.startGame(['あ']);
    expect(game.state()).toBe('phase-1');
    expect(game.kanas()).toContain('あ')
  });
});