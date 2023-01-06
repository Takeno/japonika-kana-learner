import {
  Component,
  createEffect,
  createMemo,
  JSX,
  Match,
  on,
  splitProps,
  Switch,
} from 'solid-js';
import createKanaQuiz from '../stores/createKanaQuiz';
import {AllKana} from '../utils/kana';
import KanaFreeText from './KanaQuiz/KanaFreeText';
import KanaToRomaji from './KanaQuiz/KanaToRomaji';
import RomajiToKana from './KanaQuiz/RomajiToKana';
import KanaQuizStart from './KanaQuiz/Start';
import Summary from './KanaQuiz/Summary';

const EXERCISE_TYPES: {
  [k in KanaQuizExerciseType]: Component<KanaQuizExerciseProps<AllKana>>;
} = {
  kana2romaji: KanaToRomaji,
  romaji2kana: RomajiToKana,
  'kana-free-text': KanaFreeText,
};

const KanaQuiz: Component = () => {
  const game = createKanaQuiz();

  createEffect(
    on(game.currentExerciseType, () => {
      window.scrollTo({
        top: 0,
      });
    })
  );

  return (
    <>
      <div class="w-full py-4 bg-slate-600 mb-6">
        <h1 class="text-3xl text-center font-bold text-white">Kana Quiz</h1>
      </div>
      <div class="max-w-3xl mx-auto px-4 md:px-0">
        <Switch fallback={<p>ERROR</p>}>
          <Match when={game.state() === 'start'}>
            <KanaQuizStart onStart={game.startGame} />
          </Match>
          <Match when={game.state() === 'exercise'}>
            <DynamicComponent
              component={EXERCISE_TYPES[game.currentExerciseType()]}
              kanas={game.kanas()}
              onExerciseCompleted={game.handleExerciseCompleted}
            />
          </Match>
          <Match when={game.state() === 'summary'}>
            <Summary kanas={game.kanas()} results={game.results()} />
          </Match>
        </Switch>
      </div>
    </>
  );
};

type DynamicComponentProps<T> = {
  component: Component<T>;
} & T;

function DynamicComponent<T extends {}>(
  props: DynamicComponentProps<T>
): JSX.Element {
  const [local, rest] = splitProps(props, ['component']);

  const ret = createMemo(() => {
    return <local.component {...(rest as unknown as T)} />;
  });

  return <>{ret()}</>;
}

export default KanaQuiz;
