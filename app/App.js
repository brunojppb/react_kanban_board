import React, { Component } from 'react';
import ContactApp from './ContactApp';
import { render } from 'react-dom';

let contacts = [
  { name: "Bruno Paulino", email: "bruno@gmail.com" },
  { name: "Joao da silva", email: "joao@gmail.com" },
  { name: "Paulo Mario", email: "paulo@gmail.com" },
  { name: "Ruy Barsosa", email: "ruy@gmail.com" }
]

render(<ContactApp contacts={contacts} />, document.getElementById('root'));
