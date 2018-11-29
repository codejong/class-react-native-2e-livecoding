import { combineReducers } from 'redux';

function favoriteListReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [action.book, ...state];
    // case 'REMOVE_FAVORITE':
    //   return [];
  }
  return state;
}

function settingReducer(state = { lang: 'ko' }, action) {
  return state;
}

export default combineReducers({
  favoriteList: favoriteListReducer,
  settings: settingReducer,
});
