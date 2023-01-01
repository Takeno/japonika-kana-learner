import {Component, createEffect, Match, Switch} from 'solid-js';
import useKanaQuiz from '../hooks/useKanaQuiz';
import KanaQuizPhaseOne from './KanaQuiz/PhaseOne';
import KanaQuizStart from './KanaQuiz/Start';

const KanaQuiz: Component = () => {
  const game = useKanaQuiz();

  createEffect(() => {
    console.log(game.kanas());
  });

  return (
    <div class="container mx-auto px-4 md:px-0">
      <h1 class="text-3xl text-center font-bold">KanaQuiz</h1>

      <Switch fallback={<p>ERROR</p>}>
        <Match when={game.state() === 'start'}>
          <KanaQuizStart onStart={game.startGame} />
        </Match>
        <Match when={game.state() === 'phase-1'}>
          <KanaQuizPhaseOne
            kanas={game.kanas()}
            onExerciseCompleted={game.handleExerciseCompleted}
          />
        </Match>
      </Switch>
    </div>
  );
};

export default KanaQuiz;
