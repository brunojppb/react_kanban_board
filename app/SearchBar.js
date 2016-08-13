import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {

  handleChange(event) {
    this.props.onUserInput(event.target.value);
  }

  render() {

    let style = {
      border: "1px dashed #bbb",
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      borderRadius: "3px"
    };

    return <input type="search"
                  placeholder="search"
                  style={style}
                  value={this.props.filterText} onChange={this.handleChange.bind(this)}/>
  }
}

SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired
};

export default SearchBar;
