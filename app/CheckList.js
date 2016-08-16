import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Task from './Task';

class CheckList extends Component {

  checkInputKeyPress(event) {
    if(event.key === 'Enter') {
      this.props.taskCallbacks.add(this.props.cardId, event.target.value);
      event.target.value = '';
    }
  }

  render() {
    let tasks = this.props.tasks.map((task, taskIndex) => (

      <Task id={task.id}
              done={task.done}
              name={task.name}
              cardId={this.props.cardId}
              taskIndex={taskIndex}
              taskCallbacks={this.props.taskCallbacks}
              key={task.id} />
    ));

    return (
      <div className="checklist">
        <ul>
          <ReactCSSTransitionGroup transitionName="task"
                                    transitionEnterTimeout={300}
                                    transitionLeaveTimeout={300} >
          {tasks}
        </ReactCSSTransitionGroup>
          <input type="text"  className="checklist--add-task"
                              placeholder="Type in then hit enter to add a task"
                              onKeyPress={this.checkInputKeyPress.bind(this) }/>
        </ul>
      </div>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default CheckList;
