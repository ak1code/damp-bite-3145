
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext/AuthContext';
import styles from './Reminder.module.css';
import Popup from '../Componant/Popup';

const API_BASE_URL = 'https://api-server-mejj.onrender.com'; 

const Remainder = () => {
  const { alarmData,user } = useContext(AuthContext);
  
  const [isAlarmPlaying, setAlarmPlaying] = useState(false)
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [notificationTime, setNotificationTime] = useState('');
  const [alarms, setAlarms] = useState([]);
  const [alarmMessage, setAlarmMessage] = useState('');
  const [alarmTimes, setAlarmTimes] = useState([]); 
  const [loading,setLoading]=useState(false)
  const [id,setId]=useState("");
  const [audioObject, setAudioObject] = useState(null);


  const playAlarmSound = () => {
    const audio = new Audio("../../AlarmSound/rington.mp3");
    audio.play();
    setAudioObject(audio)
  };

  console.log(id)

      useEffect(() => {
        if (!isPopupOpen && isAlarmPlaying) {
          setAlarmPlaying(false);
        }
      }, [isPopupOpen, isAlarmPlaying]);
      
    
    useEffect(() => {
      setId(user.id);
    }, [user]);
    
    useEffect(() => {
      fetchAlarms();

    }, [id]);


   useEffect(()=>{
      
    const combinedInterval = setInterval(() => {
      checkAlarmClock();
    }, 60000);

    return ()=>{
      clearInterval(combinedInterval);
    } 

  },[])


 
  
    const handlePopupClose = () => {
      setPopupOpen(false);
    };
    
    const stopAlarmSound = () => {
      if (audioObject) {
        audioObject.pause();
      }
    };

  const fetchAlarms = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/alarms?userid=${id}`); 
      setAlarms(response.data);
      setLoading(false)
      alarmData(response.data)
    } catch (error) {
      console.error('Error fetching alarm data:', error);
      setLoading(false)
    }
  };

  const setAlarmTimeHandler = (event) => {
    event.preventDefault();
    const inputAlarmTimeModified = event.target.value;
    setNotificationTime(inputAlarmTimeModified);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (medicineName && notificationTime) {
      const inputAlarmTimeModified = notificationTime;
      const alarmData = {
        userid:id,
        medicineName: medicineName,
        notificationTime: inputAlarmTimeModified,
      };

      
      try {
         await axios.post("https://api-server-mejj.onrender.com/alarms", alarmData); 
        setMedicineName('');
        setNotificationTime('');
        setPopupMessage(`Reminder set for ${medicineName} at ${inputAlarmTimeModified}`);
        setPopupOpen(true);
        fetchAlarms()
      } catch (error) {
        console.error('Error saving alarm data:', error);
      }
    } else {
      alert('Please enter Medicine name and set time.');
    }
  };

  

  const checkAlarmClock = () => {
    // console.log("check alaram call")
    if (alarms.length === 0) {
      setAlarmMessage('Please set your Reminder.');
    } else {
       console.log("alaram lenght:"+alarms.length)
      setAlarmMessage(`Your Reminder are set for ${alarmTimes.join(', ')}.`);
      const currentTimeWithSeconds = new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0,5);
      alarms.forEach((alarmTime) => {
        // console.log("current Time:"+currentTimeWithSeconds)
        // console.log("NotificationTime:"+alarmTime.notificationTime.substring(0,5));
        // console.log("are equal :"+currentTimeWithSeconds === alarmTime.notificationTime.substring(0,5))
        if (currentTimeWithSeconds === alarmTime.notificationTime.substring(0,5)) {
          handleAlarmTrigger(alarmTime);
        }
      });
    }
  };
  const interval = setInterval(checkAlarmClock, 60000);
  const handleDeleteCard = async(id) => {

      try {
        await axios.delete(`https://api-server-mejj.onrender.com/alarms/${id}`);
        fetchAlarms()
      } catch (error) {
        console.log(error)
      }
   
  };

  
  const handleAlarmTrigger = (alarmTime) => {
    setPopupMessage(`Time to take your Medicine set for ${alarmTime.notificationTime}!`);
    setPopupOpen(true);
    setAlarmPlaying(true); 
    playAlarmSound();
  };



  return (
    <div className={styles.reminderContainer}>
      <h1>Take Control of Your Health: Set Pill Reminders Here</h1>
      {/* <h2>It is {currentTime}</h2> */}
      {/* <h2>{alarmMessage}</h2>  */}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="medicineName">Medicine Name:</label>
          <input
            type="text"
            id="medicineName"
            name="medicineName"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="notificationTime">Set Time:</label>
          <input
            type="time"
            id="notificationTime"
            name="notificationTime"
            value={notificationTime}
            onChange={setAlarmTimeHandler}
          />
        </div>
        <button type="submit">Set Alarm</button>
      </form>

      {alarms.length > 0 && (
        <div className={styles.reminderCardContainer}>
          {loading && <h1>Loading....</h1>}
          <h2>Reminder Cards</h2>
          {alarms.map((card) => (
            <div key={card.id} className={styles.reminderCard}>
              <h3>Medicine: {card.medicineName}</h3>
              <p>Reminder Time: {card.notificationTime}</p>
              <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      
      {isPopupOpen && <Popup message={popupMessage} onClose={handlePopupClose} onStop={stopAlarmSound}  />}
    </div>
  );
};

export default Remainder;
