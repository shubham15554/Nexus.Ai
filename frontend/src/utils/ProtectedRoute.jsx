import React, { useContext } from "react";
import { Navigate, useLocation, useNavigation , useNavigate} from "react-router-dom";
import { AuthContext } from "../cotexts/authContext"; 

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  
  console.log("ProtectedRoute Status -> User:", user, "Loading:", loading);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0b0c10]">
              <div className="relative flex justify-center items-center">
                <div className="absolute w-12 h-12 rounded-full border border-emerald-500/20 blur-sm"></div>
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
              </div>
     </div>
    );
  }

  if (!user) {
    console.log("User not authenticated, redirecting to signin");
    return <Navigate to="/login" />;
  }


  return children;
};

export default ProtectedRoute;