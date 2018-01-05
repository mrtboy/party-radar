import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Map from './Map';


const EventDetail = (props) => {
  return (
    <div>
      <div className="list-item">
        <h2 className="list-item__title">Description:</h2>
        <h3>{props.event.description}</h3>
      </div>
      <div className="list-item">
        <h2 className="list-item__title">Start At:</h2>
        <h3>{moment(props.event.startDate).format('MMMM Do, YYYY')}</h3>
      </div>
      <div className="list-item">
        <h2 className="list-item__title">End At:</h2>
        <h3>{moment(props.event.endDate).format('MMMM Do, YYYY')}</h3>
      </div>
      <div className="list-item">
        <h2 className="list-item__title">Type of Event:</h2>
        <h3>{props.event.type}</h3>
      </div>
      <div className="list-item">
        <h2 className="list-item__title">Location:</h2>
        <h3>{props.event.locationName}</h3>
      </div>
      <div className="list-item">
        <h2 className="list-item__title">Address:</h2>
        <h3>{props.event.address}</h3>
      </div>
      <Map event={props.event} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    map: state.map
  };
};


export default connect(mapStateToProps)(EventDetail);