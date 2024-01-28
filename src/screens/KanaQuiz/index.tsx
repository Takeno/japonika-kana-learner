import {Component} from 'solid-js';
import Footer from './components/Footer';
import Header from './components/Header';
import KanaQuiz from './KanaQuiz';

const Page: Component = () => {
  return (
    <main class="min-h-screen flex flex-col">
      <Header />
      <KanaQuiz />
      <Footer />
    </main>
  );
};

export default Page;
