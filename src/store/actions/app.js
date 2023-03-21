import * as types from '../constants/action-types';

export function updateBoardDimensions(difficulty, settings) {
  let rows, columns, mineCount;
  switch (difficulty.toLowerCase()) {
    case 'medium':
      rows = 16;
      columns = 16;
      mineCount = 40;
      break;
    case 'hard':
      rows = 16;
      columns = 30;
      mineCount = 99;
      break;
    case 'custom':
      rows = parseInt(settings.rows);
      columns = parseInt(settings.columns);
      mineCount = parseInt(settings.mines);
      return {
        type: types.SET_BOARD_CUSTOM_DIMENSIONS,
        rows,
        columns,
        mineCount
      };
    default:
      rows = 9;
      columns = 9;
      mineCount = 10;
  }

  return {
    type: types.SET_BOARD_DIMENSIONS,
    rows,
    columns,
    mineCount
  };
}

export function setGameSettings(settings) {
  return {
    type: types.SET_GAME_SETTINGS,
    rows: settings.rows,
    columns: settings.columns,
    mineCount: settings.mines
  };
}

export function newGame() {
  return (dispatch, getState) => {
    const state = getState();

    if (state.get('gameCount') === 0) {
      dispatch(updateBoardDimensions(state.get('difficulty')));
    }

    dispatch(newGameAction());
  }
}

export function updateDifficulty(difficulty, settings) {
  let settingsObj = {
    difficulty,
    rows: settings ? parseInt(settings.rows) : 0,
    columns: settings ? parseInt(settings.columns) : 0,
    mineCount: settings ? parseInt(settings.mines) : 0
  }
  return (dispatch, getState) => {
    dispatch({
      type: types.CHANGE_DIFFICULTY,
      difficulty: settings ? settingsObj : difficulty
    });

    dispatch(updateBoardDimensions(difficulty, settings))
    dispatch(newGameAction());
  };
}

export function updateGameSettings(settings) {
  return (dispatch, getState) => {
    dispatch(setGameSettings(settings))
    // dispatch(newGameAction());
  };
}

function newGameAction() {
  return {
    type: types.CONFIGURE_ROUND
  }
}

export function incrementTime() {
  return {
    type: types.INCREMENT_TIME
  };
}

export function endGame() {
  return {
    type: types.STOP_ROUND
  };
}

export function addUser(user) {
  return {
    type: types.ADD_USER,
    user
  };
}
