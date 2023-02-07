import {Component, createMemo, For} from 'solid-js';
import type {AllKana} from '../../utils/kana';

import KanaGuesser from './components/KanaGuesser';
import {calculateKanaExercise} from '../../utils/utils';
import Timer from './components/Timer';
import createKanaExercise from '../../stores/createKanaExercise';

type KanaToRomajiProps = KanaQuizExerciseProps<AllKana>;

const KanaToRomaji: Component<KanaToRomajiProps> = (props) => {
  const exercise = createKanaExercise({
    kanas: new Set(props.kanas),
  });

  const exercises = () =>
    exercise
      .results()
      .map((result) => calculateKanaExercise(result.item, props.kanas));

  function handleFinish() {
    if (!exercise.allCompleted()) {
      return;
    }

    const exerciseResult = exercise.exerciseResult();

    props.onExerciseCompleted(exerciseResult);
  }

  return (
    <div class="w-full">
      <div class="sm:flex flex-row justify-between items-baseline">
        <h1 class="text-3xl">Kana to Romaji</h1>

        <span>
          Timer: <Timer startDate={exercise.startDate} />
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <For each={exercises()}>
          {(item, index) => (
            <KanaGuesser
              mainChar={item.kana}
              answers={item.answers}
              correct={item.correct}
              onAnswer={(_, correct) => exercise.setAttempt(index(), correct)}
            />
          )}
        </For>
      </div>

      <div class="text-center">
        <button
          class="border-2 px-4 py-2 rounded-xl uppercase"
          disabled={!exercise.allCompleted()}
          onClick={handleFinish}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KanaToRomaji;
