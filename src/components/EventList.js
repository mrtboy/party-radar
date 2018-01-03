import React from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem';

export const EventList = (props) => (
  <div className="content-container">
    {props.events.length === 0 ? (
      <p>No Event</p>
    ): (
      props.events.map((event) =>
        <EventListItem key={event.id} {...event} />
      
      ))
    }
  </div>
);


const mapStateToProps = (state) => {
  return {
    events: state.events
  };
};

export default connect(mapStateToProps)(EventList);