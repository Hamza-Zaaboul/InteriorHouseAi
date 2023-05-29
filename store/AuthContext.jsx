import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/InitFirebase";
import Loading from "@/components/dashboardui/utils/Loading";

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
        <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-100 opacity-75 flex flex-col items-center justify-center">
          <div className="w-auto h-auto flex flex-col items-center justify-center absolute top-[40%] transform transition-y-[0%] ">
            <div class="loadering">
              <span className="inline-flex items-center gap-x-0.5 rounded-md  px-2 py-1 text-2xl font-semibold text-gray-900">
                CHARGEMENT EN COURS <span class="bullets">.</span>
              </span>
            </div>
            <Loading />
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
