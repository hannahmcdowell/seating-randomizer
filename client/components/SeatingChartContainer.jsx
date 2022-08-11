import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SeatingChart from './SeatingChart';

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
// if the form has already been submitted, reset the form submittal to be false
const useInput = (init, bool, resetBool) => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
    if (bool) resetBool(false);
  }
  return [ value, onChange ];
};

const SeatingChartContainer = props => {
  // use custom hook to asychronously get user data
  // if login is implemented, change the arg to be the name of the user
  const { userData, error, loading } = useAsyncData('Hannah');
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ selectedPeriod, periodOnChange ] = useInput('', isSubmitted, setIsSubmitted);
  const [ selectedGroupSize, groupSizeOnChange ] = useInput('', isSubmitted, setIsSubmitted);
  const [ periodError, setPeriodError ] = useState(null);
  const [ groupSizeError, setGroupSizeError ] = useState(null);
  const [ roster, setRoster ] = useState(null);

  // TODO: add functionality to handle errors from data retrieval
  // Create jsx for radio buttons based on the user's possible periods
  let radioButtons;
  if (!loading && !error) {
    radioButtons = userData.periods.map((period) => {
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

  // Create jsx for possible group sizes
  const groupSizeOptions = [];
  for (let i = 2; i <= 8; i++) {
    groupSizeOptions.push(
      <option key={'option' + i} value={i}>{i}</option>
    );
  }

  // If the period changes, setPeriodError to be null (no error message displayed)
  useEffect(() => {
    setPeriodError(null);
  }, [selectedPeriod]);

  // If the group size changes, setGroupSizeError to be null
  useEffect(() => {
    setGroupSizeError(null);
  }, [selectedGroupSize])

  // Function to handle the submission of the period and the group size
  const handleClick = () => {
    if (selectedPeriod === '') {
      setPeriodError('Please choose a period.');
      return;
    }
    if (selectedGroupSize === '' || selectedGroupSize === 'Choose...') {
      setGroupSizeError('Please choose a group size.');
      return;
    }
    for (let i = 0; i < userData.classes.length; i++) {
      if (userData.classes[i].period === selectedPeriod) {
        setRoster(userData.classes[i].roster);
        break;
      }
    }
    setIsSubmitted(true);
  };

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
        {periodError ? (<span className="errorMsg">{periodError}</span>) : null}
        <p className="labelText">Group Size:</p>
        <select value={selectedGroupSize} onChange={groupSizeOnChange}>
          <option>Choose...</option>
          {groupSizeOptions}
        </select>
        {groupSizeError ? (<span className="errorMsg">{groupSizeError}</span>) : null}
        <div>
          <button type="button" className="btn" onClick={handleClick}>Create seating chart</button>
        </div>
      </div>
      {isSubmitted 
        ? <SeatingChart 
            period={selectedPeriod}
            groupSize={selectedGroupSize}
            classRoster={roster}
          /> 
        : null}
    </section>
  );
}

export default SeatingChartContainer;