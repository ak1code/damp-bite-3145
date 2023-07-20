import {createContext,useState} from "react";


export const AuthContext=createContext();


export const AuthContextProvider = ({children}) => {

    const [user,setUser]=useState({
        authState:false,
        name:"",
        email:""
    });

    const login=(name,email)=>{
        setUser({authState:true,name:name,email:email})  
    }

    const logout=()=>{
      setUser({authState:false,name:"",email:""})
    }


    
    
 return (<AuthContext.Provider value={{user,login,logout}} >{children}</AuthContext.Provider>)
     
    };