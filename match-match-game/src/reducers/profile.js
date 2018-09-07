import {fromJS} from 'immutable';

const initialState = fromJS({
  foreName: "none",
  familyName: "none",
  email: "none"
});

export default function profile(state = initialState, action) {
  switch (action.type) {
    case 'SET_MAINDATA':
      return state
        .set('foreName', action.payload.foreName)
        .set('familyName', action.payload.familyName)
        .set('email', action.payload.email)
    default:
      return state;
  }
}
