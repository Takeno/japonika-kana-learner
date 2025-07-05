import {Component, For, onMount} from 'solid-js';
import createKanaExercise from '../../stores/createKanaExercise';
import {trackEvent} from '../../utils/analytics';
import type {AllKana} from '../../utils/kana';
import {calculateRomajiExercise} from '../../utils/utils';
import KanaGuesser from './components/KanaGuesser';
import Timer from './components/Timer';

type RomajiToKanaProps = KanaQuizExerciseProps<AllKana>;

const RomajiToKana: Component<RomajiToKanaProps> = (props) => {
  const exercise = createKanaExercise({
    kanas: new Set(props.kanas),
  });

  const exercises = () =>
    exercise
      .results()
      .map((item) => calculateRomajiExercise(item.item, props.kanas));

  onMount(async () => {
    trackEvent('RomajiToKana');
  });

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
        <h1 class="text-3xl">Romaji to Kana</h1>

        <span>
          Timer: <Timer startDate={exercise.startDate} />
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <For each={exercises()}>
          {(item, index) => (
            <KanaGuesser
              mainChar={item.romaji}
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

export default RomajiToKana;
