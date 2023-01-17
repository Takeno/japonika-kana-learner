import {Component} from 'solid-js';

const Header: Component = () => {
  return (
    <header class="w-full py-4 bg-gray-100">
      <h1 class="text-3xl text-center font-bold text-black">
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
