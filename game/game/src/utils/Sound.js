import {MAX_VOLUME} from '../config';

export default class Sound {
  constructor(url) {
    this.sound = new Audio();
    this.sound.src = url;
    this.playing = false;
  }

  static setVolume(value) {
    return this.volume = value;
  }

  isPlaying() {
    return this.playing;
  }

  end() {
    return this.sound.currentTime == this.sound.duration;
  }

  play() {
    if(!this.isPlaying() || this.end()) {
      this.sound.volume = Sound.volume;
      this.sound.play();
      this.playing = true;
    }
  }

  pause() {
    this.sound.pause();
    this.playing = false;
  }

}

Sound.volume = MAX_VOLUME;
