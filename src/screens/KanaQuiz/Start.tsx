import {Component, createSignal, For} from 'solid-js';
import {createStore} from 'solid-js/store';
import KanaFontSwitcher from '../../components/KanaFontSwitcher';
import {useTheme} from '../../contexts/ThemeContext';
import {
  AllKana,
  ALL_KANA,
  HIRAGANA_GROUPS,
  KATAKANA_GROUPS,
} from '../../utils/kana';
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
      <h2 class="text-2xl my-4">Benvenuto!</h2>
      <p>
        Seleziona i gruppi di caratteri che vuoi studiare, scegli le tipologie
        di esercizio disponibili e parti!
      </p>

      <div class="grid sm:grid-cols-2 gap-8 my-4 -mx-4">
        <div class="bg-gray-50 p-4">
          <h3 class="text-center text-2xl">Hiragana</h3>

          <KanaChooser
            label="Suoni puri"
            entries={ObjectEntries(HIRAGANA_GROUPS).slice(0, 10)}
            selectedKanas={selectedKanas()}
            onChoose={toggleSelection}
          />

          <KanaChooser
            label="Suoni impuri"
            entries={ObjectEntries(HIRAGANA_GROUPS).slice(10, 15)}
            selectedKanas={selectedKanas()}
            onChoose={toggleSelection}
          />

          <KanaChooser
            label="Suoni contratti"
            entries={ObjectEntries(HIRAGANA_GROUPS).slice(15)}
            selectedKanas={selectedKanas()}
            onChoose={toggleSelection}
          />
        </div>

        <div class="bg-gray-50 p-4">
          <h3 class="text-center text-2xl">Katakana</h3>

          <KanaChooser
            label="Suoni puri"
            entries={ObjectEntries(KATAKANA_GROUPS).slice(0, 10)}
            selectedKanas={selectedKanas()}
            onChoose={toggleSelection}
          />

          <KanaChooser
            label="Suoni impuri"
            entries={ObjectEntries(KATAKANA_GROUPS).slice(10, 15)}
            selectedKanas={selectedKanas()}
            onChoose={toggleSelection}
          />

          <KanaChooser
            label="Suoni contratti"
            entries={ObjectEntries(KATAKANA_GROUPS).slice(15)}
            selectedKanas={selectedKanas()}
            onChoose={toggleSelection}
          />
        </div>
      </div>

      <h3 class="text-center text-2xl">Tipi di esercizi</h3>

      <p class="italic mt-2 text-center">
        Presto una descrizione dettagliata...
      </p>

      <div class="my-2 grid grid-cols-3 gap-2">
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

      <h3 class="text-center text-2xl">Font</h3>
      <div class="my-2 text-center">
        <p class="italic mt-2">
          Scegli il font con le grazie (Noto Serif) o senza (Noto Sans).
        </p>
        <KanaFontSwitcher />
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

type KanaChooserProps = {
  label: string;
  entries: [KanaGroup, readonly AllKana[]][];
  selectedKanas: KanaGroup[];
  onChoose: (key: KanaGroup) => void;
};

function KanaChooser(props: KanaChooserProps) {
  const [theme] = useTheme();

  return (
    <fieldset class="my-2">
      <legend class="block text-center">{props.label}</legend>
      <div class="grid grid-cols-2 gap-2">
        <For each={props.entries}>
          {([key, items]) => (
            <label class="flex cursor-pointer space-x-3">
              <input
                type="checkbox"
                checked={props.selectedKanas.includes(key)}
                onClick={() => props.onChoose(key)}
                class="w-3 mr-2"
              />
              <For each={items}>
                {(item) => (
                  <span
                    classList={{
                      'font-NotoSerif': theme.kanaFont === 'serif',
                      'font-NotoSans': theme.kanaFont === 'sans',
                    }}
                  >
                    {item}
                  </span>
                )}
              </For>
            </label>
          )}
        </For>
      </div>
    </fieldset>
  );
}
