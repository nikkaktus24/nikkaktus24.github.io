import React from 'react';
import Modal from '../components/modal-dialog'
import {sample} from 'lodash';
import CompareNumber from '../components/tasks/compareNumber/';
import Audition from '../components/tasks/Audition/';
import SimpleMath from '../components/tasks/simpleMath/';
import Draggable from '../components/tasks/draggable/';
import Translator from '../components/tasks/translator/';
import Complement from '../components/tasks/Complement/';
import ChooseCapital from '../components/tasks/ChooseCapital/';
import ChooseFlag from '../components/tasks/ChooseFlag/';
import ChooseFigure from '../components/tasks/ChooseFigure/';
import ChooseApproval from '../components/tasks/ChooseApproval/';

export default class TaskGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {task: ""};
  }

  generateTask() {
    const { status, cash, setCashCount, setStatus } = this.props;
    const arrayTasks = [
     <CompareNumber status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />,
      <Audition status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />,
      <SimpleMath status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />,
      <Draggable status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />,
      <Translator status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />,
      <Complement status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />,
      <ChooseCapital status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />,
      <ChooseFlag status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />,
      <ChooseFigure status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />,
      <ChooseApproval status={status} cash={cash} setCashCount={setCashCount} setStatus={setStatus} />
    ];
    return sample(arrayTasks);
  }

  componentDidMount() {
    this.setState({task: this.generateTask()});
  }

  render() {
    return (
      <Modal>
        {this.state.task}
      </Modal>
    );
  }
}
