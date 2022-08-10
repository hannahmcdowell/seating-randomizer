import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import CreateClass from './components/CreateClass';
import SeatingChart from './components/SeatingChart';

const App = props => {
  return (
    <div className="router">
      <main className="main">
        <Routes>
          <Route path="class" element={CreateClass} />
          <Route path="seatingchart" element={SeatingChart} />
        </Routes>
      </main>
    </div>
  );
};

export default App;