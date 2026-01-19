import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { ShopContext } from '../context/shopcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token, setToken,backendUrl} = useContext(ShopContext);
          
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
    });

    const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    let response;

    if (isLogin) {
      // LOGIN
      response = await axios.post(`${backendUrl}/auth/login`, {
        email: formData.email,
        password: formData.password
      });
    } else {
      // SIGN UP
      response = await axios.post(`${backendUrl}/auth/register`, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      });
    }

    if (response.data.token) {
      setToken(response.data.token); // store token in context + localStorage
      navigate('/'); // go to home
    }

  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
};
    useEffect(() => {
        if (token) navigate("/");
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {isLogin ? 'Welcome Back' : 'Join Zesty'}
                        </h1>
                        <p className="text-white/60">
                            {isLogin
                                ? 'Continue your cultural journey'
                                : 'Start expanding your horizons'}
                        </p>
                    </div>

                    <form onSubmit={onSubmitHandler} className="space-y-6">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, fullName: e.target.value })
                                    }
                                    className="w-full pl-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white"
                                    required
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full pl-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white"
                        >
                            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-white/60"
                        >
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}
                            <span className="text-purple-400 ml-1">
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
