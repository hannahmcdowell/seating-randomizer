import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons'

import './stylesheets/styles.css';

import CreateClass from './components/CreateClass';
import SeatingChartContainer from './components/SeatingChartContainer';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = props => {

  const [ username, setUsername ] = useState('');

  return (
    <div className="router">
      <header>
        <h1>Seat Randomizer<span className="dice"><FontAwesomeIcon icon={faDice} /></span></h1>
      </header>
      <main className="main">
        <Routes>
          <Route path="class" element={<CreateClass username={username} />} />
          <Route path="seatingchart" element={<SeatingChartContainer username={username} setUsername={setUsername} />} />
          <Route path="login" element={<Login setUsername={setUsername}/>} />
          <Route path="/" element={<SignUp setUsername={setUsername}/>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;