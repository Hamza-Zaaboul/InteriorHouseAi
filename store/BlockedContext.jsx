import { createContext, useEffect, useState } from "react";
import getDocument from "../firebase/Firestore/getData";
import { useAuthContext } from "./AuthContext";

export const MyBlockedContexte = createContext(null);

const getPiecValue = async (uid) => {
  if (!uid) {
    return null;
  }

  const { result: userData, error: userError } = await getDocument(
    "users",
    uid
  );

  if (userError) {
    console.log(userError);
    return null;
  }

  return userData?.data()?.piec || null; // Utiliser l'opérateur de coalescence nulle pour vérifier si userData existe
};

export const MyCoinsProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [piec, setPiec] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchPiecValue = async () => {
        const value = await getPiecValue(user.uid);
        setPiec(value);
      };

      fetchPiecValue();

      const interval = setInterval(() => {
        fetchPiecValue();
        console.log("en cours de traitement")
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <MyCoinsContext.Provider value={piec || 0}>{children}</MyCoinsContext.Provider>
  );
};
