import {Component, JSX} from 'solid-js';

type KanaInputProps = {
  mainChar: string;
  correct: string;
  onAnswer: (correct: boolean) => void;
};

const KanaInput: Component<KanaInputProps> = (props) => {
  const verify = (el: HTMLInputElement) => {
    const val = el.value.toLowerCase().trim();

    if (val === '') {
      return;
    }

    const isCorrect =
      el.value.toLowerCase().trim() === props.correct.toLowerCase();

    props.onAnswer(isCorrect);

    if (isCorrect === false) {
      el.placeholder = el.value;
      el.value = '';

      el.classList.add('bg-red-300');
      setTimeout(() => {
        el.classList.remove('bg-red-300');
      }, 600);
    } else {
      el.classList.add('bg-green-300');
      el.disabled = true;
    }
  };

  const handleChange: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent> = (
    e
  ) => {
    if (e.key !== 'Enter') {
      return;
    }

    const el = e.currentTarget;

    verify(el);
  };

  const handleBlur: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent> = (
    e
  ) => {
    const el = e.currentTarget;

    verify(el);
  };

  return (
    <div class="flex flex-row border-2 border-black rounded-md items-center h-14">
      <div class="text-3xl border-r-2 border-black p-2 w-18 text-center">
        {props.mainChar}
      </div>

      <div class="flex-1 flex flex-row justify-around h-full">
        <input
          class="text-2xl w-full h-full text-center outline-none lowercase"
          type="text"
          onKeyDown={handleChange}
          onBlur={handleBlur}
          autocapitalize="none"
        />
      </div>
    </div>
  );
};

export default KanaInput;
