import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/InitFirebase";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div
          class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-600 opacity-75 flex flex-col items-center justify-center"
        >
          <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-900 h-12 w-12 mb-4"></div>
          <h2 class="text-center text-black text-xl font-semibold">
            Loading...
          </h2>
          <p class="w-1/3 text-center text-black">
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
