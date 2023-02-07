import type {Accessor} from 'solid-js';
import type {AllKana} from '../utils/kana';

import {createStore} from 'solid-js/store';

type KanaExerciseInput<T> = {
  kanas: Set<T>;
};

type KanaExercise<T> = {
  startDate: Date;
  results: Accessor<ItemResult<T>[]>;
  allCompleted: Accessor<boolean>;
  setAttempt: (index: number, correct: boolean) => void;
  exerciseResult: Accessor<ExerciseResult<T>>;
};

export default function createKanaExercise<T = AllKana>(
  input: KanaExerciseInput<T>
): KanaExercise<T> {
  const startDate = new Date();

  const exercises = [...input.kanas.values()].sort(() => 0.5 - Math.random());

  const [results, setResults] = createStore<ItemResult<T>[]>(
    exercises.map((kana) => ({
      item: kana,
      completed: false,
      failedAttempts: 0,
    }))
  );

  const allCompleted = () => results.every((r) => r.completed);

  const setAttempt = (index: number, correct: boolean) => {
    if (results[index].completed === true) {
      return;
    }

    if (correct) {
      setResults(index, 'completed', true);
    } else {
      setResults(index, 'failedAttempts', (old) => old + 1);
    }
  };

  const exerciseResult = (): ExerciseResult<T> => {
    return {
      items: results,
      elapsedTime: Math.round((Date.now() - startDate.getTime()) / 1000),
      failedAttempts: results.reduce(
        (acc, r) => acc + r.failedAttempts + (r.completed ? 0 : 1),
        0
      ),
      successStrikePercentage: Math.round(
        100 *
          (results.filter((r) => r.completed === true && r.failedAttempts === 0)
            .length /
            results.length)
      ),
    };
  };

  return {
    startDate,
    results: () => results,
    allCompleted,
    setAttempt,
    exerciseResult,
  };
}
