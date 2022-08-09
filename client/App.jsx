import React, { Component } from 'react';
import { Switch, Route, } from 'react-router-dom';

import CreateClass from './components/CreateClass.jsx';
import SeatingChart from './components/SeatingChart';

const App = props => {
  return (
    <div className="router">
      <main className="main">
        <Switch>
          <Route exact path='/class' component={CreateClass} />
          <Route exact path='/seatingchart' component={SeatingChart} />
        </Switch>
      </main>
    </div>
  );
};

export default App;