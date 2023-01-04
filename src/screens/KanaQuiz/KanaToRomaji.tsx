import {Component, createEffect, createMemo, For} from 'solid-js';
import type {AllKana} from '../../utils/kana';

import KanaGuesser from '../../components/KanaGuesser';
import {calculateKanaExercise} from '../../utils/utils';
import usePhaseOne from '../../stores/usePhaseOne';
import Timer from '../../components/Timer';

type KanaToRomajiProps = {
  kanas: AllKana[];
  onExerciseCompleted: (result: ExerciseResult) => void;
};

const KanaToRomaji: Component<KanaToRomajiProps> = (props) => {
  const game = createMemo(() => usePhaseOne(props.kanas.length));

  const exercises = () =>
    props.kanas.map((kana) => calculateKanaExercise(kana, props.kanas));

  function handleFinish() {
    if (!game().allCompleted()) {
      return;
    }

    const result: ExerciseResult = {
      elapsedTime: Math.round((Date.now() - game().startDate.getTime()) / 1000),
      failedAttempts: game().results.reduce(
        (acc, r) => acc + r.attempts - 1,
        0
      ),
      successStrikePercentage: Math.round(
        100 *
          (game().results.filter((r) => r.attempts === 1).length /
            game().results.length)
      ),
    };

    props.onExerciseCompleted(result);
  }

  return (
    <div class="container mx-auto">
      <div class="sm:flex flex-row justify-between items-baseline">
        <h1 class="text-3xl">Kana to Romaji</h1>

        <span>
          Timer: <Timer startDate={game().startDate} />
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <For each={exercises()}>
          {(item, index) => (
            <KanaGuesser
              mainChar={item.kana}
              answers={item.answers}
              correct={item.correct}
              onAnswer={(_, correct) =>
                correct
                  ? game().setExerciseCompleted(index())
                  : game().setExerciseFail(index())
              }
            />
          )}
        </For>
      </div>

      <div class="text-center">
        <button
          class="border-2 px-4 py-2 rounded-xl uppercase"
          disabled={!game().allCompleted()}
          onClick={handleFinish}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KanaToRomaji;
