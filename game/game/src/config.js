const path = "./src/resources/";

export const arrayImages = [
  {"src": `${path}images/heroes/Dzmitry.png`, "name": "Dzmitry.png"},
  {"src": `${path}images/heroes/Volha.png`, "name": "Volha.png"},
  {"src": `${path}images/heroes/Mazwai.png`, "name": "Mazwai.png"},
  {"src": `${path}images/enemies/heads.png`, "name": "heads.png"},
  {"src": `${path}images/enemies/bodies.png`, "name": "bodies.png"},
  {"src": `${path}images/enemies/legs.png`, "name": "legs.png"},
  {"src": `${path}images/enemies/weapons.png`, "name": "weapons.png"},
  {"src": `${path}images/spells/fireball.png`, "name": "fireball.png"},
  {"src": `${path}images/spells/icicle.png`, "name": "icicle.png"},
  {"src": `${path}images/spells/shock.png`, "name": "shock.png"},
  {"src": `${path}images/spells/quake1.png`, "name": "quake1.png"},
  {"src": `${path}images/spells/quake2.png`, "name": "quake2.png"},
  {"src": `${path}images/spells/quake3.png`, "name": "quake3.png"}
];

export const arraySounds = [
  {"src": `${path}sounds/spells/fireball.wav`, "name": "fireball.wav"},
  {"src": `${path}sounds/spells/freeze.wav`, "name": "freeze.wav"},
  {"src": `${path}sounds/spells/quake.flac`, "name": "quake.flac"},
  {"src": `${path}sounds/spells/shock.flac`, "name": "shock.flac"},
  {"src": `${path}sounds/spells/lava.wav`, "name": "lava.wav"},
  {"src": `${path}sounds/death.wav`, "name": "death.wav"},
  {"src": `${path}sounds/round.wav`, "name": "round.wav"}
];

export const arraySpells = [
  {
    name: 'ФаерБол',
    hp: 5,
    cost: 0,
    img: 'fireball.png',
    sound: 'fireball.wav',
    pos: [0, 0, 65, 19, 8]
  },
  {
    name:'Ледяная молния',
    hp: 10,
    cost: 10,
    img: 'icicle.png',
    sound: 'freeze.wav',
    pos: [0, 0, 66.5, 17, 8]
  },
  {
    name:'Молния',
    hp: 20,
    cost: 15,
    img: 'shock.png',
    sound: 'shock.flac',
    pos: [0, 0, 68, 19, 4]
  },
  {
    name:'Землятрясение',
    hp: 25,
    cost: 20,
    img: 'quake1.png',
    sound: 'quake.flac',
    pos: [0, 10, 110, 94, 6]
  },
  {
    name:'Оледенение',
    hp: 35,
    cost: 25,
    img: 'quake2.png',
    sound: 'freeze.wav',
    pos: [0, 10, 110, 94, 6]
  },
  {
    name:'Лава',
    hp: 50,
    cost: 35,
    img: 'quake3.png',
    sound: 'lava.wav',
    pos: [0, 10, 110, 94, 6]
  }
];

export const arrayEnemiesHead = [
  [0, 0, 172, 101],
  [172, 0, 172, 101],
  [344, 0, 172, 101]
];

export const arrayEnemiesBody = [
   [0, 0, 200, 118],
   [200, 0, 200, 118],
   [400, 1, 200, 118]
];

export const arrayEnemiesLegs = [
   [0, 0, 99, 109],
   [99, 0, 99, 109],
   [198, 0, 99, 109]
];

export const arrayEnemiesWeapon = [
   [15, 0, 68.8, 72],
   [68.8, 0, 68.8, 72],
   [137.6, 0, 68.8, 72],
   [206.4, 0, 68.8, 72]
];

export const movePosition = {
  start: [130, 400],
  finish: [300, 110]
};

export const spriteSize = [
  [32, 32],
  [32, 32],
  [64, 40]
];

export const animation = {
  plug: 0,
  move: 1,
  fight: 2,
  die: 3
}

export const spriteCount = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7]
];

export const enemyName = {
  adjective: ["Ужасный","Трепещущий","Властный","Властелин"],
  firstName: ["Огр","Орк","Гоблин","Монстр"],
  secondName: ["Том","Владимир","Петя"]
};

export const keyBoardEvent = {
  TAB: 9,
  ENTER: 13,
  NEXT: 39,
  PREV: 37,
  UP: 38,
  SPACE: 32,
  DOWN: 40,
  ESC: 27
}


export const fps = 6;

export const startPosSpellHero = [200, 450];
export const startPosSpellEnemy = [500, 400];
export const startPosHero = [-80, 400];
export const startPosEnemy = [600, 270];
export const reward = 15;
export const coinStart = 100;
export const MAX_VOLUME = 1;
export const MIN_VOLUME = 0;
export const DIE_SOUND = "death.wav";
export const NEWROUND_SOUND = "round.wav";
