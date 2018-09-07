const initialState = {
  nickname: "unknown",
  skinId: "0",
  spellId: "",
  cash: 0,
  roundNumber: 0,
  resourceCache: {},
  notification: "unknown",
  status: "",//"INTRO_MOVEMENT",
  scene: "SCENE_LOADING",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SCENE':
      return { ...state, scene: action.payload }
    case 'SET_NICKNAME':
      return { ...state, nickname: action.payload }
    case 'SET_SKINID':
      return { ...state, skinId: action.payload }
    case 'SET_STATUS':
      return { ...state, status: action.payload }
    case 'SET_SPELLID':
      return { ...state, spellId: action.payload }
    case 'SET_CASHCOUNT':
      return { ...state, cash: action.payload }
    case 'SET_ROUNDNUMBER':
      return { ...state, roundNumber: action.payload }
    default:
      return state;
  }
  return state;
}
