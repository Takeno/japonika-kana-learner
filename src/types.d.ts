type KanaQuizExerciseType = 'kana2romaji' | 'romaji2kana' | 'kana-free-text';

type ExerciseResult = {
  elapsedTime: number;
  failedAttempts: number;
  successStrikePercentage: number;
};

type KanaQuizExerciseProps<T> = {
  kanas: T[];
  onExerciseCompleted: (result: ExerciseResult) => void;
};
