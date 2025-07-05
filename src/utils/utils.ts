import {ALL_KANA, AllKana} from './kana';

type Entries<T> = {[K in keyof T]: [K, T[K]]}[keyof T];

export function ObjectEntries<T extends object>(t: T): Entries<T>[] {
  return Object.entries(t) as any;
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return [minutes, remainingSeconds]
    .map((v) => ('' + v).padStart(2, '0'))
    .join(':');
}

function isTupla<T>(arr: T[]): arr is [T, T, T, T] {
  return arr.length === 4;
}

export type Exercise = {
  kana: AllKana;
  answers: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
};

export function calculateKanaExercise(
  kana: AllKana,
  availableKanas: AllKana[],
): Exercise {
  if (availableKanas.includes(kana) === false) {
    throw new Error('Kana is not included in AvailableKanas');
  }

  const correctAnswer = ALL_KANA[kana];

  const wrongAnswers = availableKanas
    // Not this kana but also not the same romaji
    .filter((k) => k !== kana && ALL_KANA[k] !== ALL_KANA[kana])
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

export type RomajiExercise = {
  romaji: string;
  answers: [AllKana, AllKana, AllKana, AllKana];
  correct: 0 | 1 | 2 | 3;
};

export function calculateRomajiExercise(
  kana: AllKana,
  availableKanas: AllKana[],
): RomajiExercise {
  if (availableKanas.includes(kana) === false) {
    throw new Error('Kana is not included in AvailableKanas');
  }

  const correctAnswer = kana;

  const wrongAnswers = availableKanas
    .filter((k) => k !== kana)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

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
    romaji: ALL_KANA[kana],
    answers: allAnswers,
    correct: allAnswers.indexOf(correctAnswer) as 0 | 1 | 2 | 3,
  };
}

export function calculateKanaErrors(
  input: ExerciseResult<AllKana>[],
): {kana: AllKana; romaji: string; errors: number}[] {
  if (input.length === 0) {
    return [];
  }

  return ObjectEntries(ALL_KANA)
    .map(([kana, romaji]) => ({
      kana: kana,
      romaji: romaji,
    }))
    .filter(({kana}) => input[0].items.some((item) => item.item === kana))
    .map((result) => ({
      ...result,
      errors: input.reduce(
        (acc, res) =>
          acc +
          res.items
            .filter((item) => item.item === result.kana)
            .reduce((acc, item) => acc + item.failedAttempts, 0),
        0,
      ),
    }));
}
