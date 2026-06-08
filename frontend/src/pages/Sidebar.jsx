// src/components/Sidebar.jsx
import React from 'react';
import { useState , useContext } from 'react';
import { History, MessageSquare, Plus, Settings, LogOut,Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { SocketContext } from '../cotexts/socketContext';
import {toast} from 'react-toastify';
export default function Sidebar({ isOpen, onClose }) {
    
  const navigate = useNavigate();
  const [chats , setChats] = useState([] );

  const {socket} = useContext(SocketContext);
  const fetchChats = async () => {
    try {
      let res = await axios.get("http://localhost:8000/api/chat", {withCredentials: true});
      let data = await res.data.chats;

      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
    };

    const newChat = async () => {
      try {
        let res = await axios.post("http://localhost:8000/api/chat/create", { title: "New Chat" }, { withCredentials: true });
        let data = await res.data.chat;
        console.log("New chat created:", data);
        setChats((prevChats) => [...prevChats, data]);
        toast("New Chat Added");
        navigate(`/chat/${data._id}`);
      } catch (error) {
        console.error("Error creating new chat:", error);
      }
    };

    const handleDeleteChat = async (chatId) => {
      try {
        console.log(chatId);
        await axios.post(`http://localhost:8000/api/chat/delete`, {id : chatId}, { withCredentials: true });
        setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
      }
      catch (error) {
        console.error("Error deleting chat:", error);
      }
    };


    useEffect(()=>{
      fetchChats();
    })


    useEffect(() => {
      
      if (!socket) return;

    
      const handleTitleUpdate = ({ chatId, title }) => {
        console.log("Sidebar caught update for ID:", chatId, "New title:", title);

        
        setChats((prevChats) =>
          prevChats.map((chat) => {
            
            if (chat._id === chatId) {
              return { ...chat, title: title }; 
            }
            return chat; 
          })
        );

        fetchChats();
      };

      socket.on("chat-title-updated", handleTitleUpdate);
  

      return () => {
        socket.off("chat-title-updated", handleTitleUpdate);
      };

    }, []);
  

  return (
    <>
      <aside className={`fixed lg:relative top-0 left-0 h-screen bg-[#0e1117] border-r border-zinc-900/80  flex flex-col justify-between transition-all duration-300 z-50 ease-in-out ${
        isOpen ? 'w-64 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full lg:w-0 lg:hidden overflow-hidden'
      }`}>
        {/* Upper Dashboard Area */}
        <div className="p-4 flex-1 flex flex-col min-h-0">
          <button className="w-full bg-[#13151a] hover:bg-[#1a1d24] border border-zinc-800/60 text-zinc-200 text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-between mb-6 active:scale-[0.98] transition-all" onClick={newChat}>
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" /> New session
            </span>
            <span className="text-[10px] bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-800">Ctrl K</span>
          </button>

          {/* Scrollable Streams */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            <p className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase px-2 mb-2 flex items-center gap-1.5">
              <History className="w-3 h-3" /> Recent Streams
            </p>
            {chats.map((chat) => (
              <div 
                key={chat._id} 
                className="w-full flex items-center justify-between hover:bg-[#13151a]/60 rounded-lg group transition-colors pr-2"
                >
                {/* Chat select karne ka button */}
                <button 
                    type="button"
                    onClick={() => navigate(`/chat/${chat._id}`)}
                    className="flex-1 text-left text-xs text-zinc-400 hover:text-zinc-200 px-3 py-2.5 flex items-center gap-2.5 truncate cursor-pointer"
                >
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-500/70 flex-shrink-0" />
                    <span className="truncate">{chat.title || 'Untitled Chat'}</span>
                </button>

                {/* Delete karne ka button (Sirf hover par dikhega) */}
                <button
                    type="button"
                    onClick={(e) => {
                    e.stopPropagation(); // Yeh line bohot important hai, isse chat open nahi hogi
                      handleDeleteChat(chat._id);
                    }}
                    className="p-1.5 text-zinc-600 hover:text-rose-400 rounded-md hover:bg-zinc-900/50 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    title="Delete Chat"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
                </div>
            ))}
          </div>
        </div>

        {/* Control Node Panel */}
        <div className="p-4 border-t border-zinc-900 bg-[#0b0c10]/40 space-y-1">
          <button className="w-full text-left text-xs text-zinc-500 hover:text-zinc-300 px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button className="w-full text-left text-xs text-rose-500/80 hover:text-rose-400 px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors">
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Backdrop for handling mobile taps overlay */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </>
  );
}