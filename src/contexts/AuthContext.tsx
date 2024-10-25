import React, { useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../configuration";
import { onAuthStateChanged, User } from "firebase/auth";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [pending, setPending] = useState(true);
  
    useEffect(() => {
      onAuthStateChanged(firebaseAuth, (user) => {
        setCurrentUser(user);
        setPending(false);
        console.log("Logged in user: " + user?.email);
      });
    }, []);
  
    if(pending){
      return <>Loading...</>
    }
  
    return (
      <AuthContext.Provider
        value={{
          currentUser
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => useContext(AuthContext)