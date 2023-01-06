import {vi, describe, expect, test} from 'vitest';
import {fireEvent, render, within} from 'solid-testing-library';
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

    const firstRow = getByText('あいうえお');

    const checkbox = within(firstRow).getByRole<HTMLInputElement>('checkbox');
    expect(checkbox.checked).toBe(false);

    fireEvent.click(firstRow!);

    expect(checkbox.checked).toBe(true);
    unmount();
  });

  test('selected rows are submitted', () => {
    const onStart = vi.fn();

    const {unmount, queryByText} = render(() => <Start onStart={onStart} />);

    const firstRow = queryByText('あいうえお');
    fireEvent.click(firstRow!);

    const button = queryByText('Start');
    expect(button).toBeDefined();
    expect((button as HTMLButtonElement).disabled).toBe(false);

    fireEvent.click(button!);

    expect(onStart).toBeCalledWith(['あ', 'い', 'う', 'え', 'お'], {
      exerciseTypes: ['kana2romaji', 'romaji2kana', 'kana-free-text'],
    });

    unmount();
  });

  test('selected exercise types are submitted', () => {
    const onStart = vi.fn();

    const {unmount, getByText} = render(() => <Start onStart={onStart} />);

    fireEvent.click(getByText('あいうえお'));

    fireEvent.click(getByText('Kana To Romaji'));
    fireEvent.click(getByText('Romaji To Kana'));

    fireEvent.click(getByText('Start'));

    expect(onStart).toBeCalledWith(['あ', 'い', 'う', 'え', 'お'], {
      exerciseTypes: ['kana-free-text'],
    });

    unmount();
  });
});
