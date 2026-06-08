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
        
        (!socket) ?  <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
        :<SocketContext.Provider value={{socket} } >
         {children}
        </SocketContext.Provider>
        
        
    )
}
