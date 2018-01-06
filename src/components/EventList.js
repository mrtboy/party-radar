import React from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem';
import getVisibleEvents from '../selectors/events';

export const EventList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <h3>Title</h3>
      <h3>Place</h3>
    </div>
    <div  className="list-body">

    {props.events.length === 0 ? (
      <div className="list-item list-item--message">
      <p>No Event</p>
      </div>
    ): (
      props.events.map((event) =>
        <EventListItem key={event.id} {...event} />
      
      ))
    }
    </div>
  </div>
);


const mapStateToProps = (state) => {
  return {
    events: getVisibleEvents(state.events, state.filters)
  };
};

export default connect(mapStateToProps)(EventList);