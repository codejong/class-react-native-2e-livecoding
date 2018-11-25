import { combineReducers } from 'redux';
import _ from 'lodash';

function favoriteListReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [action.book, ...state];
    case 'REMOVE_FAVORITE':
      return _.filter(state, book => book.key !== action.book.key);
    default:
      break;
  }
  return state;
}

function settingsReducer(state = {}, action) {
  return state;
}

export default combineReducers({
  favoriteList: favoriteListReducer,
  settings: settingsReducer,
});
