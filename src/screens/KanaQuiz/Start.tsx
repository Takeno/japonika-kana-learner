import {Component, createSignal, For} from 'solid-js';
import {AllKana, HIRAGANA_GROUPS} from '../../utils/kana';
import {ObjectEntries} from '../../utils/utils';

type KanaQuizStartProps = {
  onStart: (
    kanas: AllKana[],
    config: {exerciseTypes: KanaQuizExerciseType[]}
  ) => void;
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

    props.onStart(kanas, {
      exerciseTypes: ['kana2romaji', 'romaji2kana'],
    });
  }

  return (
    <>
      <h2 class="text-2xl my-6">Scegli cosa vuoi imparare</h2>

      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <h3>Hiragana</h3>
          <For each={ObjectEntries(HIRAGANA_GROUPS)}>
            {([key, items]) => (
              <label
                classList={{'bg-green-200': selectedKanas().includes(key)}}
                class="block cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedKanas().includes(key)}
                  onClick={() => toggleSelection(key)}
                  class="mx-2"
                />
                {items.join('')}
              </label>
            )}
          </For>
        </div>

        <div>
          <h3>Katakana</h3>
        </div>
      </div>

      <div class="text-center">
        <button
          class="border-2 px-4 py-2 rounded-xl uppercase"
          disabled={selectedKanas().length === 0}
          onClick={handleSubmit}
        >
          Start
        </button>
      </div>
    </>
  );
};

export default KanaQuizStart;
