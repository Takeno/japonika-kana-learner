import {Component} from 'solid-js';
import {Routes, Route} from '@solidjs/router';
import Home from './screens/Home';
import KanaQuiz from './screens/KanaQuiz';
import {ThemeProvider} from './contexts/ThemeContext';

const App: Component = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/kana-quiz" component={KanaQuiz} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
