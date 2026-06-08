import React, { useState , useContext } from 'react';
import { Eye, EyeOff, Sparkles, ArrowRight, Bot, Lock, ArrowUpRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../cotexts/authContext';
import {toast} from 'react-toastify';
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const {handleLogin} = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await handleLogin(formData.email , formData.password);
      console.log(res);
      toast.success(res);
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials")
      console.error("Error logging in user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] flex text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* LEFT SIDE: Brand & Aesthetic AI Panel (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0e1117] relative flex-col justify-between p-12 overflow-hidden border-r border-zinc-900">
        {/* Background Decorative Gradients */}
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[-10%] left-[-15%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Top Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Bot className="w-5 h-5 text-black stroke-[2]" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Nexus.AI
          </span>
        </div>

       
        <div className="max-w-md my-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 fill-blue-400/20" /> Welcome Back, Operator
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Resume your stream of consciousness.
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Your custom-tuned instances, conversation states, and background worker pipelines are paused and waiting for authorization.
          </p>

       
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800/60">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Model Status</p>
              <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Operational
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Your API Layer</p>
              <p className="text-sm font-semibold text-zinc-300 mt-1 flex items-center gap-1">
                v2.4-stable <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-zinc-600 relative z-10">
          © 2026 Nexus Labs Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: The Login Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Subtle background glow for mobile layout */}
        <div className="absolute lg:hidden bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
            <p className="text-zinc-400 text-sm mt-2">
              Enter your credentials to access your console.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                className="w-full bg-[#13151a] border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Password
                </label>
                  
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#13151a] border border-zinc-800 focus:border-emerald-500/50 rounded-xl pl-4 pr-10 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-zinc-800 bg-[#13151a] text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500"
              />
              <label htmlFor="remember" className="text-xs text-zinc-400 select-none">
                Keep me authenticated on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all duration-150"
            >
              Sign In to Console
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-center text-sm text-zinc-500">
            New to the platform?{' '}
            <a href="/signup" className="text-emerald-400 font-medium hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>

    </div>
  );
}