export function setSkinId(skinid) {
  return {
    type: 'SET_SKINID',
    payload: skinid
  }
}

export function setNickName(nick) {
  return {
    type: 'SET_NICKNAME',
    payload: nick
  }
}

export function setScene(scene) {
  return {
    type: 'SET_SCENE',
    payload: scene
  }
}

export function setStatus(status) {
  return {
    type: 'SET_STATUS',
    payload: status
  }
}

export function setSpellId(spellId) {
  return {
    type: 'SET_SPELLID',
    payload: spellId
  }
}

export function setCashCount(cashCount) {
  return {
    type: 'SET_CASHCOUNT',
    payload: cashCount
  }
}

export function setRoundNumber(number) {
  return {
    type: 'SET_ROUNDNUMBER',
    payload: number
  }
}
