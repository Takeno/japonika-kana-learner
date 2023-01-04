import {Accessor, Component, For} from 'solid-js';
import {formatTime} from '../../utils/utils';

type SummaryProps = {
  results: ExerciseResult[];
};

const Summary: Component<SummaryProps> = (props) => {
  const totalElapsedTime: Accessor<string> = () =>
    formatTime(props.results.reduce((acc, r) => acc + r.elapsedTime, 0));

  const totalSuccesStrike: Accessor<number> = () =>
    Math.round(
      props.results.reduce((acc, r) => acc + r.successStrikePercentage, 0) /
        props.results.length
    );

  return (
    <div class="max-w-xl mx-auto">
      <h2 class="text-3xl">Summary</h2>

      <dl class="grid grid-cols-2">
        <dt class="font-medium">Total Elapsed Time:</dt>
        <dd>{totalElapsedTime()}</dd>
        <dt class="font-medium">Total Success Strike Percentage:</dt>
        <dd>{totalSuccesStrike()}%</dd>
      </dl>

      <h2 class="text-2xl mt-6 mb-4">Dettaglio</h2>

      <For each={props.results}>
        {(result, index) => (
          <div class="mb-6" data-testid="exercise-result">
            <h3 class="text-xl text-center">Exercise {index() + 1}</h3>
            <dl class="grid grid-cols-2">
              <dt class="font-medium">Elapsed Time:</dt>
              <dd>{formatTime(result.elapsedTime)}</dd>
              <dt class="font-medium">Failed Attempts</dt>
              <dd>{result.failedAttempts}</dd>
              <dt class="font-medium">Success Strike Percentage</dt>
              <dd>{result.successStrikePercentage}%</dd>
            </dl>
          </div>
        )}
      </For>
      <div class="text-center">
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
