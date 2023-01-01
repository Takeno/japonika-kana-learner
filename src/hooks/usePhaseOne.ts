import {createStore} from 'solid-js/store';

type Result = {
  completed: boolean;
  attempts: number;
};

export default function usePhaseOne(numberOfExercises: number) {
  const startDate = new Date();

  const [results, setResults] = createStore<Result[]>(
    new Array(numberOfExercises).fill(0).map(() => ({
      completed: false,
      attempts: 0,
    }))
  );

  const allCompleted = () => results.every((r) => r.completed);

  const setExerciseCompleted = (index: number) => {
    setResults(index, (result) => ({
      completed: true,
      attempts: result.attempts + 1,
    }));
  };

  const setExerciseFail = (index: number) => {
    setResults(index, 'attempts', (v) => v + 1);
  };

  return {
    startDate,
    results,
    allCompleted,
    setExerciseCompleted,
    setExerciseFail,
  };
}
