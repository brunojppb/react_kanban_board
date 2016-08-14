import React, { Component, PropTypes } from 'react';
import Card from './Card';

class List extends Component {
  render() {
    {/* Map the cards to the component
    // And pass along the props from the parent
    // to child. That way, React keeps the ownership
    // of the props to the Parent component */}
    var cards = this.props.cards.map((card) => {
      return <Card key={card.id} id={card.id}
                    title={card.title}
                    description={card.description}
                    color={card.color}
                    tasks={card.tasks}
                    taskCallbacks={this.props.taskCallbacks} />
    });
    {/* Return the List itself with its cards */}
    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default List;
