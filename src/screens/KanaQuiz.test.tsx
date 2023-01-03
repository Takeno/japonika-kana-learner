import {describe, expect, test} from 'vitest';
import {fireEvent, render} from 'solid-testing-library';
import KanaQuiz from './KanaQuiz';

describe('<KanaQuiz />', () => {
  test('renders', () => {
    const {unmount, queryByText} = render(() => <KanaQuiz />);

    const title = queryByText('KanaQuiz');
    expect(title).not.toBeNull();
    unmount();
  });

  test('should go to exercise after kana selection', () => {
    const {unmount, getByText, queryAllByRole} = render(() => <KanaQuiz />);

    expect(getByText('Scegli cosa vuoi imparare')).toBeDefined();

    fireEvent.click(getByText('あいうえお'));

    fireEvent.click(getByText('Start'));

    expect(getByText('Phase 1')).toBeDefined();

    const buttons = queryAllByRole('button');

    buttons.forEach((button) => {
      if (button.textContent === 'Finish') {
        return;
      }

      fireEvent.click(button);
    });

    fireEvent.click(getByText('Finish'));

    expect(getByText('Phase 2')).toBeDefined();

    unmount();
  });
});
