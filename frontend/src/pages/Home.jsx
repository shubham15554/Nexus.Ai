import React, { useState , useContext} from 'react';
import { Bot, Sparkles, ArrowUp, Terminal, History, ShieldCheck, HelpCircle, Compass, Menu, X } from 'lucide-react';
import axios from 'axios';
import Sidebar from '../pages/Sidebar';
import { useNavigate } from 'react-router-dom';
import Footer from '../pages/Footer';
import {SocketContext} from '../cotexts/socketContext'
import { AuthContext } from '../cotexts/authContext';
export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {socket} = useContext(SocketContext);
  const {user} = useContext(AuthContext);
  console.log(user);
  const samplePrompts = [
    "Write a production ready Express middleware for JWT auth",
    "Explain quantum computing principles like I am 5",
    "Analyze this React component structure for memory leaks",
    "Help me brainstorm architecture for a scalable vector DB"
  ];
  
  let navigate = useNavigate();
  
  const handlePillClick = (text) => {
    setPrompt(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    try{
        let res = await axios.post("http://localhost:8000/api/chat/create", { title: "New Chat" }, { withCredentials: true });
        let newChatId = await res.data.chat._id;
        navigate(`/chat/${newChatId}`, { state: { initialPrompt: prompt.trim() } });
        setPrompt('');
    }
    catch(err){
      console.log(err);
    }
    
  };

  return (
   
    <div className="w-full h-screen max-w-full bg-[#0b0c10] text-zinc-100 font-sans flex overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-400 relative">
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col justify-between min-w-0 h-full relative z-10 overflow-hidden w-full">
        
        <div className="absolute top-[-20%] left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-emerald-500/5 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] right-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-600/5 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none z-0" />

        <nav className="w-full bg-[#0b0c10]/40 backdrop-blur-md border-b border-zinc-900/40 px-4 sm:px-6 py-4 flex items-center justify-between relative z-30 flex-shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              className="p-2 text-zinc-400 hover:text-emerald-400 bg-[#13151a] border border-zinc-800 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center relative z-50 focus:outline-none flex-shrink-0"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? (
                <X className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              ) : (
                <Menu className="w-4 h-4 text-zinc-100 stroke-[2.5]" />
              )}
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/5 flex-shrink-0">
                <Bot className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <span className="text-sm font-bold tracking-tight text-zinc-200 truncate hidden xs:block">Nexus.AI</span>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-2 sm:gap-4 ml-auto relative z-30 flex-shrink-0">
  
            {!user && 
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 px-2.5 sm:px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-md shadow-emerald-950/20 active:scale-95 focus:outline-none"
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 animate-pulse" />
              <span>Login</span>
            </button>
            }
            {!user && 
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 px-2.5 sm:px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-md shadow-emerald-950/20 active:scale-95 focus:outline-none"
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 animate-pulse" />
              <span>Signup</span>
            </button>
            }

            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-zinc-500 bg-zinc-900/40 border border-zinc-800/40 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> engine: v2.4
            </div>

            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400 cursor-pointer hover:border-zinc-700 transition-colors flex-shrink-0">
              {user?.username[0] || "U"}
            </div>
          </div>
        </nav>

        <main className="flex-1 flex flex-col items-center justify-center max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-12 relative z-10 space-y-6 sm:space-y-10 overflow-y-auto">
          
          <div className="text-center space-y-2 sm:space-y-3 max-w-xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Hello, Operator.
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm tracking-wide">
              How can I assist your engineering pipeline today?
            </p>
          </div>

          <div className="w-full space-y-4">
            <form onSubmit={handleSubmit} className="bg-[#13151a]/90 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-3 sm:p-4 shadow-2xl relative group focus-within:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center text-zinc-600 mt-0.5 flex-shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <textarea 
                  rows="3"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask Nexus anything..." 
                  className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none resize-none pt-0.5 leading-relaxed"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
              </div>

              <div className="flex justify-between items-center pt-3 mt-2 border-t border-zinc-900/60">
                <span className="text-[10px] sm:text-[11px] text-zinc-600 tracking-wider flex items-center gap-1 min-w-0 truncate">
                  <Terminal className="w-3 h-3 text-emerald-500/70 flex-shrink-0" /> <span className="truncate">System memory token stream enabled</span>
                </span>
                <button 
                  type="submit"
                  disabled={!prompt.trim()}
                  className={`p-2 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                    prompt.trim() 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-black shadow-md shadow-emerald-950/20 active:scale-95' 
                      : 'bg-zinc-900 text-zinc-700 cursor-not-allowed'
                  }`}
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePillClick(item)}
                  className="text-[10px] sm:text-[11px] text-zinc-400 hover:text-emerald-400 bg-[#13151a]/40 hover:bg-[#13151a] border border-zinc-900 hover:border-zinc-800 px-3 py-1.5 rounded-full transition-all duration-200 truncate max-w-[140px] xs:max-w-[200px] sm:max-w-xs"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </main>

   
        
        <Footer/>

      </div>
    </div>
  );
}