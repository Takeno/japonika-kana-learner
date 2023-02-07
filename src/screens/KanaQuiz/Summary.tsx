import {Accessor, Component, For} from 'solid-js';
import {AllKana} from '../../utils/kana';
import {formatTime} from '../../utils/utils';
import KanaResultReport from './components/KanaResultReport';

type SummaryProps = {
  kanas: AllKana[];
  results: ExerciseResult<AllKana>[];
};

const Summary: Component<SummaryProps> = (props) => {
  const totalElapsedTime: Accessor<string> = () =>
    formatTime(props.results.reduce((acc, r) => acc + r.elapsedTime, 0));

  const handleSharing = async () => {
    const text = renderSharingText(props.kanas, props.results);

    if (typeof navigator.share === 'function') {
      navigator.share({
        text,
      });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Testo copiato negli appunti!');
    }
  };

  return (
    <div class="w-full max-w-md mx-auto">
      <h2 class="text-3xl">Riepilogo</h2>

      <div class="grid grid-cols-2 mt-2 mb-4">
        <dt class="font-medium">Tempo totale:</dt>
        <dd>{totalElapsedTime()}</dd>
      </div>

      <For each={props.results}>
        {(result, index) => (
          <div class="mb-6" data-testid="exercise-result">
            <h3 class="text-2xl font-medium">Esercizio {index() + 1}</h3>
            <dl class="grid grid-cols-2">
              <dt class="font-medium">Tempo impiegato:</dt>
              <dd>{formatTime(result.elapsedTime)}</dd>
              <dt class="font-medium">Tentativi errati:</dt>
              <dd>{result.failedAttempts}</dd>
              <dt class="font-medium">Perfect:</dt>
              <dd>{result.successStrikePercentage}%</dd>
            </dl>
          </div>
        )}
      </For>

      <KanaResultReport results={props.results} />

      <div class="flex flex-row gap-2 my-6">
        <button
          class="border-2 px-4 py-2 rounded-xl uppercase"
          onClick={handleSharing}
        >
          Condividi
        </button>
        <button
          class="border-2 px-4 py-2 rounded-xl uppercase"
          onClick={() => window.location.reload()}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Summary;

function renderSharingText(
  kanas: AllKana[],
  results: ExerciseResult<AllKana>[]
): string {
  const totalElapsedTime = formatTime(
    results.reduce((acc, r) => acc + r.elapsedTime, 0)
  );

  const strikes = results.map((result) => {
    const green = Math.floor(result.successStrikePercentage / 20);

    // each coloured square is composed by 2 chars
    return new Array(green).fill('🟩').join('').padEnd(10, '🟨');
  });

  return `Kana Quiz by japonika.it
${kanas.length} kana memorizzati in ${totalElapsedTime}!
${strikes.join('\n')}`;
}
