import React from 'react';
import { connect } from 'react-redux';
import EventForm from './EventForm';
import { editEvent, removeEvent } from '../actions/events';


const EditEventPage = (props) => {
  return (
  <div className="content-container">
    <h1>Edit Event</h1>
    <EventForm 
      event={props.event}
      onSubmit={(event) => {
        props.dispatch(editEvent(props.event.id, event));
        props.history.push('/');
      }}
    />
    <button
      className="button"
      onClick={()=>{
        props.dispatch(removeEvent({id: props.event.id }));
        props.history.push('/');
      }}
    >
      Remove
    </button>
  </div>
  );
};


const mapStateToProps = ( state, props ) => {
  return {
    event: state.events.find((event) => event.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditEventPage);