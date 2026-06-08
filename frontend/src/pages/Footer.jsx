import { Bot, Sparkles, ArrowUp, Terminal, History, ShieldCheck, HelpCircle, Compass, Menu, X } from 'lucide-react';


export default function Footer(){
     
    return (
         <footer className="w-full border-t border-zinc-900/40 py-4 sm:py-5 px-4 sm:px-6 relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-zinc-600 flex-shrink-0">
          <div className="flex items-center gap-4 sm:gap-5">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" /> TLS Encrypted Connection</span>
            <span className="hidden sm:flex items-center gap-1"><History className="w-3.5 h-3.5" /> State: Persistent</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-400 transition-colors text-center sm:text-right">
            <HelpCircle className="w-3.5 h-3.5" /> Core System Framework Documentation
          </div>
        </footer>
    )
}