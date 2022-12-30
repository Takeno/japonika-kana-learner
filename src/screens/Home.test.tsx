import {describe, expect, test} from 'vitest';
import {render} from 'solid-testing-library';
import Home from './Home';

describe('<Home />', () => {
  test('renders', () => {
    const {unmount, queryByText} = render(() => <Home />);

    const title = queryByText('Home');
    expect(title).not.toBeNull();
    unmount();
  });
});
