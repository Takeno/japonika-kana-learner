import { describe, expect, test } from 'vitest'
import { fireEvent, render } from 'solid-testing-library'
import KanaQuiz from './KanaQuiz'

describe('<KanaQuiz />', () => {
  test('renders', () => {
    const { container, unmount, queryByText } = render(() => <KanaQuiz />)

    const title = queryByText('KanaQuiz');
    expect(title).not.toBeNull();
    unmount()
  });
});