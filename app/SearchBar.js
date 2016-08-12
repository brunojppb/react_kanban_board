import React, { Component } from 'react';

class SearchBar extends Component {

  render() {

    let style = {
      border: "1px dashed #bbb",
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      borderRadius: "3px"
    };

    return <input type="search" placeholder="search" style={style}/>
  }
}

export default SearchBar;
