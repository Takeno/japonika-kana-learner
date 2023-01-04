import {Component, createEffect, createSignal, For, JSX} from 'solid-js';

type KanaGuesserProps = {
  mainChar: string;
  answers: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  onAnswer: (index: number, correct: boolean) => void;
};

const KanaGuesser: Component<KanaGuesserProps> = (props) => {
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
    <div class="flex flex-row border-2 border-black rounded-md items-center">
      <div class="text-3xl border-r-2 border-black p-2 w-14 text-center">
        {props.mainChar}
      </div>

      <div class="pl-2 flex-1 flex flex-row justify-around">
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
      class="border-2 aspect-square h-12 rounded-md text-2xl"
      classList={{
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
