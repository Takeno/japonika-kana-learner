import {Component, createSignal, onCleanup} from 'solid-js';

type TimerProps = {
  startDate: Date;
};

const Timer: Component<TimerProps> = (props) => {
  const [seconds, setSeconds] = createSignal<number>(0);

  const intervalId = setInterval(
    () =>
      setSeconds(Math.round((Date.now() - props.startDate.getTime()) / 1000)),
    500
  );

  onCleanup(() => clearInterval(intervalId));

  return <>{formatTime(seconds())}</>;
};

export default Timer;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return [minutes, remainingSeconds]
    .map((v) => ('' + v).padStart(2, '0'))
    .join(':');
}
