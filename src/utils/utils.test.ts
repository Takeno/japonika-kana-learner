import {describe, expect, test} from 'vitest';
import {calculateKanaExercise, calculateRomajiExercise} from './utils';

describe('calculateKanaExercise', () => {
  test('should calculate 4 answers for あ', () => {
    const result = calculateKanaExercise('あ', ['あ', 'い', 'う', 'え']);

    expect(result.kana).toBe('あ');
    expect(result.answers).toBeInstanceOf(Array);
    expect(result.answers).toHaveLength(4);

    expect(result.answers).toContain('a');
    expect(result.answers).toContain('i');
    expect(result.answers).toContain('u');
    expect(result.answers).toContain('e');
  });
  test('should calculate 4 answers for く', () => {
    const result = calculateKanaExercise('く', [
      'あ',
      'い',
      'う',
      'え',
      'お',
      'か',
      'き',
      'く',
      'け',
      'き',
    ]);

    expect(result.kana).toBe('く');
    expect(result.answers).toBeInstanceOf(Array);
    expect(result.answers).toHaveLength(4);

    expect(result.answers.filter((el) => el === 'ku')).toHaveLength(1);
  });

  test('should throw an error for unmatching kana', () => {
    expect(() =>
      calculateKanaExercise('く', ['あ', 'い', 'う', 'え', 'お'])
    ).toThrowError();
  });
});

describe('calculateRomajiExercise', () => {
  test('should calculate 4 answers for あ', () => {
    const result = calculateRomajiExercise('あ', ['あ', 'い', 'う', 'え']);

    expect(result.romaji).toBe('a');
    expect(result.answers).toBeInstanceOf(Array);
    expect(result.answers).toHaveLength(4);

    expect(result.answers).toContain('あ');
    expect(result.answers).toContain('い');
    expect(result.answers).toContain('う');
    expect(result.answers).toContain('え');
  });
  test('should calculate 4 answers for く', () => {
    const result = calculateRomajiExercise('く', [
      'あ',
      'い',
      'う',
      'え',
      'お',
      'か',
      'き',
      'く',
      'け',
      'き',
    ]);

    expect(result.romaji).toBe('ku');
    expect(result.answers).toBeInstanceOf(Array);
    expect(result.answers).toHaveLength(4);

    expect(result.answers).toContain('く');
  });

  test('should throw an error for unmatching kana', () => {
    expect(() =>
      calculateRomajiExercise('く', ['あ', 'い', 'う', 'え', 'お'])
    ).toThrowError();
  });
});
