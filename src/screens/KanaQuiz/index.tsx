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
import createKanaQuiz from '../../stores/createKanaQuiz';
import {AllKana} from '../../utils/kana';
import Footer from './components/Footer';
import Header from './components/Header';
import KanaFreeText from './KanaFreeText';
import KanaToRomaji from './KanaToRomaji';
import RomajiToKana from './RomajiToKana';
import Start from './Start';
import Summary from './Summary';

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
    <main class="min-h-screen flex flex-col">
      <Header />
      <div class=" flex-1 max-w-3xl w-full mx-auto px-4 md:px-0 my-6">
        <Switch fallback={<p>ERROR</p>}>
          <Match when={game.state() === 'start'}>
            <Start onStart={game.startGame} />
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
      <Footer />
    </main>
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
