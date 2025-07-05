import {Component, For, onMount} from 'solid-js';
import createKanaExercise from '../../stores/createKanaExercise';
import {trackEvent} from '../../utils/analytics';
import {ALL_KANA, AllKana} from '../../utils/kana';
import KanaInput from './components/KanaInput';
import Timer from './components/Timer';

type KanaFreeTextProps = KanaQuizExerciseProps<AllKana>;

const KanaFreeText: Component<KanaFreeTextProps> = (props) => {
  let inputsContainer: HTMLDivElement;

  const exercise = createKanaExercise({
    kanas: new Set(props.kanas),
  });

  onMount(() => {
    inputsContainer.querySelector('input')?.focus();
  });

  onMount(async () => {
    trackEvent('KanaFreeText');
  });

  function handleFinish() {
    const exerciseResult = exercise.exerciseResult();

    props.onExerciseCompleted(exerciseResult);
  }

  function handleAnswer(correct: boolean, index: number) {
    const allInputs = inputsContainer.querySelectorAll('input');
    exercise.setAttempt(index, correct);

    if (correct) {
      if (index !== allInputs.length - 1) {
        allInputs.item(index + 1).focus();
      }
    } else {
      allInputs.item(index).focus();
    }
  }

  return (
    <div class="container mx-auto">
      <div class="sm:flex flex-row justify-between items-baseline">
        <h1 class="text-3xl">Kana Free Text</h1>

        <span>
          Timer: <Timer startDate={exercise.startDate} />
        </span>
      </div>

      <p>Premi Invio o Tab per validare la risposta inserita.</p>

      <div
        ref={(el) => (inputsContainer = el)}
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"
      >
        <For each={exercise.results()}>
          {(item, index) => (
            <KanaInput
              mainChar={item.item}
              correct={ALL_KANA[item.item]}
              onAnswer={(correct) => handleAnswer(correct, index())}
            />
          )}
        </For>
      </div>

      <div class="text-center">
        <button
          class="border-2 px-4 py-2 rounded-xl uppercase"
          onClick={handleFinish}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KanaFreeText;
