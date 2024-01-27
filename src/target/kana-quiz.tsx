import {render} from 'solid-js/web';
import '../index.css';
import KanaQuiz from '../screens/KanaQuiz';

render(
  () => <KanaQuiz />,
  document.getElementById('kana-quiz-container') as HTMLElement
);
