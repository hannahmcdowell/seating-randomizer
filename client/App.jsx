import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import CreateClass from './components/CreateClass';
import SeatingChart from './components/SeatingChart';

const App = props => {
  return (
    <div className="router">
      <main className="main">
        <Routes>
          <Route path='/class' component={CreateClass} />
          <Route path='/seatingchart' component={SeatingChart} />
        </Routes>
      </main>
    </div>
  );
};

export default App;