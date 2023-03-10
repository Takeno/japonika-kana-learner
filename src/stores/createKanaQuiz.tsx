import {createStore} from 'solid-js/store';
import {AllKana} from '../utils/kana';

type KanaQuizGameState = 'start' | 'exercise' | 'summary';

type KanaQuizConfig = {
  exerciseTypes: KanaQuizExerciseType[];
};

type KanaQuizStore = {
  state: KanaQuizGameState;
  kanas: AllKana[];
  exerciseTypes: KanaQuizExerciseType[];
  currentExercise: number;
  results: ExerciseResult<AllKana>[];
};

export default function createKanaQuiz() {
  const [store, setStore] = createStore<KanaQuizStore>({
    state: 'start',
    kanas: [],
    exerciseTypes: [],
    currentExercise: 0,
    results: [],
  });

  const startGame = (kanas: AllKana[], config: KanaQuizConfig) => {
    setStore({
      state: 'exercise',
      kanas: kanas,
      exerciseTypes: config.exerciseTypes,
      currentExercise: 0,
    });
  };

  const handleExerciseCompleted = (result: ExerciseResult<AllKana>) => {
    setStore('results', store.currentExercise, result);

    if (store.currentExercise === store.exerciseTypes.length - 1) {
      setStore('state', 'summary');
    } else {
      setStore('currentExercise', (old) => old + 1);
    }
  };

  const currentExerciseType = () => store.exerciseTypes[store.currentExercise];

  return {
    state: () => store.state,
    kanas: () => store.kanas,
    results: () => store.results,
    startGame,
    handleExerciseCompleted,
    currentExerciseType,
  };
}
