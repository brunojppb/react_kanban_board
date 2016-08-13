import React, { Component, PropTypes } from 'react';
import SearchBar from './SearchBar';
import ContactList from './ContactList';

// The only stateful component
// renders searchBar and ContactList
// Passes down filterText state and handleUserInput callback as props
// That way, the children can send messages to the parent

class ContactApp extends Component {

  constructor() {
    super();
    this.state = {
      filterText: ''
    };
  }

  handleUserInput(text) {
    this.setState({ filterText: text });
  }

  render() {
    return(
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <ContactList contacts={this.props.contacts} filterText={this.state.filterText}/>
      </div>
    );
  }
}

ContactApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
};

export default ContactApp;
