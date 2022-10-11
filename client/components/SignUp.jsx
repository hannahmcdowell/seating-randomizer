import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const SignUp = (props) => {
  // enables rerouting upon successful user account creation
  const navigate = useNavigate();

  const [ possUsername, possUsernameOnChange ] = useInput('');
  const [ password, passwordOnChange ] = useInput('');
  const [ usernameError, setUsernameError ] = useState(null);
  const [ passwordError, setPasswordError ] = useState(null);

  useEffect(() => {
    setUsernameError(null);
  }, [possUsername]);
  
  useEffect(() => {
    setPasswordError(null);
  }, [password]);

  const signup = () => {
    // check if username or password is empty
    if (possUsername.trim() === '') {
      setUsernameError('Username is required');
      return;
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      return;
    } 

    const body = {
      username: possUsername,
      password
    };

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        // set the current user to be the logged in user
        props.setUsername(possUsername);
        // navigate to the seating chart page
        navigate('/seatingchart');
      })
      .catch(err => {
        console.log('SignUp fetch /api/signup: ERROR:', err);
      });
  }

  return (
    <div className="flexCenterContainer">
      <section className="inputBox">
        <header className="pageHeader">
          <h2>Sign Up</h2>
        </header>
        <article>
          <div className="inputField">
            <label htmlFor="username">Username:</label>
            <input name="username" value={possUsername} onChange={possUsernameOnChange} />
            <div>
              {usernameError ? (<span className="errorMsg">{usernameError}</span>) : null}
            </div>
          </div>
          <div className="inputField">
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" value={password} onChange={passwordOnChange} />
            <div>
              {passwordError ? (<span className="errorMsg">{passwordError}</span>) : null}
            </div>
          </div>
        </article>
        <div className="flexContainerBetween">
          <Link to="/login">
            <button type="button" className="btn-cancel">
              Login
            </button>
          </Link>
          <button type="button" className="btn" onClick={signup}>Sign Up</button>
        </div>
      </section>
    </div>
  );
};

export default SignUp;