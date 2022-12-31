import {AllKana, ALL_KANA} from './kana';

type Entries<T> = {[K in keyof T]: [K, T[K]]}[keyof T];

export function ObjectEntries<T extends object>(t: T): Entries<T>[] {
  return Object.entries(t) as any;
}

export type Exercise = {
  kana: AllKana;
  answers: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
};

export function calculateKanaExercise(
  kana: AllKana,
  availableKanas: AllKana[]
): Exercise {
  if (availableKanas.includes(kana) === false) {
    throw new Error('Kana is not included in AvailableKanas');
  }

  function isTupla(arr: string[]): arr is [string, string, string, string] {
    return arr.length === 4;
  }

  const correctAnswer = ALL_KANA[kana];

  const wrongAnswers = availableKanas
    .filter((k) => k !== kana)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((wrongKana) => ALL_KANA[wrongKana]);

  const allAnswers = [
    wrongAnswers[0],
    wrongAnswers[1],
    wrongAnswers[2],
    correctAnswer,
  ].sort(() => 0.5 - Math.random());

  if (!isTupla(allAnswers)) {
    throw new Error('Invalid answers');
  }

  return {
    kana: kana,
    answers: allAnswers,
    correct: allAnswers.indexOf(correctAnswer) as 0 | 1 | 2 | 3,
  };
}
