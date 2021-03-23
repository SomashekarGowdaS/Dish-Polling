import React from 'react'
import { Route } from 'react-router'
import Login from './containers/Login'
import PollsContainer from './containers/Polls';

function App() {
  return (
    <div>

      <Route path="/" component={Login} exact={true} />
      <Route path="/polls" component={PollsContainer} />
    </div>
  );
}

export default App;
