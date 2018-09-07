import React from 'react';
import Loading from '../../components/loading/';
import {arrayImages, arraySounds} from '../../config';
import Sound from '../../utils/Sound'
import style from './index.scss';

export default class LoadingScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arrayPromise: [] };
  }

  load(img,sounds) {
    sounds.forEach((item) => {
      this.soundLoader(item);
    })
    img.forEach((item) => {
      this.imgLoader(item);
    });
    return Promise.all(this.state.arrayPromise);
  }

  imgLoader(url) {
    if(this.props.resourceCache[url.name]) {
      return this.props.resourceCache[url.name];
    } else {
      const img = new Image();
      const promise = new Promise((resolve,rejected) => {
        img.src = url.src;
        this.props.resourceCache[url.name] = img;
        img.onload = () => {
          resolve(img);
        };
      });
      this.state.arrayPromise.push(promise);
    }
  }

  soundLoader(url) {
    if(this.props.resourceCache[url.name]) {
      return this.props.resourceCache[url.name];
    } else {
      this.props.resourceCache[url.name] = new Sound(url.src);
    }
  }

  componentDidMount() {
    this.load(arrayImages, arraySounds)
      .then((response) => {
        this.props.setScene(this.props.scene);
      });
  }

  render() {
    return <Loading />
  };
}
