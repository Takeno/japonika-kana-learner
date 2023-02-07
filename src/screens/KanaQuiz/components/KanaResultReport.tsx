import {For} from 'solid-js';
import {useTheme} from '../../../contexts/ThemeContext';
import {AllKana, HIRAGANA_GROUPS, KATAKANA_GROUPS} from '../../../utils/kana';
import {calculateKanaErrors, ObjectEntries} from '../../../utils/utils';

type KanaResultReportProps = {
  results: ExerciseResult<AllKana>[];
};

export default function KanaResultReport(props: KanaResultReportProps) {
  const [theme] = useTheme();

  const errors = () => {
    const errors = calculateKanaErrors(props.results);

    const hiraganaGroup = ObjectEntries(HIRAGANA_GROUPS)
      .map(([kana, kanas]) => ({
        kana,
        errors: errors.filter((e) => kanas.includes(e.kana)),
      }))
      .filter((g) => g.errors.length > 0);

    const katakanaGroup = ObjectEntries(KATAKANA_GROUPS)
      .map(([kana, kanas]) => ({
        kana,
        errors: errors.filter((e) => kanas.includes(e.kana)),
      }))
      .filter((g) => g.errors.length > 0);

    return (
      [] as {
        kana: string;
        errors: {
          kana: AllKana;
          romaji: string;
          errors: number;
        }[];
      }[]
    )
      .concat(hiraganaGroup)
      .concat(katakanaGroup);
  };

  return (
    <div>
      <h3 class="text-2xl font-medium">Kana Report</h3>

      <For each={errors()}>
        {(group) => (
          <div class="grid grid-cols-5 gap-1 my-1 md:gap-2 md:my-2">
            <For each={group.errors}>
              {(item) => (
                <div
                  class="text-lg p-2 px-2 flex flex-row align-middle justify-between rounded-md"
                  classList={{
                    'bg-green-400': item.errors === 0,
                    'bg-red-200': item.errors === 1,
                    'bg-red-400': item.errors > 1,
                  }}
                >
                  <div class="uppercase text-md">
                    <span
                      class="text-2xl"
                      classList={{
                        'font-NotoSerif': theme.kanaFont === 'serif',
                        'font-NotoSans': theme.kanaFont === 'sans',
                      }}
                    >
                      {item.kana}
                    </span>
                    {/* /{item.romaji} */}
                  </div>
                  <span>{item.errors}</span>
                </div>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}
