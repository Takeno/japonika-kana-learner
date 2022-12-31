import {createSignal} from 'solid-js';
import {AllKana} from '../utils/kana';

export default function useKanaQuiz() {
  const [state, setState] = createSignal<KanaQuizGameState>('start');
  const [kanas, setKanas] = createSignal<AllKana[]>([]);

  const startGame = (kanas: AllKana[]) => {
    setKanas(kanas.sort(() => 0.5 - Math.random()));
    setState('phase-1');
  };

  return {
    state,
    startGame,
    kanas,
  };
}
