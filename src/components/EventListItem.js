import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const EventListItem = ({ id, title, descrition, startDate, endDate }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{title}</h3>
      <h2>{descrition}</h2>
    </Link>
  </div>
);

export default EventListItem;