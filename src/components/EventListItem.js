import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const EventListItem = ({ id, title, description, eventDate, address, location }) => (
  
    <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{title}</h3>
      <span className="list-item__sub-title">{moment(eventDate).format('MMMM Do, YYYY')}</span>
    </div>
      <h3 className="list-item__data">{address}</h3>
    </Link>

);

export default EventListItem;