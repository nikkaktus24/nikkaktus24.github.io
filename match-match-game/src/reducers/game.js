import {fromJS} from "immutable";

const initialState = fromJS({
  skirtId: "skirt-one",
  difficult: "easy"
});

export default function game(state = initialState, action) {
  switch (action.type) {
    case 'SET_SKIRTID':
      return state
        .set('skirtId', action.payload)
    case 'SET_DIFFICULT':
      return state
        .set('difficult', action.payload)
    default:
      return state;
  }
}
