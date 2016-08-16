import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import constants from './constants';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id);
  }
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class List extends Component {
  render() {

    const { connectDropTarget } = this.props;

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
                    status={card.status}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}/>
    });
    {/* Return the List itself with its cards */}
    return connectDropTarget(
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
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collectDrop)(List);
