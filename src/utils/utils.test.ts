import {describe, expect, test} from 'vitest';
import {calculateKanaExercise} from './utils';

describe('calculateKanaExercise', () => {
  test('should calculate 4 answers for あ', () => {
    const result = calculateKanaExercise('あ', ['あ', 'い', 'う', 'え', 'お']);

    expect(result.kana).toBe('あ');
    expect(result.answers).toBeInstanceOf(Array);
    expect(result.answers).toHaveLength(4);

    expect(result.answers.filter((el) => el === 'a')).toHaveLength(1);
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
