import type {Component, JSX} from 'solid-js';
import {useTheme} from '../contexts/ThemeContext';

const KanaFontSwitcher: Component = function () {
  const [theme, actions] = useTheme();

  const handleChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    const el = e.currentTarget;

    if (el.value === 'serif' || el.value === 'sans') {
      actions.changeKanaFont(el.value);
    }
  };

  return (
    <select
      onChange={handleChange}
      value={theme.kanaFont}
      class="border p-2 rounded-md"
    >
      <option value="sans">Noto Sans JP</option>
      <option value="serif">Noto Serif JP</option>
    </select>
  );
};

export default KanaFontSwitcher;
