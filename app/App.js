import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import { render } from 'react-dom';
let cardsList = [
  {
    id: 1,
    title: 'Read the Pro React book',
    description: "I should read the whole book",
    color: '#BD8D31',
    status: 'in-progress',
    tasks: []
  },
  {
    id: 1,
    title: 'Implement the Rails backend. This title is big enough to trigger the custom validator tha constrains the title length to 80 characters',
    description: "I should read the whole book",
    color: '#BD8D31',
    status: 'done',
    tasks: []
  },
  {
    id: 2,
    title: 'Write a React application',
    description: "**I need to write** an useful tool using React. Go to my [website](http://www.bpaulino.com.br)",
    color: '#3A7E28',
    status: 'to-do',
    tasks: [
      {
        id: 1,
        name: 'Planning the data model',
        done: true
      },
      {
        id: 2,
        name: 'Write the Rails backend',
        done: false
      },
      {
        id: 3,
        name: 'Call some friends to help me out',
        done: false
      }
    ]
  }
];

render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));
