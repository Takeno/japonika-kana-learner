import {Component, For} from 'solid-js';
import type {AllKana} from '../../utils/kana';

import KanaGuesser from '../../components/KanaGuesser';
import {calculateKanaExercise} from '../../utils/utils';

type KanaQuizPhaseOneProps = {
  kanas: AllKana[];
};

const KanaQuizPhaseOne: Component<KanaQuizPhaseOneProps> = (props) => {
  const exercises = () =>
    props.kanas.map((kana) => calculateKanaExercise(kana, props.kanas));

  return (
    <div class="container mx-auto">
      <h1>Phase 1</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <For each={exercises()}>
          {(item) => (
            <KanaGuesser
              mainChar={item.kana}
              answers={item.answers}
              correct={item.correct}
              onAnswer={console.log}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default KanaQuizPhaseOne;
