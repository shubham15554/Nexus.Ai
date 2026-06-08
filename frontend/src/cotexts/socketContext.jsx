import react from 'react';
import {useState ,useEffect , createContext} from 'react';
import {io } from 'socket.io-client'
export const SocketContext = createContext(null);


export function  SocketProvider({children}){
     
    let [socket , setSocket ] = useState();

    useEffect(()=>{

      const newSocket = io("http://localhost:8000", {
        transports: ["websocket"], 
        withCredentials: true
      });
      
      setSocket(newSocket);
    } , [])


    return (
        
        (!socket) ? <p>Socket is connecting</p>
        :<SocketContext.Provider value={{socket} } >
         {children}
        </SocketContext.Provider>
        
        
    )
}
