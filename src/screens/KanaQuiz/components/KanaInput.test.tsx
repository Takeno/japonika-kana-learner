import {vi, describe, expect, it} from 'vitest';
import {fireEvent, render} from '@solidjs/testing-library';
import KanaInput from './KanaInput';

describe('<KanaInput>', () => {
  it('should render correctly', () => {
    const {unmount, getByText, getByRole} = render(() => (
      <KanaInput mainChar="あ" correct="a" onAnswer={() => {}} />
    ));

    expect(getByText('あ')).toBeDefined();
    expect(getByRole('textbox')).toBeDefined();

    unmount();
  });

  it('should call onAnswer on wrong answer', () => {
    const handleAnswer = vi.fn();

    const {unmount, getByRole} = render(() => (
      <KanaInput mainChar="あ" correct="a" onAnswer={handleAnswer} />
    ));

    const input = getByRole<HTMLInputElement>('textbox');

    fireEvent.change(input, {
      target: {
        value: 'b',
      },
    });

    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    expect(handleAnswer).toBeCalledWith(false);

    expect(input.value).toBe('');
    expect(input.placeholder).toBe('b');

    unmount();
  });

  it('should verify case insensitive', () => {
    const handleAnswer = vi.fn();

    const {unmount, getByRole} = render(() => (
      <KanaInput mainChar="あ" correct="a" onAnswer={handleAnswer} />
    ));

    const input = getByRole<HTMLInputElement>('textbox');

    fireEvent.change(input, {
      target: {
        value: 'A',
      },
    });

    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    expect(handleAnswer).toBeCalledWith(true);

    unmount();
  });

  it('should verify trimming spaces', () => {
    const handleAnswer = vi.fn();

    const {unmount, getByRole} = render(() => (
      <KanaInput mainChar="あ" correct="a" onAnswer={handleAnswer} />
    ));

    const input = getByRole<HTMLInputElement>('textbox');

    fireEvent.change(input, {
      target: {
        value: ' a ',
      },
    });

    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    expect(handleAnswer).toBeCalledWith(true);

    unmount();
  });
});
