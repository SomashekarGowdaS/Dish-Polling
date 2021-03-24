import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, withRouter } from 'react-router'
import { startLogout } from './actions/loginActions';
import Login from './containers/Login'
import PollsContainer from './containers/Polls';
import Results from './containers/Results';
import AppBar from './containers/AppBar'

function App(props) {
  const loggedUser = useSelector((state) => {
    return state.users.loggedUser;
  })
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout(props.history.push));
  }

  return (
    <div>
      <AppBar loggedUser={loggedUser} handleLogout={handleLogout} />
      <Route path="/" component={Login} exact={true} />
      <Route path="/polls" component={PollsContainer} />
      <Route path="/results" component={Results} />
    </div>
  );
}

export default withRouter(App);
