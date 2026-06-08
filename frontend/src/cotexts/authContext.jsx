import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkUserOnRefresh = async () => {
      try {
        const res = await axios.get("https://nexus-ai-26rh.onrender.com/api/auth/profile", { withCredentials: true });
        if (res.data.user) {
          setUser(res.data.user);
        }
        else {
          console.log("No active session found");
          setUser(null);
        }
      } catch (err) {
        console.log("No active session found");
        setUser(null);
      } finally {
        
        setLoading(false); 
      }
    };
    checkUserOnRefresh();
  }, []);

  const handleRegister = async (username, email, password) => {
    try {
      setLoading(true);
      let res = await axios.post("https://nexus-ai-26rh.onrender.com/api/auth/register", { username, email, password }, { withCredentials: true });

      if (res.data.success) {
        setUser(res.data.user);
        return res.data.msg;
      } else {
        throw new Error(res.data.error);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      let res = await axios.post("https://nexus-ai-26rh.onrender.com/api/auth/login", { email, password }, { withCredentials: true });
      console.log("login result of context" , res);
      if (res.data.success) {
        setUser(res.data.user);
        return res.data.msg; 
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, handleRegister, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};