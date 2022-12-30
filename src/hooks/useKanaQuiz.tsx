import { createSignal } from "solid-js";

export default function useKanaQuiz() {
  const [state, setState] = createSignal<KanaQuizGameState>('start');
  const [kanas, setKanas] = createSignal<AllKana[]>([]);

  const startGame = (kanas: AllKana[]) => {
    setKanas(kanas);
    setState('phase-1');
  };

  return {
    state,
    startGame,
    kanas,
  }
}