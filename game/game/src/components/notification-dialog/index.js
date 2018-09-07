import React from 'react';
import style from './index.scss';

export default class Dialog extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.setStatus(this.props.status);
    }, 2000);
  }

  render() {
      return (
          <div className="notification-dialog">
            {this.props.children}
          </div>
        );
      }
}
