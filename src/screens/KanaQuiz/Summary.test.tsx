import {render, within} from '@solidjs/testing-library';
import {describe, expect, it} from 'vitest';
import Summary from './Summary';

describe('<Summary />', () => {
  it('should render correctly', () => {
    const {unmount, getByText, getAllByTestId} = render(() => (
      <Summary
        kanas={[]}
        results={[
          {
            elapsedTime: 10,
            failedAttempts: 4,
            successStrikePercentage: 80,
            items: [
              {
                completed: true,
                failedAttempts: 4,
                item: 'あ',
              },
            ],
          },
          {
            elapsedTime: 18,
            failedAttempts: 2,
            successStrikePercentage: 60,
            items: [
              {
                completed: true,
                failedAttempts: 2,
                item: 'あ',
              },
            ],
          },
        ]}
      />
    ));

    expect(getByText('Riepilogo')).toBeDefined();
    expect(getByText('00:28')).toBeDefined();
    // expect(getByText('70%')).toBeDefined();

    const exercises = getAllByTestId('exercise-result');

    expect(within(exercises[0]).getByText('00:10')).toBeDefined();
    expect(within(exercises[0]).getByText('4')).toBeDefined();
    expect(within(exercises[0]).getByText('80%')).toBeDefined();

    expect(within(exercises[1]).getByText('00:18')).toBeDefined();
    expect(within(exercises[1]).getByText('2')).toBeDefined();
    expect(within(exercises[1]).getByText('60%')).toBeDefined();

    unmount();
  });

  it.skip('should render correctly rounded percentage', () => {
    const {unmount, getByText} = render(() => (
      <Summary
        kanas={[]}
        results={[
          {
            elapsedTime: 10,
            failedAttempts: 4,
            successStrikePercentage: 100,
            items: [
              {
                completed: true,
                failedAttempts: 4,
                item: 'あ',
              },
            ],
          },
          {
            elapsedTime: 18,
            failedAttempts: 2,
            successStrikePercentage: 80,
            items: [
              {
                completed: true,
                failedAttempts: 2,
                item: 'あ',
              },
            ],
          },
          {
            elapsedTime: 10,
            failedAttempts: 2,
            successStrikePercentage: 100,
            items: [
              {
                completed: true,
                failedAttempts: 2,
                item: 'あ',
              },
            ],
          },
        ]}
      />
    ));

    expect(getByText('Riepilogo')).toBeDefined();
    expect(getByText('00:38')).toBeDefined();
    // expect(getByText('93%')).toBeDefined();
    unmount();
  });
});
