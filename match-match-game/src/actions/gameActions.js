export function setSkirtId(id) {
  return {
    type: 'SET_SKIRTID',
    payload: id
  }
}

export function setDifficult(difficult) {
  return {
    type: 'SET_DIFFICULT',
    payload: difficult
  }
}

export function setResult(result) {
  return {
    type: 'SET_RESULT',
    payload: result
  }
}
