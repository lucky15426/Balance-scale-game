const STORAGE_KEY = 'gramquest_user_progress_v1';

const DEFAULT_PROGRESS = {
  score: 0,
  streak: 0,
  bestStreak: 0,
  currentLevel: 1,
  completedLevels: [],
  unlockedBadges: [],
  totalQuestionsAttempted: 0,
  totalQuestionsCorrect: 0,
};

export const loadProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load progress from localStorage:', e);
    return DEFAULT_PROGRESS;
  }
};

export const saveProgress = (progressData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
};

export const resetProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset progress:', e);
  }
  return DEFAULT_PROGRESS;
};
