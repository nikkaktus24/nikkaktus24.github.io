export default class SpellEssence {
  constructor(coordFrom, coordTo, hp, img, sound, pos, speed, isHero) {
    this.coordFrom = [...coordFrom];
    this.coordTo = [...coordTo];
    this.hp = hp;
    this.img = img;
    this.sound = sound;
    this.pos = pos
    this.speed = speed;
    this.isHero = isHero;
    this.frameIndex = 0;
  };

  update(dt) {
    this.frameIndex += this.speed*dt;
  };

  render(object, dt) {
    const max = this.pos[4];
    const idx = Math.floor(this.frameIndex);
    const frame = this.pos[4] - (idx % max);
    this.sound.play();
    this.move(dt);
    if(this.isHero) {
      if(this.coordFrom[0] >= this.coordTo[0]) {
        this.sound.pause();
        return true;
      }
    } else {
      if(this.coordFrom[0] <= this.coordTo[0]) {
        this.sound.pause();
        return true;
      }
    }
    const x = this.pos[0] + frame * this.pos[2];
    const y = this.pos[1];
    object.drawImage(
      this.img
      ,x, y
      ,this.pos[2], this.pos[3]
      ,this.coordFrom[0], this.coordFrom[1]
      ,this.pos[2]*3, this.pos[3]*3
    );
  };

  move(dt) {
    if(this.isHero) {
      this.coordFrom[0] += this.speed*20 * dt;
    } else {
      this.coordFrom[0] -= this.speed*20 * dt;
    }
  }
}
