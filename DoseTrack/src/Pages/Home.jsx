import React from 'react';
import styles from './Home.module.css';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import Navbar from '../Componant/Navbar';

const Home = () => {
  const { user, data } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Pill Reminder {user.authState ? user.name : ''}</h1>
      <section className={styles.featuresSection}>
        <div className={styles.feature}>
          <i className="fas fa-clock fa-3x"></i>
          <h3>Never Miss a Dose</h3>
          <p>Our pill reminder helps you stay on track with your medicine schedule, ensuring you never miss a dose.</p>
        </div>
        <div className={styles.feature}>
          <i className="fas fa-history fa-3x"></i>
          <h3>Track medicine History</h3>
          <p>Keep a record of your medicine history, including the dates and times of each dose you've taken.</p>
        </div>
        <div className={styles.feature}>
          <i className="fas fa-bell fa-3x"></i>
          <h3>Customizable Reminders</h3>
          <p>Set up personalized reminders based on your medicine schedule, dosage, and frequency.</p>
        </div>
        <div className={styles.feature}>
          <i className="fas fa-user-friends fa-3x"></i>
          <h3>Multiple User Support</h3>
          <p>Our pill reminder app allows multiple users to manage their medicine schedules on a single platform.</p>
        </div>
      </section>

      {data.length > 0 && (
        <div className={styles.cardSection}>
          
          {data.map((card) => (
            <div key={card.id} className={styles.reminderCard}>
              <h3>Medicine: {card.medicineName}</h3>
              <p>Reminder Time: {card.notificationTime}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
