import {vi, describe, expect, it} from 'vitest';
import {fireEvent, render} from 'solid-testing-library';
import KanaFreeText from './KanaFreeText';

describe('<KanaFreeText>', () => {
  it('should render correctly', () => {
    const {unmount, getByText, getAllByRole} = render(() => (
      <KanaFreeText kanas={['あ']} onExerciseCompleted={() => {}} />
    ));

    expect(getByText('Kana Free Text')).toBeDefined();

    const inputs = getAllByRole<HTMLInputElement>('textbox');

    expect(inputs).toHaveLength(1);

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement === inputs[0]).toBe(true);

    unmount();
  });

  it('should focus next input if previous one is correct', () => {
    const {unmount, getAllByRole} = render(() => (
      <KanaFreeText kanas={['あ', 'い']} onExerciseCompleted={() => {}} />
    ));

    const inputs = getAllByRole<HTMLInputElement>('textbox');

    expect(inputs).toHaveLength(2);

    fireEvent.change(inputs[0], {
      target: {
        value: 'a',
      },
    });

    fireEvent.keyDown(inputs[0], {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement === inputs[1]).toBe(true);

    unmount();
  });

  it('should focus same input when enter is pressed if answer is wrong', () => {
    const {unmount, getAllByRole} = render(() => (
      <KanaFreeText kanas={['あ', 'い']} onExerciseCompleted={() => {}} />
    ));

    const inputs = getAllByRole<HTMLInputElement>('textbox');

    expect(inputs).toHaveLength(2);

    fireEvent.change(inputs[0], {
      target: {
        value: 'b',
      },
    });

    fireEvent.keyDown(inputs[0], {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement === inputs[0]).toBe(true);

    unmount();
  });

  it.skip('should focus same input when blur event is triggered if answer is wrong', async () => {
    const {unmount, getAllByRole} = render(() => (
      <KanaFreeText kanas={['あ', 'い']} onExerciseCompleted={() => {}} />
    ));

    const inputs = getAllByRole<HTMLInputElement>('textbox');

    expect(inputs).toHaveLength(2);

    fireEvent.change(inputs[0], {
      target: {
        value: 'b',
      },
    });

    // jsdom fires blur on previous element before focus the current element
    // inputs[1].focus();

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement === inputs[0]).toBe(true);

    unmount();
  });

  it('should allow submit without all exercises completed', async () => {
    const handleExerciseCompleted = vi.fn();

    const {unmount, getByText} = render(() => (
      <KanaFreeText
        kanas={['あ', 'い']}
        onExerciseCompleted={handleExerciseCompleted}
      />
    ));

    fireEvent.click(getByText('Next'));

    expect(handleExerciseCompleted).toHaveBeenCalledWith({
      elapsedTime: 0,
      failedAttempts: 2,
      successStrikePercentage: 0,
    });

    unmount();
  });
});
