import {Component} from 'solid-js';

import logo from '../../../assets/japonika.png';

const Footer: Component = () => {
  return (
    <footer class="w-full py-4 bg-gray-100 flex flex-col items-center">
      <a href="https://japonika.it" class="hover:underline">
        <img src={logo} alt="Japonika" class="w-64" />
      </a>

      <p class="text-black mt-4 text-center">
        Made with ❤️ by{' '}
        <a href="https://github.com/Takeno" class="hover:underline">
          @takeno
        </a>{' '}
        for{' '}
        <a href="https://japonika.it" class="hover:underline">
          Japonika
        </a>
        <br />
        <a
          href="https://github.com/Takeno/japonika-kana-learner"
          class="hover:underline"
        >
          Github Repo
        </a>{' '}
        -{' '}
        <a
          href="https://www.youtube.com/playlist?list=PL9pte55HorWGbggaadyd-MddFR1NKJy08"
          class="hover:underline"
        >
          Step by Step videos
        </a>
      </p>
    </footer>
  );
};

export default Footer;
