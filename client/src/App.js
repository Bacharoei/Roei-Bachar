import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


//Redux 
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './action/auth';
import setAuthToken from './utils/setAuthToken';


import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import Mail from './components/posts/Mail';
import Posts from './components/posts/Posts';
import Alert from './components/layout/Alert'


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());

  }, []);

  return( 
<Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Alert />
      <section  className="container">
        <Switch>
          <Route  path="/login" component={Login} />
          <Route  path="/register" component={Register} />
          <Route  path="/profiles" component={Profiles} />
          {/* <Route  path="/profiles" component={ProfilesList} /> */}
          <PrivateRoute  path="/Dashboard" component={Dashboard} />
          <PrivateRoute  path="/posts/:id" component={Mail} />
          <PrivateRoute  path="/users/:id" component={Posts} />
          {/* <PrivateRoute  path="/posts" component={Posts} /> */}
        </Switch>
      </section>
    </Fragment>
  </Router>
</Provider>
)};


export default App;
