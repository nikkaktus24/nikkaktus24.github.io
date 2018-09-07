import {
  arrayImages
  ,arrayEnemiesHead
  ,arrayEnemiesBody
  ,arrayEnemiesHand
  ,arrayEnemiesWeapon
} from '../../config';

export default class EnemyEssence {
  constructor(coord, name, hp, pos, images) {
    this.coord = coord;
    this.name = name;
    this.hp = hp;
    this.pos = pos;
    this.images = images;
    this.img = new Image();
    this.merge();
    this.once = true;
  };
  takeHp(hp) {
    this.hp -= hp;
    if(this.hp <= 0) return true;
  }
  merge() {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 308;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.images.heads
      ,this.pos.head[0], this.pos.head[1]
      ,this.pos.head[2], this.pos.head[3]
      ,30, 0
      ,this.pos.head[2], this.pos.head[3]
    );
    ctx.drawImage(
      this.images.bodies
      ,this.pos.body[0], this.pos.body[1]
      ,this.pos.body[2], this.pos.body[3]
      ,0, this.pos.head[3]-5
      ,this.pos.body[2], this.pos.body[3]
    );
    ctx.drawImage(
      this.images.legs
      ,this.pos.legs[0], this.pos.legs[1]
      ,this.pos.legs[2], this.pos.legs[3]
      , 75, this.pos.head[3]+this.pos.body[3]-20
      ,this.pos.legs[2], this.pos.legs[3]
    );
    ctx.drawImage(
      this.images.weapons
      ,this.pos.weapon[0], this.pos.weapon[1]
      ,this.pos.weapon[2], this.pos.weapon[3]
      ,-20, 40
      ,this.pos.weapon[2]*2, this.pos.weapon[3]*2
    );
    this.img.src = canvas.toDataURL("image/png");
  };
  render(ctx) {
    ctx.drawImage(this.img, this.coord[0], this.coord[1]);
  };
}
