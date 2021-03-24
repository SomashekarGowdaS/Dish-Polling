import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { startLogout } from './actions/loginActions';
import Login from './containers/Login'
import PollsContainer from './containers/Polls';
import Results from './containers/Results';

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
      { Object.keys(loggedUser).length !== 0 && <ul>
        <li onClick={handleLogout} > <Link to='#' > Logout </Link> </li>
        <li> <Link to='/polls' > Dishes </Link> </li>
        <li> <Link to='/results' > Results </Link> </li>
      </ul>}
      <Route path="/" component={Login} exact={true} />
      <Route path="/polls" component={PollsContainer} />
      <Route path="/results" component={Results} />
    </div>
  );
}

export default withRouter(App);
