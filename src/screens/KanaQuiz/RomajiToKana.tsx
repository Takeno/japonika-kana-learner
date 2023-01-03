import {Component, createEffect, createMemo, For} from 'solid-js';
import type {AllKana} from '../../utils/kana';

import KanaGuesser from '../../components/KanaGuesser';
import {calculateRomajiExercise} from '../../utils/utils';
import usePhaseOne from '../../stores/usePhaseOne';
import Timer from '../../components/Timer';

type RomajiToKanaProps = {
  kanas: AllKana[];
  onExerciseCompleted: (result: ExerciseResult) => void;
};

const RomajiToKana: Component<RomajiToKanaProps> = (props) => {
  const game = createMemo(() => usePhaseOne(props.kanas.length));

  const exercises = () =>
    props.kanas.map((kana) => calculateRomajiExercise(kana, props.kanas));

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
    };

    props.onExerciseCompleted(result);
  }

  return (
    <div class="container mx-auto">
      <h1>Phase 2</h1>

      <span>
        Attempts: {game().results.reduce((acc, r) => acc + r.attempts, 0)}
      </span>
      <br />
      <span>
        Timer: <Timer startDate={game().startDate} />
      </span>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <For each={exercises()}>
          {(item, index) => (
            <KanaGuesser
              mainChar={item.romaji}
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

      <button disabled={!game().allCompleted()} onClick={handleFinish}>
        Finish
      </button>
    </div>
  );
};

export default RomajiToKana;