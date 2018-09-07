import React from 'react';
import Modal from '../../components/modal-dialog/';
import ErrorBar from '../../components/error-bar/';
import style from './index.scss';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {};
  }

  onInputNickName(e) {
    e.preventDefault();
    const { current } = this.input;
    if(current.value.length > 12) {
      this.setState({error: true, errorName: "Твой ник не должен превышать 12 символов"});
    } else if (current.value.length < 4) {
      this.setState({error: true, errorName: "Твой ник должен быть больше 4 символов"},() => console.log(this.state));
    } else {
      this.props.setNickName(current.value);
      this.props.setScene(this.props.scene);
    }
  }

  render() {
    return (
      <Modal>
        <div className="login-screen">
          <h1>Выбор имени для игрока</h1>
          <p>Для того чтобы начать играть нужно дать имя игроку. Введи имя в поле.</p>
          <form onSubmit={this.onInputNickName.bind(this)}>
            <input ref={this.input} placeholder="Никнейм" type="text" name="nickname" required="required" />
            <button>Отправить</button>
          </form>
        </div>
        {(() => {
          if(this.state.error) {
            return <ErrorBar>{this.state.errorName}</ErrorBar>
          }
        })()}
      </Modal>
    )
  };
}
