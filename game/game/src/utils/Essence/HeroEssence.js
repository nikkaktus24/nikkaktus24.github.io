export default class HeroEssence {
  constructor(coord, pos, size, speed, frames, img) {
    this.coord = [...coord];
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this.frames = frames;
    this.hp = 100;
    this.frameIndex = 0;
    this.img = img;
  };

  resetCoord(coord) {
    this.coord = [...coord];
  }

  resetHp() {
    this.hp = 100;
  }

  takeHp(hp) {
    this.hp -= hp;
    if(this.hp <= 0) return true;
  }

  update(dt) {
    this.frameIndex += this.speed*dt;
  };

  render(object, dt, animation, isOnce, movePos) {
    let frame;
    if(this.speed > 0) {
        const max = this.frames.length;
        const idx = Math.floor(this.frameIndex);
        frame = this.frames[idx % max];
        if(isOnce && idx > max) this.frameIndex = 0;
        if(isOnce && idx == max) {
            return true;
        }
    }
    else {
        frame = 0;
    }
    if(movePos) {
      if(this.move(dt,movePos)) return true;
    }
    const x = this.pos[0] + frame * this.size[0];
    const y = this.size[1]*animation;
    object.drawImage(
      this.img
      ,x, y
      ,this.size[0], this.size[1]
      ,this.coord[0], this.coord[1]
      ,this.size[0]*4, this.size[1]*4
    );
  }

  move(dt, coord) {
    if(this.coord[0] < coord[0]) {
      this.coord[0] += this.speed * 10 * dt;
    } else {
      return true;
    }
  }
}
