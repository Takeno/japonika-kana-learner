import {Component, Match, Switch} from 'solid-js';
import createKanaQuiz from '../stores/createKanaQuiz';
import KanaToRomaji from './KanaQuiz/KanaToRomaji';
import RomajiToKana from './KanaQuiz/RomajiToKana';
import KanaQuizStart from './KanaQuiz/Start';
import Summary from './KanaQuiz/Summary';

const KanaQuiz: Component = () => {
  const game = createKanaQuiz();

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
          <Match
            when={
              game.state() === 'exercise' &&
              game.currentExerciseType() === 'kana2romaji'
            }
          >
            <KanaToRomaji
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
            <Summary results={game.results()} />
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default KanaQuiz;
