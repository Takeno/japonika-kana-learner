import {render} from 'solid-js/web';
import KanaQuiz from '../screens/KanaQuiz/KanaQuiz';
import '../index.css';

render(
  () => <KanaQuiz />,
  document.getElementById('kana-quiz-container') as HTMLElement
);
