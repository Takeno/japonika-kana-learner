import { Component, createEffect, Match, Switch } from 'solid-js';
import useKanaQuiz from '../hooks/useKanaQuiz';
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
      </Switch>
    </>
  )
}

export default KanaQuiz;
