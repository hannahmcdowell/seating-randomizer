import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

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
  // navigate is an instance of the useNavigate hook
  // enables rerouting upon successful class creation
  const navigate = useNavigate();
  
  useEffect(() => {
    if (props.username === '') navigate('/', {replace: true});
  }, []);

  // use custom hook to asychronously get user data
  const { userData, error, loading } = useAsyncData(props.username);
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
        <div>
          <label className="radioLabel" key={period}>
            <input 
              type="radio" 
              value={period} 
              checked={selectedPeriod === period} 
              onChange={periodOnChange}
            />
            {period}
          </label>
        </div>
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

  // Function to logout the user
  const logout = () => {
    setUsername('');
  };

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
      <div className="sideBar">
          <Link to="/class">
            <button type="button" className="btn-add">
              Add a class
            </button>
          </Link>
        <div className="inputBox">
          <header className="pageHeader">
              <h2>Groups<span className="icon"><FontAwesomeIcon icon={faPeopleGroup} /></span></h2>    
          </header>
          <div className="inputField">
            <p className="labelText">Choose a Period:</p>
            <div className="radioButtons">
              {radioButtons}
            </div>
            {periodError ? (<span className="errorMsg">{periodError}</span>) : null}
          </div>
          <div className="inputField">
            <p className="labelText">Group Size:</p>
            <select value={selectedGroupSize} onChange={groupSizeOnChange}>
              <option>Choose...</option>
              {groupSizeOptions}
            </select>
            {groupSizeError ? (<span className="errorMsg">{groupSizeError}</span>) : null}
          </div>
          <div className="inputField">
            <button type="button" className="btn" onClick={handleClick}>Roll the dice!</button>
          </div>
        </div>
          <Link to="/">
            <button type="button" className="btn-logout" onClick={logout}>
              Log out
            </button>
          </Link>
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