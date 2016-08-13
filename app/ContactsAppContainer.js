import React, { Component, PropTypes } from 'react';
import render from 'react-dom';
import 'whatwg-fetch';
import ContactApp from './ContactApp';

class ContactsAppContainer extends Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    fetch('./contacts.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ contacts: responseData })
    })
    .catch((error) => {
      console.log("Error fetching contacts", error)
    });
  }

  render() {
    return (
      <ContactApp contacts={this.state.contacts} />
    );
  }
}

export default ContactsAppContainer;
