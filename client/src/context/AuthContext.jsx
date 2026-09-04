import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
} from "../api/authApi";


const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadCurrentUser(){
            try {
                const user = await fetchCurrentUser()
                setCurrentUser(user)
            } catch (error) {
                console.log("Failed to fetch user: ", error)
                setCurrentUser(null);
            }
            finally{
                setLoading(false)
            }
        }
        loadCurrentUser();
    }, [])

    async function login(email, password){
        const user = await loginUser(email, password);
        setCurrentUser(user);
    }

    async function logout(){
        await logout();
        currentUser(null);
    }
    return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  return useContext(AuthContext);
}