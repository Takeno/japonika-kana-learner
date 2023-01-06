import {Component, createSignal, For} from 'solid-js';
import {createStore} from 'solid-js/store';
import {AllKana, HIRAGANA_GROUPS, KATAKANA_GROUPS} from '../../utils/kana';
import {ObjectEntries} from '../../utils/utils';

type KanaQuizStartProps = {
  onStart: (
    kanas: AllKana[],
    config: {exerciseTypes: KanaQuizExerciseType[]}
  ) => void;
};

const ALL_GROUPS = {...HIRAGANA_GROUPS, ...KATAKANA_GROUPS};

type KanaGroup = keyof typeof ALL_GROUPS;

const KanaQuizStart: Component<KanaQuizStartProps> = (props) => {
  const [selectedKanas, setSelectedKanas] = createSignal<Array<KanaGroup>>([]);

  const [exerciseTypes, setExerciseTypes] = createStore<{
    [k in KanaQuizExerciseType]: boolean;
  }>({
    kana2romaji: true,
    romaji2kana: true,
    'kana-free-text': true,
  });

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
      kanas = kanas.concat(ALL_GROUPS[group]);
    }

    props.onStart(kanas, {
      exerciseTypes: (
        [
          'kana2romaji',
          'romaji2kana',
          'kana-free-text',
        ] as KanaQuizExerciseType[]
      ).filter((type) => exerciseTypes[type] === true),
    });
  }

  return (
    <>
      <h2 class="text-2xl my-6">Scegli cosa vuoi imparare</h2>

      <div class="grid sm:grid-cols-2 gap-8">
        <div class="bg-gray-50 p-4">
          <h3 class="text-center text-2xl">Hiragana</h3>
          <fieldset>
            <legend class="block text-center">Suoni puri</legend>
            <div class="grid sm:grid-cols-2 gap-2">
              <For each={ObjectEntries(HIRAGANA_GROUPS).slice(0, 10)}>
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
          </fieldset>

          <fieldset>
            <legend class="block text-center">Suoni impuri</legend>
            <div class="grid sm:grid-cols-2 gap-2">
              <For each={ObjectEntries(HIRAGANA_GROUPS).slice(10, 15)}>
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
          </fieldset>

          <fieldset>
            <legend class="block text-center">Suoni contratti</legend>
            <div class="grid sm:grid-cols-2 gap-2">
              <For each={ObjectEntries(HIRAGANA_GROUPS).slice(15)}>
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
          </fieldset>
        </div>

        <div class="bg-gray-50 p-4">
          <h3 class="text-center text-2xl">Katakana</h3>

          <fieldset>
            <legend class="block text-center">Suoni puri</legend>
            <div class="grid sm:grid-cols-2 gap-2">
              <For each={ObjectEntries(KATAKANA_GROUPS).slice(0, 10)}>
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
          </fieldset>

          <fieldset>
            <legend class="block text-center">Suoni impuri</legend>
            <div class="grid sm:grid-cols-2 gap-2">
              <For each={ObjectEntries(KATAKANA_GROUPS).slice(10, 15)}>
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
          </fieldset>

          <fieldset>
            <legend class="block text-center">Suoni contratti</legend>
            <div class="grid sm:grid-cols-2 gap-2">
              <For each={ObjectEntries(KATAKANA_GROUPS).slice(15)}>
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
          </fieldset>
        </div>
      </div>

      <div class="my-6 grid grid-cols-3 gap-2">
        <label>
          <input
            type="checkbox"
            checked={exerciseTypes.kana2romaji}
            onChange={(el) =>
              setExerciseTypes('kana2romaji', el.currentTarget.checked)
            }
          />{' '}
          Kana To Romaji
        </label>
        <label>
          <input
            type="checkbox"
            checked={exerciseTypes.romaji2kana}
            onChange={(el) =>
              setExerciseTypes('romaji2kana', el.currentTarget.checked)
            }
          />{' '}
          Romaji To Kana
        </label>
        <label>
          <input
            type="checkbox"
            checked={exerciseTypes['kana-free-text']}
            onChange={(el) =>
              setExerciseTypes('kana-free-text', el.currentTarget.checked)
            }
          />{' '}
          Kana Free Text
        </label>
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
