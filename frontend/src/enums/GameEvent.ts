export const GameEvent = Object.freeze({
  GAME_UPDATE: 'game-update',
  GAME_START: 'game-start',
  WORD_CHECK: 'word-check',
  GAME_COMPLETED: 'game-completed',
  GAME_OVER: 'game-over',
  GRAMMAR_CHECK: 'grammar-check',
});

export type GameEventType = typeof GameEvent[keyof typeof GameEvent];
