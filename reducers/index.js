import { combineReducers } from 'redux';

function favoriteReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [action.book, ...state];
  }
  return state;
}

export default combineReducers({
  favoriteList: favoriteReducer,
});
