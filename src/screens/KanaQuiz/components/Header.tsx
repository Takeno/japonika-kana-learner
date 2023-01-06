import {Component} from 'solid-js';

const Header: Component = () => {
  return (
    <header class="w-full py-4 bg-slate-600">
      <h1 class="text-3xl text-center font-bold text-white">
        <a href="/kana-quiz">Kana Quiz</a>{' '}
        <span class="text-xl">
          by{' '}
          <a href="https://japonika.it" class="hover:underline">
            Japonika
          </a>
        </span>
      </h1>
    </header>
  );
};

export default Header;
