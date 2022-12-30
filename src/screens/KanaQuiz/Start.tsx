import {Component, createSignal, For} from 'solid-js';
import {AllKana, HIRAGANA_GROUPS} from '../../utils/kana';
import {ObjectEntries} from '../../utils/utils';

type KanaQuizStartProps = {
  onStart: (kanas: AllKana[]) => void;
};

type KanaGroup = keyof typeof HIRAGANA_GROUPS;

const KanaQuizStart: Component<KanaQuizStartProps> = (props) => {
  const [selectedKanas, setSelectedKanas] = createSignal<Array<KanaGroup>>([]);

  function toggleSelection(group: KanaGroup) {
    if (selectedKanas().includes(group)) {
      setSelectedKanas((old) => old.filter((k) => k !== group));
    } else {
      setSelectedKanas((old) => old.concat(group));
    }
  }

  function handleSubmit() {
    const selected = selectedKanas();
    if (selected.length === 0) {
      return;
    }

    let kanas: AllKana[] = [];
    for (let group of selected) {
      kanas = kanas.concat(HIRAGANA_GROUPS[group]);
    }

    props.onStart(kanas);
  }

  return (
    <>
      <h1>KanaQuiz</h1>
      <span>Scegli cosa vuoi imparare</span>

      <For each={ObjectEntries(HIRAGANA_GROUPS)}>
        {([key, items]) => (
          <div
            class={selectedKanas().includes(key) ? 'bg-green-400' : ''}
            onClick={() => toggleSelection(key)}
          >
            {items.join('')}
          </div>
        )}
      </For>

      <button disabled={selectedKanas().length === 0} onClick={handleSubmit}>
        Start
      </button>
    </>
  );
};

export default KanaQuizStart;
