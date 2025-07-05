import {createContext, ParentComponent, useContext} from 'solid-js';
import {createStore} from 'solid-js/store';
import {z} from 'zod';

type KanaFont = 'sans' | 'serif';

type ThemeContextState = {
  kanaFont: KanaFont;
};

type ThemeContextValue = [
  state: Readonly<ThemeContextState>,
  actions: {
    changeKanaFont: (font: KanaFont) => void;
  },
];

const ThemeContext = createContext<ThemeContextValue>([
  {
    kanaFont: 'sans',
  },
  {
    changeKanaFont: () => undefined,
  },
]);

export const ThemeProvider: ParentComponent<{}> = (props) => {
  const [state, setState] = createStore<ThemeContextState>(getPersistedState());

  const changeKanaFont = (font: KanaFont) => {
    console.log('a', font);
    setState('kanaFont', font);
    savePersistedState(state);
  };

  return (
    <ThemeContext.Provider value={[state, {changeKanaFont}]}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

function getPersistedState(): ThemeContextState {
  const themeSchema = z.object({
    kanaFont: z.enum(['sans', 'serif']).default('sans'),
  });

  const persistedState = localStorage.getItem('@THEME') || '{}';

  try {
    return themeSchema.parse(JSON.parse(persistedState));
  } catch (_e) {
    return themeSchema.parse({});
  }
}

function savePersistedState(theme: ThemeContextState): void {
  localStorage.setItem('@THEME', JSON.stringify(theme));
}
