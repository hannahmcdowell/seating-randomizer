import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons'

// custom hook (note the call to useState) to handle input boxes
// prevents need for onChange handlers for each input
const useInput = init => {
  const [ value, setValue ] = useState(init);
  // the onChange function will invoke the setValue function passing in value from the target
  const onChange = e => {
    setValue(e.target.value);
  }
  // returns the value with the onChange function instead of setValue
  return [ value, onChange ];
}

const CreateClass = props => {
  // navigate is an instance of the useNavigate hook
  // enables rerouting upon successful class creation
  const navigate = useNavigate();

  // if the user is not logged in, redirect to root
  useEffect(() => {
    if (props.username === '') navigate('/', {replace: true});
  }, []);

  const [ period, periodOnChange ] = useInput('');
  const [ roster, rosterOnChange ] = useInput('');
  const [ periodError, setPeriodError ] = useState(null);
  const [ rosterError, setRosterError ] = useState(null);

  // if period changes, setPeriodError to be null (no error message displayed)
  useEffect(() => {
    setPeriodError(null);
  }, [period]);
  // if roster changes, setRosterError to be null (no error message displayed)
  useEffect(() => {
    setRosterError(null);
  }, [roster]);

  const saveClass = () => {
    // check if period or roster is empty
    if (period.trim() === '') {
      setPeriodError('Period is required');
      return;
    }
    if (roster.trim() === '') {
      setRosterError('Roster is required');
      return;
    } 
    const body = {
      username: props.username,
      period,
      roster
    };
    // use fetch to make a PATCH request to /api/class
    // upon successful PATCH request, navigate to SeatingChart
    fetch('/api/class', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Data returned from db in CreateClass frontend file', data);
    })
    .then(() => {
      navigate('/seatingchart');
    })
    .catch(err => {
      console.log('CreateClass fetch /api/class: ERROR:', err);
    });
  }

  return (
    <div className="flexCenterContainer">
      <section className="inputBox">
        <header className="pageHeader">
            <h2>Add a class<span className="icon"><FontAwesomeIcon icon={faSchool} /></span></h2>    
        </header>
        <article className="createClassCard">
          <div className="inputField">
            <label htmlFor="period">Period: </label>
            <input name="period" value={period} onChange={periodOnChange} />
            {periodError ? (<span className="errorMsg">{periodError}</span>) : null}
          </div>
          <div className="inputField">
            <label htmlFor="roster">Please enter roster with names separated by commas: </label>
            <div>
              <textarea name="roster" value={roster} onChange={rosterOnChange} />
            </div>
            {rosterError ? (<span className="errorMsg">{rosterError}</span>) : null}
          </div>
        </article>
        { /*routes to links may need to update depending on app functionality!*/ }
        <div className="flexContainerBetween">
          <Link to="/seatingchart">
            <button type="button" className="btn-cancel">
              Cancel
            </button>
          </Link>
          <button type="button" className="btn" onClick={saveClass}>Create</button>
        </div>
      </section>
    </div>
  );
}

export default CreateClass;