import {Component, createMemo, For, onMount} from 'solid-js';
import KanaInput from '../../components/KanaInput';
import Timer from '../../components/Timer';
import usePhaseOne from '../../stores/usePhaseOne';
import {AllKana, ALL_KANA} from '../../utils/kana';

type KanaFreeTextProps = KanaQuizExerciseProps<AllKana>;

const KanaFreeText: Component<KanaFreeTextProps> = (props) => {
  let inputsContainer: HTMLDivElement;

  const game = createMemo(() => usePhaseOne(props.kanas.length));

  onMount(() => {
    inputsContainer.querySelector('input')?.focus();
  });

  function handleFinish() {
    if (!game().allCompleted()) {
      return;
    }

    const result: ExerciseResult = {
      elapsedTime: Math.round((Date.now() - game().startDate.getTime()) / 1000),
      failedAttempts: game().results.reduce(
        (acc, r) => acc + r.attempts - 1,
        0
      ),
      successStrikePercentage: Math.round(
        100 *
          (game().results.filter((r) => r.attempts === 1).length /
            game().results.length)
      ),
    };

    props.onExerciseCompleted(result);
  }

  function handleAnswer(correct: boolean, index: number) {
    const allInputs = inputsContainer.querySelectorAll('input');

    if (correct) {
      game().setExerciseCompleted(index);
      if (index !== allInputs.length - 1) {
        allInputs.item(index + 1).focus();
      }
    } else {
      game().setExerciseFail(index);

      allInputs.item(index).focus();
    }
  }

  return (
    <div class="container mx-auto">
      <div class="sm:flex flex-row justify-between items-baseline">
        <h1 class="text-3xl">Kana Free Text</h1>

        <span>
          Timer: <Timer startDate={game().startDate} />
        </span>
      </div>

      <div
        ref={(el) => (inputsContainer = el)}
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"
      >
        <For each={props.kanas}>
          {(item, index) => (
            <KanaInput
              mainChar={item}
              correct={ALL_KANA[item]}
              onAnswer={(correct) => handleAnswer(correct, index())}
            />
          )}
        </For>
      </div>

      <div class="text-center">
        <button
          class="border-2 px-4 py-2 rounded-xl uppercase"
          disabled={!game().allCompleted()}
          onClick={handleFinish}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KanaFreeText;
