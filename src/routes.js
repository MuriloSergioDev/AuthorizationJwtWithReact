import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
// import { Container } from './styles';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

export default function Routes() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />


        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
