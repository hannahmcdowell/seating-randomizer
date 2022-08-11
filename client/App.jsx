import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './stylesheets/styles.css';

import CreateClass from './components/CreateClass';
import SeatingChartContainer from './components/SeatingChartContainer';
import SignUp from './components/SignUp';

const App = props => {

  const [ username, setUsername ] = useState('');

  return (
    <div className="router">
      <header>
        <h1>Welcome to Random Seat</h1>
      </header>
      <main className="main">
        <Routes>
          <Route path="class" element={<CreateClass username={username} />} />
          <Route path="seatingchart" element={<SeatingChartContainer username={username}/>} />
          {/* <Route path="login" element={<Login setUsername={setUsername}/>} /> */}
          <Route path="/" element={<SignUp setUsername={setUsername}/>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;