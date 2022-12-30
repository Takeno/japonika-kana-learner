import { Component, createResource, lazy } from 'solid-js';
import { Routes, Route, A } from "@solidjs/router"
import Home from './screens/Home';
import KanaQuiz from './screens/KanaQuiz';

const App: Component = () => {
  return (
    <>
      <h1 class='text-4xl'>It works</h1>

      <A href='/'>Home</A> -
      <A href='/kana-quiz'>Quiz</A>

      <Routes>
        <Route path="/" component={Home} />
        <Route path="/kana-quiz" component={KanaQuiz} />
      </Routes>
    </>
  )
}

export default App;
