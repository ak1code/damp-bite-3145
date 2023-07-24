import React, { useReducer,useEffect,useState } from 'react';
import styles from './Login.module.css';
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
  data:[],
  loading:false,
  error:false
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
       
       case "loading":{
        return {
          ...state,loading:true
        }
       }
    default:
      return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data,setData]=useState([]);
  const {user,login,logout}=useContext(AuthContext);
  

  useEffect(()=>{
    fetchData()
  },[])

  const  fetchData=async()=>{
    dispatch({type:"loading"})
    try {
    let res= await axios.get("https://api-server-mejj.onrender.com/users")
      // console.log(res.data)
     setData(res.data)
    } catch (error) {
     console.log(error)
    }
  }
  

  console.log(data)
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(state.isRegistering==false||state.isRegistering==undefined){
        let data1=data.find((ele)=>{
         return ele.email==state.email&&ele.password==state.password
        })
      
        if(data1){
             data.find((ele)=>{
             if(ele.email==state.email&&ele.password==state.password){
              login(ele.name,ele.email,ele.id)
             }
           })
          
          console.log("your are logedin")
        }else{
          console.log("something are wrong")
        }
    }
    else{
    
       try {
        await axios.post("https://api-server-mejj.onrender.com/users",{
        name:state.name,
        password:state.password,
        email:state.email
       });
       fetchData()
       } catch (error) {
        console.log(error)
       }
    }
    console.log(user.id)
  
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
    
  };

 if(user.authState){
  return <Navigate to="/" />
 }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logo}>
        <img className={styles.logoImage} src='../../Image/DoseTrack.png' />
      </div>
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
