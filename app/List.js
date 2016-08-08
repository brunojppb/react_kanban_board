import React, { Component } from 'react';
import Card from './Card';

class List extends Component {
  render() {
    // Map the cards to the component
    // And pass along the props from the parent
    // to child. That way, React keeps the ownership
    // of the props to the Parent component
    var cards = this.props.cards.map((card) => {
      return <Card id={card.id}
                    title={card.title}
                    description={card.description}
                    tasks={card.tasks} />
    });

    // Return the List itself with its cards
    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

export default List;
