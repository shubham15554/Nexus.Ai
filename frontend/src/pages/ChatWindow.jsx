import React, { useState, useEffect , useContext} from 'react';
import { useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Sidebar from '../pages/Sidebar'; 
import { ArrowUp, Terminal, Compass, Bot, Menu, X } from 'lucide-react';
import { SocketContext } from '../cotexts/socketContext';
import axios from 'axios';
export default function ChatWindow() {
  const { id } = useParams(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const location = useLocation(); 
  const hasFiredInitial = useRef(false); 
  
  const {socket} = useContext(SocketContext);
  
  
  
  

  useEffect(() => {
    const fetchMessages = async ()=>{
      try{
      let res = await axios.get(`https://nexus-ai-26rh.onrender.com/api/chat/message/${id}` , {withCredentials: true});
      setMessages(res.data.messages);
      }
      catch(err){
        console.log(err);
      }
    }

    fetchMessages();
    

  }, [id]);






  useEffect(() => {
  
  if (!socket || hasFiredInitial.current) return;

  const initialPrompt = location.state?.initialPrompt;
  
  if (initialPrompt) {
    hasFiredInitial.current = true;
    setMessages([{ role: 'user', content: initialPrompt }]);
    socket.emit("ai-message", {
      role: 'user',
      content: initialPrompt,
      chat: id,
    });

    window.history.replaceState({}, document.title);
  }
}, [id, socket, location.state]);


  useEffect(()=>{

    const handleResponses = (response)=>{
       let {role , content} = response;
        setMessages(prev=>[...prev , {role : role , content: content}]);
    }
    
    socket.on('ai-response' , handleResponses);
    return () => {
    socket.off('ai-response', handleResponses);
  };

  }, [socket])

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    socket.emit("ai-message" , {
      role: 'user',
      content: input,
      chat: id,
    })
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
  };



  return (
    <div className="w-screen h-screen bg-[#0b0c10] text-zinc-100 flex overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-400">
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col justify-between h-full relative overflow-hidden min-w-0 z-10">
        
        <header className="w-full bg-[#0b0c10]/40 backdrop-blur-md border-b border-zinc-900/40 px-6 py-4 flex items-center justify-between relative z-30 flex-shrink-0">
          <div className="flex items-center gap-4">
            
           
            <button 
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-zinc-400 hover:text-emerald-400 bg-[#13151a] border border-zinc-800 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center relative z-50 focus:outline-none"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-100 stroke-[2.5] z-50" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">Session Instance:</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                {id}
              </span>
            </div>
          </div>
          
          <div>
            <span className="text-[10px] font-semibold bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-800/80 text-zinc-400 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> STREAM ACTIVE
            </span>
          </div>
        </header>

        {/* 💬 Actual Chat Messages Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl w-full mx-auto relative z-10">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role !== 'user' && (
                <div className="w-6 h-6 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/10">
                  <Bot className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-zinc-100 shadow-sm shadow-emerald-950/10' 
                  : 'bg-[#13151a] border border-zinc-900/80 text-zinc-300'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </main>

        {/* Persistent Bottom Chat Bar Container */}
        <div className="max-w-3xl w-full mx-auto p-6 pt-0 relative z-20 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="bg-[#13151a]/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-3 flex items-center justify-between shadow-2xl focus-within:border-emerald-500/30 transition-all duration-300">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Reply to Nexus..."
              className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none px-2 leading-relaxed"
            />
            <button 
              type="submit" 
              disabled={!input.trim()} 
              className={`p-2 rounded-xl flex items-center justify-center transition-all duration-200 ${
                input.trim() 
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-black active:scale-95 cursor-pointer' 
                  : 'bg-zinc-900 text-zinc-700 cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}