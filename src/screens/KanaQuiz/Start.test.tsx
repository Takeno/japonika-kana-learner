import {vi, describe, expect, test} from 'vitest';
import {fireEvent, render, within} from '@solidjs/testing-library';
import Start from './Start';

describe('<Start />', () => {
  test('renders', () => {
    const {unmount, queryByText} = render(() => <Start onStart={() => {}} />);

    const title = queryByText('KanaQuiz');
    expect(title).toBeDefined();

    const button = queryByText('Start');
    expect(button).toBeDefined();
    expect((button as HTMLButtonElement).disabled).toBe(true);

    unmount();
  });

  test('selected rows are green', () => {
    const {unmount, getByText} = render(() => <Start onStart={() => {}} />);

    const firstRow = getByText('あ').parentElement!.parentElement!;

    const checkbox = within(firstRow).getByRole<HTMLInputElement>('checkbox');
    expect(checkbox.checked).toBe(false);

    fireEvent.click(firstRow!);

    expect(checkbox.checked).toBe(true);
    unmount();
  });

  test('selected rows are submitted', () => {
    const onStart = vi.fn();

    const {unmount, queryByText} = render(() => <Start onStart={onStart} />);

    const firstRow = queryByText('あ');
    fireEvent.click(firstRow!);

    const button = queryByText('Start');
    expect(button).toBeDefined();
    expect((button as HTMLButtonElement).disabled).toBe(false);

    fireEvent.click(button!);

    expect(onStart).toBeCalledWith(['あ', 'い', 'う', 'え', 'お'], {
      exerciseTypes: ['kana2romaji'],
    });

    unmount();
  });

  test('selected exercise types are submitted', () => {
    const onStart = vi.fn();

    const {unmount, getByText} = render(() => <Start onStart={onStart} />);

    fireEvent.click(getByText('あ'));

    fireEvent.click(getByText('Kana To Romaji'));
    fireEvent.click(getByText('Kana Free Text'));

    fireEvent.click(getByText('Start'));

    expect(onStart).toBeCalledWith(['あ', 'い', 'う', 'え', 'お'], {
      exerciseTypes: ['kana-free-text'],
    });

    unmount();
  });
});
