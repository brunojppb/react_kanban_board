import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import 'babel-polyfill'
import update from 'react-addons-update';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'brunopaulino@gmail.com'
};

class KanbanBoardContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    fetch(API_URL+'/cards', { headers: API_HEADERS })
    .then((response) => response.json())
    .then((jsonResponse) => {
      console.log(jsonResponse);
      this.setState({ cards: jsonResponse });
    })
    .catch((error) => {
      console.log('there was a error parsing data', error);
    });
  }

  addTask(cardId, taskName) {
    console.log('added new task');
  }

  removeTask(cardId, taskId, taskIndex) {
    console.log('removed task');
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    // Create a new object without the task that will be deleted
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $splice: [[taskIndex, 1]] }
      }
    });

    //set the component state to the mutated object
    this.setState({ cards: nextState });

    // Call the API to remove the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    });
  }

  toggleTask(cardId, taskId, taskIndex) {
    console.log('toggled task');
  }

  render() {
    return < KanbanBoard cards={this.state.cards}
                        taskCallbacks={
                          {
                            toggle: this.toggleTask.bind(this),
                            remove: this.removeTask.bind(this),
                            add: this.addTask.bind(this)
                          }
                        }/>
  }
}


export default KanbanBoardContainer;
