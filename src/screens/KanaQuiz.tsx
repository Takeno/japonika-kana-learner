import {Component, Match, Switch} from 'solid-js';
import createKanaQuiz from '../stores/createKanaQuiz';
import KanaQuizPhaseOne from './KanaQuiz/PhaseOne';
import RomajiToKana from './KanaQuiz/RomajiToKana';
import KanaQuizStart from './KanaQuiz/Start';

const KanaQuiz: Component = () => {
  const game = createKanaQuiz();

  return (
    <div class="container mx-auto px-4 md:px-0">
      <h1 class="text-3xl text-center font-bold">KanaQuiz</h1>

      <Switch fallback={<p>ERROR</p>}>
        <Match when={game.state() === 'start'}>
          <KanaQuizStart onStart={game.startGame} />
        </Match>
        <Match
          when={
            game.state() === 'exercise' &&
            game.currentExerciseType() === 'kana2romaji'
          }
        >
          <KanaQuizPhaseOne
            kanas={game.kanas()}
            onExerciseCompleted={game.handleExerciseCompleted}
          />
        </Match>
        <Match
          when={
            game.state() === 'exercise' &&
            game.currentExerciseType() === 'romaji2kana'
          }
        >
          <RomajiToKana
            kanas={game.kanas()}
            onExerciseCompleted={game.handleExerciseCompleted}
          />
        </Match>

        <Match when={game.state() === 'summary'}>
          <h1>Summary</h1>
        </Match>
      </Switch>
    </div>
  );
};

export default KanaQuiz;
