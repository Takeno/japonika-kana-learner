import {Component, createSignal, onCleanup} from 'solid-js';
import {formatTime} from '../../../utils/utils';

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
