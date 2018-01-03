import React from 'react';
import {Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AddEventPage from '../components/AddEventPage';
import EditEventPage from '../components/EditEventPage';
import EventList from '../components/EventList';

export const history = createHistory();

const AppRouter = () => (
<Router history={history}>
    <div>
     
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/create" component={AddEventPage} />
        <PrivateRoute path="/edit/:id" component={EditEventPage} />
        <PrivateRoute path="/eventList" component={EventList} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
</Router>
);

export default AppRouter;