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
    <>
      <span>Game State: {game.state()}</span>

      <Switch fallback={<p>ERROR</p>}>
        <Match when={game.state() === 'start'}>
          <KanaQuizStart onStart={game.startGame} />
        </Match>
        <Match when={game.state() === 'phase-1'}>
          <KanaQuizPhaseOne kanas={game.kanas()} />
        </Match>
      </Switch>
    </>
  );
};

export default KanaQuiz;
