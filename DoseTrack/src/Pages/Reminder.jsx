import React, { useReducer } from 'react';
import styles from './Reminder.module.css';

const initialState = {
  medicationName: '',
  dosage: '',
  frequency: '',
  notificationTime: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEDICATION_NAME':
      return { ...state, medicationName: action.payload };
    case 'SET_DOSAGE':
      return { ...state, dosage: action.payload };
    case 'SET_FREQUENCY':
      return { ...state, frequency: action.payload };
    case 'SET_NOTIFICATION_TIME':
      return { ...state, notificationTime: action.payload };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

const Reminder = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform logic to save the reminder data or send it to the server

    // Reset the form fields
    dispatch({ type: 'RESET_FORM' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };

  return (
    <div className={styles.createReminder}>
      <h2>Create Pill Reminder</h2>
      <form className={styles.reminderForm} onSubmit={handleFormSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="medicationName">Medication Name:</label>
          <input
            type="text"
            id="medicationName"
            name="medicationName"
            value={state.medicationName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dosage">Dosage:</label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            value={state.dosage}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="frequency">Frequency:</label>
          <input
            type="text"
            id="frequency"
            name="frequency"
            value={state.frequency}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="notificationTime">Notification Time:</label>
          <input
            type="text"
            id="notificationTime"
            name="notificationTime"
            value={state.notificationTime}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Save Reminder
        </button>
      </form>
    </div>
  );
};

export default Reminder;
