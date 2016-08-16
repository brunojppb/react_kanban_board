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
    let prevState = this.state;

    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    // create a new task
    let newTask = { id: Date.now(), name: taskName, done: false };
    // Create a new object and push the task to the array
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $push: [newTask] }
      }
    });
    // Set the new state
    this.setState({cards: nextState});

    // Call the API to save the new task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        // Throw an error if server response wasn't OK
        // So you can rever back the optimistic changes
        // made to the UI
        throw new Error("Server response wasn't OK");
      }
    })
    .then((jsonResponse) => {
      // when the server returns the new task ID
      // update it on React;
      newTask.id = jsonResponse.id;
      this.setState({ cards: nextState });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      // revert back to prev state
      this.setState(prevState);
    });
  }

  removeTask(cardId, taskId, taskIndex) {

    let prevState = this.state;

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
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error deleting tasks');
      }
    })
    .catch((error) => {
      this.setState(prevState);
      console.error("Delete error:", error);
    });
  }

  toggleTask(cardId, taskId, taskIndex) {

    let prevState = this.state;
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    // save a reference to the task's done value
    let newDoneValue;
    // Using the $apply command, you will change the done value to its opposite
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: (done) => {
                newDoneValue = !done;
                return newDoneValue;
              }
            }
          }
        }
      }
    });

    // set the new state
    this.setState({cards: nextState});

    // Call the API to toggle the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({ done: newDoneValue })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error toggle task');
      } else {
        console.log('OK! toogle!');
      }
    })
    .catch((error) => {
      this.setState(prevState);
      console.error('Error Toggle:', error);
    });
  }

  updateCardStatus(cardId, listId) {
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let card = this.state.cards[cardIndex];
    if (card.status !== listId) {
      let nextState = update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: listId }
          }
        }
      });
      this.setState(nextState);
    }
  }

  updateCardPosition(cardId, afterId) {
    // Only proceed if hovering over a different card
    if (cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
      let card = this.state.cards[cardIndex];
      let afterIndex = this.state.cards.findIndex((card) => card.id == afterId);
      let nextState = update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      });
      this.setState(nextState);
    }
  }


  render() {
    return < KanbanBoard cards={this.state.cards}
                        taskCallbacks={
                          {
                            toggle: this.toggleTask.bind(this),
                            remove: this.removeTask.bind(this),
                            add: this.addTask.bind(this)
                          }
                        }
                        cardCallbacks={
                          {
                            updateStatus: this.updateCardStatus.bind(this),
                            updatePosition: this.updateCardPosition.bind(this)
                          }
                        }/>
  }
}


export default KanbanBoardContainer;

//adilson.pb@gmail.com
