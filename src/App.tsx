import {Component} from 'solid-js';
import {Route} from '@solidjs/router';
import Home from './screens/Home';
import KanaQuiz from './screens/KanaQuiz';
import {ThemeProvider} from './contexts/ThemeContext';

const App: Component = () => {
  return (
    <ThemeProvider>
      <Route path="/" component={Home} />
      <Route path="/kana-quiz" component={KanaQuiz} />
    </ThemeProvider>
  );
};

export default App;
