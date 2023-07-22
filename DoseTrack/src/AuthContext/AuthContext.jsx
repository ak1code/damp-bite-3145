import {createContext,useState} from "react";


export const AuthContext=createContext();


export const AuthContextProvider = ({children}) => {

    const [user,setUser]=useState({
        authState:false,
        name:"",
        email:"",
        id:""
    });

    const [data,setData]=useState([]);

    const login=(name,email,id)=>{
        setUser({authState:true,name:name,email:email,id:id})  
    }

    const logout=()=>{
      setUser({authState:false,name:"",email:""})
    }
    
    const alarmData=(data)=>{
      setData(data)
    }

    
    
 return (<AuthContext.Provider value={{user,login,logout,alarmData,data}} >{children}</AuthContext.Provider>)
     
    };