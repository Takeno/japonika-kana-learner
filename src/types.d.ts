type KanaQuizExerciseType = 'kana2romaji' | 'romaji2kana' | 'kana-free-text';

type ItemResult<T> = {
  item: T;
  completed: boolean;
  failedAttempts: number;
};

type ExerciseResult<T> = {
  items: ItemResult<T>[];
  elapsedTime: number;
  failedAttempts: number;
  successStrikePercentage: number;
};

type KanaQuizExerciseProps<T> = {
  kanas: T[];
  onExerciseCompleted: (result: ExerciseResult<T>) => void;
};
