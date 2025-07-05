import {describe, expect, it, test} from 'vitest';
import {
  calculateKanaErrors,
  calculateKanaExercise,
  calculateRomajiExercise,
} from './utils';

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
      calculateKanaExercise('く', ['あ', 'い', 'う', 'え', 'お']),
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
      calculateRomajiExercise('く', ['あ', 'い', 'う', 'え', 'お']),
    ).toThrowError();
  });
});

describe('calculateKanaErrors', () => {
  it('should return empty array if no result provided', () => {
    const errors = calculateKanaErrors([]);

    expect(errors).toHaveLength(0);
  });

  it('should array with 2 error', () => {
    const errors = calculateKanaErrors([
      {
        elapsedTime: 10,
        failedAttempts: 4,
        successStrikePercentage: 0,
        items: [
          {
            completed: true,
            failedAttempts: 2,
            item: 'あ',
          },
          {
            completed: true,
            failedAttempts: 2,
            item: 'い',
          },
          {
            completed: true,
            failedAttempts: 0,
            item: 'う',
          },
        ],
      },
      {
        elapsedTime: 10,
        failedAttempts: 4,
        successStrikePercentage: 0,
        items: [
          {
            completed: true,
            failedAttempts: 2,
            item: 'あ',
          },
          {
            completed: true,
            failedAttempts: 0,
            item: 'い',
          },
          {
            completed: true,
            failedAttempts: 0,
            item: 'う',
          },
        ],
      },
    ]);

    expect(errors).toHaveLength(3);

    expect(errors[0]).toStrictEqual({
      kana: 'あ',
      romaji: 'a',
      errors: 4,
    });

    expect(errors[1]).toStrictEqual({
      kana: 'い',
      romaji: 'i',
      errors: 2,
    });

    expect(errors[2]).toStrictEqual({
      kana: 'う',
      romaji: 'u',
      errors: 0,
    });
  });
});
