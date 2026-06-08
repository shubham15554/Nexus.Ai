import react from 'react';
import {useState ,useEffect , createContext} from 'react';
import {io } from 'socket.io-client'
export const SocketContext = createContext(null);


export function  SocketProvider({children}){
     
    let [socket , setSocket ] = useState();

    useEffect(()=>{

      const newSocket = io("https://nexus-ai-26rh.onrender.com", {
        transports: ["websocket"], 
        withCredentials: true
      });
      
      setSocket(newSocket);
    } , [])


    return (
        
        (!socket) ?  <div className="flex justify-center items-center h-screen bg-[#0b0c10]">
              <div className="relative flex justify-center items-center">
                <div className="absolute w-12 h-12 rounded-full border border-emerald-500/20 blur-sm"></div>
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
              </div>
          </div>
        :<SocketContext.Provider value={{socket} } >
         {children}
        </SocketContext.Provider>
        
        
    )
}
