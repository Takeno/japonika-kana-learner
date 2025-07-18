import {Component, createEffect, createSignal, For, JSX} from 'solid-js';
import {useTheme} from '../../../contexts/ThemeContext';

type KanaGuesserProps = {
  mainChar: string;
  answers: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  onAnswer: (index: number, correct: boolean) => void;
};

const KanaGuesser: Component<KanaGuesserProps> = (props) => {
  const [theme] = useTheme();

  const [error, setError] = createSignal<number | null>(null);
  const [success, setSuccess] = createSignal<number | null>(null);

  function handleAnswer(index: number) {
    if (index === props.correct) {
      setSuccess(index);
    } else {
      setError(index);
    }

    props.onAnswer(index, index === props.correct);
  }

  return (
    <div class="flex flex-row border-solid border-2 border-black rounded-md mx-auto">
      <div
        class="h-16 w-16 border-r-2  border-l-0 border-t-0 border-b-0 border-solid border-black flex items-center justify-center text-3xl"
        classList={{
          'font-NotoSerif': theme.kanaFont === 'serif',
          'font-NotoSans': theme.kanaFont === 'sans',
        }}
      >
        {props.mainChar}
      </div>

      <div class="p-2 grid grid-cols-4 gap-2">
        <For each={props.answers}>
          {(item, index) => (
            <Button
              disabled={success() !== null}
              onClick={() => handleAnswer(index())}
              state={
                error() === index()
                  ? 'error'
                  : success() === index()
                    ? 'success'
                    : undefined
              }
            >
              {item}
            </Button>
          )}
        </For>
      </div>
    </div>
  );
};

export default KanaGuesser;

type ButtonProps = {
  disabled: boolean;
  onClick: () => void;
  state: 'error' | 'success' | undefined;
  children: JSX.Element;
};

const Button: Component<ButtonProps> = (props) => {
  const [error, setError] = createSignal<boolean>(false);

  createEffect(() => {
    if (props.state !== 'error') {
      return;
    }

    setError(true);
    setTimeout(() => setError(false), 1000);
  });

  return (
    <button
      class="border-2 rounded-md w-12 h-12 text-2xl box-border border-solid border-gray-400 text-black hover:text-black"
      classList={{
        'bg-white': !error() && props.state !== 'success',
        'bg-red-300': error(),
        'bg-green-300': props.state === 'success',
      }}
      onClick={() => props.onClick()}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
