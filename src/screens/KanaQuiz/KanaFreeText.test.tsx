import {vi, describe, expect, it} from 'vitest';
import {fireEvent, render} from 'solid-testing-library';
import KanaFreeText from './KanaFreeText';

describe('<KanaFreeText>', () => {
  it('should render correctly', () => {
    const {unmount, getByText} = render(() => (
      <KanaFreeText kanas={['あ']} onExerciseCompleted={() => {}} />
    ));

    expect(getByText('Kana Free Text')).toBeDefined();

    unmount();
  });
});
