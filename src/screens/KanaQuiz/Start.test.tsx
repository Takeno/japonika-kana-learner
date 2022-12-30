import {vi, describe, expect, test} from 'vitest';
import {fireEvent, render} from 'solid-testing-library';
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
    const {unmount, queryByText} = render(() => <Start onStart={() => {}} />);

    const firstRow = queryByText('あいうえお');
    expect(firstRow).toBeDefined();
    expect(firstRow!.classList.contains('bg-green-400')).toBe(false);

    fireEvent.click(firstRow!);

    expect(firstRow!.classList.contains('bg-green-400')).toBe(true);

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

    expect(onStart).toBeCalledWith(['あ', 'い', 'う', 'え', 'お']);

    unmount();
  });
});
