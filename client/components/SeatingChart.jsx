import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// custom hook to handle asynchronous GET requests to DB
const useAsyncData = (username) => {
  const [ userData, setUserData ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    fetch(`/api/class?username=${username}`)
      .then(res => res.json())
      .then(classData => {
        setUserData(classData);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  return { userData, error, loading };
}

// custom hook (note call to useState) to handle input
// prevents need for onChange handlers for each input
const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  }
  return [ value, onChange ];
};

const SeatingChart = props => {
  // use custom hook to asychronously get user data
  // if login is implemented, change the arg to be the name of the user
  const { userData, error, loading } = useAsyncData('Hannah');
  const [ selectedPeriod, periodOnChange ] = useInput('');

  // TODO: add functionality to handle errors
  let radioButtons;
  if (!loading && !error) {
    radioButtons = userData.periods.map((period, i) => {
      return (
        <label key={period}>
          <input 
            type="radio" 
            value={period} 
            checked={selectedPeriod === period} 
            onChange={periodOnChange}
          />
          {period}
        </label>
      );
    });
  } 

  return (
    <section className="seatingChartContainer">
      <header className="pageHeader">
          <h2>Seating Chart</h2>    
      </header>
      <div className="sideBar">
        <p className="labelText">Periods:</p>
        <div className="radioButtons">
          {radioButtons}
        </div>
        <p className="labelText">Group Size:</p>
        <select>
          <option>Choose...</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
    </section>
  );
}

export default SeatingChart;