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

const Login = (props) => {
  // enables rerouting upon successful user account creation
  const navigate = useNavigate();

  const [ inputUser, inputUserOnChange ] = useInput('');
  const [ inputPass, inputPassOnChange ] = useInput('');
  const [ usernameError, setUsernameError ] = useState(null);
  const [ passwordError, setPasswordError ] = useState(null);
  const [ loginError, setLoginError ] = useState(null);

  useEffect(() => {
    setUsernameError(null);
    setLoginError(null);
  }, [inputUser]);
  
  useEffect(() => {
    setPasswordError(null);
    setLoginError(null);
  }, [inputPass]);

  const login = () => {
    // check if username or password is empty
    if (inputUser.trim() === '') {
      setUsernameError('Username is required');
      return;
    }
    if (inputPass.trim() === '') {
      setPasswordError('Password is required');
      return;
    } 

    const body = {
      username: inputUser,
      password: inputPass
    }

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Data returned from db in Login frontend file', data);
        // TO DO: if data is null (no user/pass match), 
        // display error message to user

        // set the current user to be the logged in user
        props.setUsername(inputUser);
        // navigate to the seating chart page
        navigate('/seatingchart');
      })
      .catch(err => {
        console.log('Login fetch /api/login: ERROR:', err);
      });
  }

  return (
    <div className="flexCenterContainer">
      <section className="inputBox">
        <header className="pageHeader">
          <h2>Log In</h2>
        </header>
        <article>
          <div className="inputField">
            <label htmlFor="username">Username:</label>
            <input name="username" value={inputUser} onChange={inputUserOnChange} />
            <div>
              {usernameError ? (<span className="errorMsg">{usernameError}</span>) : null}
            </div>
          </div>
          <div className="inputField">
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" value={inputPass} onChange={inputPassOnChange} />
            <div>
              {passwordError ? (<span className="errorMsg">{passwordError}</span>) : null}
            </div>
          </div>
          <div>
            {loginError ? (<span className="errorMsg">{loginError}</span>) : null}
          </div>
        </article>
        <div className="flexContainerBetween">
          <Link to="/">
            <button type="button" className="btn-cancel">
              Sign Up
            </button>
          </Link>
          <button type="button" className="btn" onClick={login}>Log In</button>
        </div>
      </section>
    </div>
  );
}

export default Login;