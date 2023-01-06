import {Component} from 'solid-js';
import {Routes, Route} from '@solidjs/router';
import Home from './screens/Home';
import KanaQuiz from './screens/KanaQuiz';

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/kana-quiz" component={KanaQuiz} />
    </Routes>
  );
};

export default App;
