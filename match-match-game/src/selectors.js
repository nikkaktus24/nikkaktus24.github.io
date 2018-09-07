import {createSelector} from 'reselect';

const selectProfileSessionDomain = (state) => state.get('profile');
const selectGameSessionDomain = (state) => state.get('game');

export const makeSelectProfileSession = createSelector(
  selectProfileSessionDomain,
  (substate) => substate.toJS()
);

export const makeSelectGameSession = createSelector(
  selectGameSessionDomain,
  (substate) => substate.toJS()
);
