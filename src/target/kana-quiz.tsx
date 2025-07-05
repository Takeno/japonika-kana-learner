import {render} from 'solid-js/web';
import KanaQuiz from '../screens/KanaQuiz/KanaQuiz';
import '../index.css';
import {ThemeProvider} from '../contexts/ThemeContext';

render(
  () => (
    <ThemeProvider>
      <KanaQuiz />
    </ThemeProvider>
  ),
  document.getElementById('kana-quiz-container') as HTMLElement,
);
