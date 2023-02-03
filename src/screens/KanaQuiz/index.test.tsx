import {describe, expect, test} from 'vitest';
import {fireEvent, render} from 'solid-testing-library';
import KanaQuiz from '.';

describe('<KanaQuiz />', () => {
  test('renders', () => {
    const {unmount, queryByText} = render(() => <KanaQuiz />);

    const title = queryByText('Kana Quiz');
    expect(title).not.toBeNull();
    unmount();
  });

  test('should go to exercise after kana selection', () => {
    const {unmount, getByText, queryAllByRole} = render(() => <KanaQuiz />);

    expect(getByText('Benvenuto!')).toBeDefined();

    fireEvent.click(getByText('あ'));

    fireEvent.click(getByText('Romaji To Kana'));
    fireEvent.click(getByText('Kana Free Text'));
    fireEvent.click(getByText('Start'));

    expect(getByText('Kana to Romaji')).toBeDefined();

    const buttons = queryAllByRole('button');

    buttons.forEach((button) => {
      if (button.textContent === 'Next') {
        return;
      }

      fireEvent.click(button);
    });

    fireEvent.click(getByText('Next'));

    expect(getByText('Romaji to Kana')).toBeDefined();

    unmount();
  });
});
