import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import './stylesheets/styles.css';

import CreateClass from './components/CreateClass';
import SeatingChartContainer from './components/SeatingChartContainer';

const App = props => {
  return (
    <div className="router">
      <header>
        <h1>Welcome to Random Seat</h1>
      </header>
      <main className="main">
        <Routes>
          <Route path="class" element={<CreateClass />} />
          <Route path="seatingchart" element={<SeatingChartContainer />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;