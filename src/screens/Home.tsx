import {Navigate} from '@solidjs/router';
import type {Component} from 'solid-js';

const Home: Component = () => {
  return <Navigate href="/kana-quiz" />;
};

export default Home;
