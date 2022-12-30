import {describe, expect, test} from 'vitest';
import {render} from 'solid-testing-library';
import KanaQuiz from './KanaQuiz';

describe('<KanaQuiz />', () => {
  test('renders', () => {
    const {unmount, queryByText} = render(() => <KanaQuiz />);

    const title = queryByText('KanaQuiz');
    expect(title).not.toBeNull();
    unmount();
  });
});
