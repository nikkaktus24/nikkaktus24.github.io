import React from 'react';
import Modal from '../../components/modal-dialog/';
import ErrorBar from '../../components/error-bar/';
import style from './style';
import history from '../../utils/history';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.form = React.createRef();
    this.state = {};
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { foreName, familyName, email } = this.form.current;
    const { setMainData, path } = this.props;
    if(foreName.value.length < 2) {
      return this.setState({error: true, errorName: "Имя не может быть меньше 2х символов"});
    } else if(familyName.value.length < 2) {
      return this.setState({error: true, errorName: "Фамилия не может быть меньше 2х символов"});
    } else if(email.value.search(/@/) == -1) {
      return this.setState({error: true, errorName: "Невалидный email"});
    }
    setMainData({
      foreName: foreName.value,
      familyName: familyName.value,
      email: email.value
    });
    history.push(path);
  }

  render() {
    return (
      <Modal>
        <div className="login-screen">
          <h1>Log In</h1>
          <p>Fill in profile form</p>
          <form ref={this.form} onSubmit={this.onFormSubmit}>
            <input placeholder="Fore Name" type="text" name="foreName" required="required" />
            <input placeholder="Family Name" type="text" name="familyName" required="required" />
            <input placeholder="Email" type="email" name="email" required="required" />
            <button className="active-button">Отправить</button>
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
