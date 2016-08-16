import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Task extends Component {
  render() {
    return(
        <li className="checklist__task">
          <input type="checkbox" defaultChecked={this.props.done} key={this.props.name} onChange={
              this.props.taskCallbacks.toggle.bind(null, this.props.cardId, this.props.id, this.props.taskIndex) }/>
            {this.props.name}
          <a href="#" className="checklist__task--remove" onClick={
              this.props.taskCallbacks.remove.bind(null, this.props.cardId, this.props.id, this.props.taskIndex) }/>
        </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  cardId: PropTypes.number.isRequired,
  taskIndex: PropTypes.number.isRequired,
  taskCallbacks: PropTypes.object.isRequired
};

export default Task;
