import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/InitFirebase";

const auth = getAuth(firebase_app);

export const AuthContextNav = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContextNav);

export const AuthContextNavProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContextNav.Provider value={{ user }}>
      
      {children}
      
      </AuthContextNav.Provider>
  );
};
