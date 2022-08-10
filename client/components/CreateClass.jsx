import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  const [ period, periodOnChange ] = useInput('');
  const [ roster, rosterOnChange ] = useInput('');
  const [ periodError, setPeriodError ] = useState(null);
  const [ rosterError, setRosterError ] = useState(null);

  const saveClass = () => {
    // check if period or roster is empty
    if (period.trim() === '') {
      setPeriodError('Period is required');
    }
    if (roster.trim() === '') {
      setRosterError('Roster is required');
    } else {
      const body = {
        period,
        roster
      };
      // use fetch to make a POST request to /api/class
      // upon successful POST request, navigate back to home
      // see these links: 
      // https://github.com/remix-run/react-router/blob/main/docs/upgrading/v5.md#use-usenavigate-instead-of-usehistory
      // https://reactrouter.com/docs/en/v6/hooks/use-navigate 
    }
  }

  // if period changes, setPeriodError to be null (no error message displayed)
  useEffect(() => {
    setPeriodError(null);
  }, [period]);
  // if roster changes, setRosterError to be null (no error message displayed)
  useEffect(() => {
    setRosterError(null);
  }, [roster]);

  return (
    <section className="createClass">
      <header className="pageHeader">
          <h2>Add a class</h2>    
      </header>
      <article className="createClassCard">
        <div className="createClassField">
          <label htmlFor="period">Period: </label>
          <input name="period" value={period} onChange={periodOnChange} />
          {periodError ? (<span className="errorMsg">{periodError}</span>) : null}
        </div>
        <div className="createClassField">
          <label htmlFor="roster">Please enter roster with names separated by commas: </label>
          <div>
            <textarea name="roster" value={roster} onChange={rosterOnChange} />
          </div>
          {rosterError ? (<span className="errorMsg">{rosterError}</span>) : null}
        </div>
      </article>
      { /*routes to links may need to update depending on app functionality!*/ }
      <Link to="/seatingchart" className="backLink">
        <button type="button" className="btn">
          Cancel
        </button>
      </Link>
      <button type="button" className="btn" onClick={saveClass}>Create</button>
    </section>
  );
}

export default CreateClass;