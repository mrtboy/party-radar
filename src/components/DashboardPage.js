import React from 'react';
import EventListFilter from './EventListFilter';
import EventList  from './EventList';

const DashboardPage = () => (
  <div>
    <EventListFilter />
    <EventList />
  </div>
);

export default DashboardPage;
