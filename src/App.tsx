import {Route} from '@solidjs/router';
import {Component} from 'solid-js';
import {ThemeProvider} from './contexts/ThemeContext';
import Home from './screens/Home';
import KanaQuiz from './screens/KanaQuiz';

const App: Component = () => {
  return (
    <ThemeProvider>
      <Route path="/" component={Home} />
      <Route path="/kana-quiz" component={KanaQuiz} />
    </ThemeProvider>
  );
};

export default App;
