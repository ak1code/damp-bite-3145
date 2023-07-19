import React, { useReducer } from 'react';
import styles from './Login.module.css';

const initialState = {
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET_FIELDS':
      return initialState;
    default:
      return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform login or registration logic here, such as sending a request to the server

    // Reset the form fields
    dispatch({ type: 'RESET_FIELDS' });
  };

  const toggleForm = () => {
    dispatch({ type: 'RESET_FIELDS' });
    dispatch({ type: 'SET_FIELD', field: 'isRegistering', value: !state.isRegistering });
  };

  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.id, value: e.target.value });
  };

  const { email, password, name, confirmPassword, isRegistering } = state;

  const checkPasswordStrength = () => {
    // Implement your password strength logic here
    // Return a value (e.g., "weak", "medium", "strong") based on the password strength
    // You can use external libraries or custom functions to evaluate the password strength
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.loginHeading}>{isRegistering ? 'Register' : 'Login'}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegistering && (
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          {isRegistering && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          )}
          {isRegistering && (
            <div className={styles.passwordStrength}>
              <span>Password Strength:</span>
              <span>{checkPasswordStrength()}</span>
            </div>
          )}
          <button type="submit" className={styles.button}>
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <p className={styles.toggleFormText}>
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" className={styles.toggleFormLink} onClick={toggleForm}>
              {isRegistering ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
