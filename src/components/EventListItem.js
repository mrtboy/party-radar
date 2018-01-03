import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const EventListItem = ({ id, title, description, startDate, endDate, address, location }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{title}</h3>
      <h2>{description}</h2>
      <p>{moment(startDate).format('MMMM Do, YYYY')}</p>
      <p>{address}</p>
      <p>{location}</p>
    </Link>
  </div>
);

export default EventListItem;