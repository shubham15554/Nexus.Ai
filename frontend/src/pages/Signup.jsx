import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, Cpu, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../cotexts/authContext';
import { useContext } from 'react';
import {toast} from 'react-toastify';
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const {handleRegister} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{
      let res = await handleRegister(formData.username , formData.email , formData.password);
      console.log(res);
      toast.success(res);
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials");
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] flex text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">

      <div className="hidden lg:flex lg:w-1/2 bg-[#0e1117] relative flex-col justify-between p-12 overflow-hidden border-r border-zinc-900">

        <div className="absolute top-[-20%] right-[-20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-15%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Cpu className="w-5 h-5 text-black stroke-[2]" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Nexus.AI
          </span>
        </div>

      
        <div className="max-w-md my-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 fill-emerald-400/20" /> Now Live: Next-Gen LLM Core
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Explore the boundaries of generative intelligence.
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Create an account to access lightning-fast neural processing, customized agent training, and seamless API integration.
          </p>
         <div className="space-y-3.5 pt-4 border-t border-zinc-800/60">
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Sub-100ms inference token delivery</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Enterprise-grade data encryption isolation</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-zinc-600 relative z-10">
          © 2026 Nexus Labs Inc. All rights reserved.
        </div>
      </div>


      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">

        <div className="absolute lg:hidden top-[-10%] right-[-10%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-full max-w-md space-y-8">

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Get started</h1>
            <p className="text-zinc-400 text-sm mt-2">
              Create your free workspace and start building.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Sarah Connor"
                className="w-full bg-[#13151a] border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

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
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 8 characters"
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


            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                required
                id="terms"
                className="mt-0.5 w-4 h-4 rounded border-zinc-800 bg-[#13151a] text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500"
              />
              <label htmlFor="terms" className="text-xs text-zinc-400 leading-normal">
                I agree to the <a href="#terms" className="text-zinc-300 hover:text-emerald-400 underline transition-colors">Terms of Service</a> and <a href="#privacy" className="text-zinc-300 hover:text-emerald-400 underline transition-colors">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group shadow-lg shadow-emerald-950/20 active:scale-[0.99] transition-all duration-150"
            >
              Create Account
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

    
          <p className="text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <a href="/login" className="text-emerald-400 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>

    </div>
  );
}