import { combineReducers } from 'redux-immutable';
import game from './game';
import profile from './profile';

export const rootReducer = combineReducers({
  game,
  profile
})
