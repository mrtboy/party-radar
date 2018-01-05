import React from 'react';
import { connect } from 'react-redux';
import EventForm from './EventForm';
import {addEventTodb} from '../actions/events';

export class AddEventPage extends React.Component {
  onSubmit = (event) => {
    this.props.addEvent(event);
    this.props.history.push('/create');
  }
  render() {
    return (
      <div className="content-container">
        <h1 className="list-header">Add New Event</h1>
        <EventForm onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEvent: (event) => dispatch(addEventTodb(event))
});

export default connect(undefined, mapDispatchToProps)(AddEventPage);