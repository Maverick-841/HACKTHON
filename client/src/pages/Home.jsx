import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';

import {Tv, BookOpen, Star, Cpu, ArrowRight, Play, Zap, Activity, Music2,Clapperboard, ScanEye,BrainCircuit, Navigation, Brain, BarChart3 } from 'lucide-react';  // slightly different icons
import { ShopContext } from '../context/shopcontext';

export default function Home() {
    const culturalDomains = [
        {
            icon: Clapperboard,  // was Film
            name: 'Movies',
            color: 'text-red-400',
            description: 'Handpicked movies that match your mood and inspire new perspectives.',
            examples: ['Inception', 'Forrest Gump', '3 Idiots', 'Soul']
        },
        {
            icon: Music2,  // same as before, intuitive for music
            name: 'Music',
            color: 'text-purple-400',
            description: 'Songs and playlists tailored to lift your spirits and match your emotions.',
            examples: ['Classical', 'Pop', 'Lo-fi', 'World Music']
        },
        {
            icon: Tv,  // was Play, now Tv icon for web series
            name: 'Web Series',
            color: 'text-blue-400',
            description: 'Series recommendations to keep you engaged while exploring different themes.',
            examples: ['Stranger Things', 'Money Heist', 'Dark', 'Lust Stories']
        },
        {
            icon: BookOpen,  // same, represents books
            name: 'Books',
            color: 'text-green-400',
            description: 'Books and stories selected to match your mindset and expand your thinking.',
            examples: ['The Alchemist', 'Atomic Habits', 'Sapiens', 'Rich Dad Poor Dad']
        },
        {
            icon: Star,  // was Zap, now Star for anime (fun, inspiring)
            name: 'Anime',
            color: 'text-pink-400',
            description: 'Anime series that inspire, entertain, and align with your current mood.',
            examples: ['Your Name', 'Attack on Titan', 'One Piece', 'Demon Slayer']
        }
    ];

    const features = [
        {
            icon: Cpu,  // was Brain, now Cpu for AI intelligence
            title: 'AI Mood Detection',
            description: 'Our smart AI understands your current mood and suggests movies, music, books, web series, and anime that match your emotions, creating a personalized experience.',
            gradient: 'from-blue-500 to-purple-500'
        },
        {
            icon: Navigation,  // was Target, now Compass for guiding recommendations
            title: 'Tailored Recommendations',
            description: 'Receive content suggestions based on your mood, taste, and previous interactions, helping you explore and enjoy movies, music, books, web series, and anime like never before.',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: Activity,  // same, represents growth tracking
            title: 'Mood Progress Tracker',
            description: 'Visualize your journey as your taste evolves. Track your engagement across domains and see how your cultural preferences expand over time.',
            gradient: 'from-pink-500 to-orange-500'
        }
    ];
    // Removed unused showVideo state
    const [videoPlayed, setVideoPlayed] = useState(false);

    const divConfig = [

        {
            position: { top: '7%', left: '20%' },
            size: { scale: 1.0 },
            animation: {
                y: [-15, 15, -15],
                rotate: [-5, 5, -5],
                transition: { duration: 7, ease: "easeInOut", repeat: Infinity }
            }
        },

        {
            position: { top: '-1%', left: '45%' },
            size: { scale: 0.5 },
            animation: {
                y: [20, -20, 20],
                rotate: [3, -3, 3],
                transition: { duration: 8, ease: "linear", repeat: Infinity }
            }
        },

        {
            position: { top: '9%', left: '75%' },
            size: { scale: 0.8 },
            animation: {
                y: [-10, 10, -10],
                x: [-10, 10, -10],
                rotate: [7, -7, 7],
                transition: { duration: 6.5, ease: "easeInOut", repeat: Infinity }
            }
        },

        {
            position: { top: '47%', left: '15%' },
            size: { scale: 0.9 },
            animation: {
                y: [12, -12, 12],
                rotate: [-8, 8, -8],
                transition: { duration: 9, ease: "linear", repeat: Infinity, delay: 0.2 }
            }
        },

        {
            position: { top: '45%', left: '75%' },
            size: { scale: 1.05 },
            animation: {
                y: [-25, 25, -25],
                rotate: [0, 0, 0],
                transition: { duration: 7.5, ease: "easeInOut", repeat: Infinity }
            }
        }
    ]


    const navigate = useNavigate();


    const { token } = useContext(ShopContext);

    const handleStartJourney = () => {
        if (!token) {
            navigate('/login');
        } else {
            navigate('/Mode');
        }
    };

    return (
        <div className="relative overflow-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mt-32">
                            <BrainCircuit className="w-5 h-5 text-blue-400" />
                            <span className="text-white/80 text-sm">
                                Intelligent Mood-Driven AI Engine
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                            Know Your Mood
                            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                We Recommend Your World
                            </span>
                        </h1>


                        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">

                            Your mood decides what you watch, listen, and read. Movies, music, web series, and books are handpicked to uplift, inspire, and guide your journey today.
                                     
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <button
                                onClick={handleStartJourney}             
                                className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-8 py-4 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                            >
                                <span>Start With Your Mood</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                             
                            <button           
                                className="group flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                                onClick={() => { setVideoPlayed(true); }}            
                            >
                                <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                                    <Play className="w-6 h-6" />
                                </div>                   
                                <span>Watch How AI Understands You</span>
                            </button>                                                         
                        </div>
                                        
                        {/* Embedded YouTube Video (shows on click) */}
                        <div className="mt-8 flex justify-center min-h-[400px]">
                            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                <iframe                                      
                                    width="100%"                     
                                    height="100%"
                                    src={`https://www.youtube.com/embed/5QOY6OIpbMQ${videoPlayed ? '?autoplay=1&rel=0&modestbranding=1&controls=1' : '?rel=0&modestbranding=1&controls=1'}`}
                                    title="How Zesty Works"
                                    frameBorder="0"                                       
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-full object-cover"
                                    style={{ display: 'block' }}
                                ></iframe>                     
                                {!videoPlayed && (                
                                    <button                          
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors cursor-pointer z-10"
                                        aria-label="Play video"
                                        onClick={() => { setVideoPlayed(true); }}
                                        tabIndex={0}
                                    >
                                        <div className="bg-white/20 p-6 rounded-full flex items-center justify-center shadow-lg">
                                            <Play className="w-16 h-16 text-white drop-shadow-lg" />
                                        </div>                 
                                    </button>                           
                                )}           
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Cultural Icons */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {culturalDomains.map((domain, index) => {
                        const Icon = domain.icon;
                        const config = divConfig[index];
                        return (
                            <motion.div
                                key={domain.name}
                                className="absolute"
                                style={{
                                    top: config.position.top,
                                    left: config.position.left,
                                    scale: config.size.scale,
                                }}
                                animate={{
                                    y: [...config.animation.y],
                                    rotate: [...config.animation.rotate],
                                    x: 'x' in config.animation ? [...config.animation.x] : 0,
                                }}
                                transition={config.animation.transition}
                            >
                                <div
                                    className="
        relative 
        flex flex-col items-center justify-center 
        w-32 h-32 p-6 
        rounded-full 
        border border-white/10 
        shadow-lg shadow-black/20 
        backdrop-blur-xl 
        bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.05)_50%)]
      "
                                >
                                    <Icon className={`w-8 h-8 ${domain.color} mb-2`} />
                                    <span className="text-white text-sm font-medium text-center">{domain.name}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Cultural Domains Showcase */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Every Mood Has a World
                        </h2>
                        <p className="text-xl text-white/60 max-w-3xl mx-auto">
                            Tell us how you feel, and we’ll show you stories, sounds, and ideas that truly connect with you.
                        </p>

                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {culturalDomains.map((domain, index) => {
                            const Icon = domain.icon;
                            return (
                                <motion.div
                                    key={domain.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                                >
                                    <div className="bg-white/10 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className={`w-8 h-8 ${domain.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{domain.name}</h3>
                                    <p className="text-white/60 text-sm mb-4">{domain.description}</p>
                                    <div className="space-y-1">
                                        {domain.examples.map((example, i) => (
                                            <div key={i} className="text-xs text-white/40 bg-white/5 rounded-full px-2 py-1 inline-block mr-1">
                                                {example}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    ><h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Your Mood-Driven Growth Journey
                        </h2>
                        <p className="text-xl text-white/60 max-w-3xl mx-auto">
                            From understanding your emotions to discovering content that shapes your mindset.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-white/60 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Flow */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold text-white mb-6">
                                How Our AI Reads Your Mood
                            </h2>

                            <p className="text-white/60 mb-8 leading-relaxed">
                                Your emotions guide your choices. Our AI understands your mood and recommends content that
                                matches what you truly need at that moment.
                            </p>

                            <div className="space-y-6">
                                {/* Mood Detection */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-500/20 p-3 rounded-xl flex-shrink-0">
                                        <ScanEye className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">
                                            Mood Detection
                                        </h4>
                                        <p className="text-white/60 text-sm">
                                            Identifies your emotional state from interactions and behavior patterns.
                                        </p>
                                    </div>
                                </div>

                                {/* AI Recommendation */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-500/20 p-3 rounded-xl flex-shrink-0">
                                        <Brain className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">
                                            AI Recommendations
                                        </h4>
                                        <p className="text-white/60 text-sm">
                                            Suggests movies, music, books, series, and anime based on your mood.
                                        </p>
                                    </div>
                                </div>

                                {/* Mood Insights */}
                                <div className="flex items-start space-x-4">
                                    <div className="bg-pink-500/20 p-3 rounded-xl flex-shrink-0">
                                        <BarChart3 className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">
                                            Mood Insights
                                        </h4>
                                        <p className="text-white/60 text-sm">
                                            Shows how content impacts your mood and preferences over time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>


                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                        >
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        Your Mood Journey
                                    </h3>
                                    <p className="text-white/60 text-sm">
                                        How your emotions shape your content experience
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {/* Mood Match Accuracy */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-medium">Mood Match Accuracy</span>
                                        <span className="text-blue-400">78%</span>
                                    </div>
                                    <div className="bg-white/10 rounded-full h-3">
                                        <motion.div
                                            className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '78%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                        />
                                    </div>

                                    {/* Emotional Balance */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-medium">Emotional Balance</span>
                                        <span className="text-purple-400">65%</span>
                                    </div>
                                    <div className="bg-white/10 rounded-full h-3">
                                        <motion.div
                                            className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '65%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.7 }}
                                        />
                                    </div>

                                    {/* Content Domains */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-medium">Content Domains Covered</span>
                                        <span className="text-pink-400">5/5</span>
                                    </div>
                                    <div className="bg-white/10 rounded-full h-3">
                                        <motion.div
                                            className="bg-gradient-to-r from-pink-400 to-orange-400 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.9 }}
                                        />
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">127</div>
                                        <div className="text-white/60 text-xs">
                                            Mood-Based Picks
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">23</div>
                                        <div className="text-white/60 text-xs">
                                            New Emotions Explored
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">89%</div>
                                        <div className="text-white/60 text-xs">
                                            Mood Improvement Rate
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">10k+</div>
                                <div className="text-white/60">Mood Interactions</div>
                                <div className="text-white/40 text-sm mt-1">
                                    Processed by AI
                                </div>
                            </div>

                            <div>
                                <div className="text-4xl font-bold text-white mb-2">91%</div>
                                <div className="text-white/60">Recommendation Accuracy</div>
                                <div className="text-white/40 text-sm mt-1">
                                    Based on feedback
                                </div>
                            </div>

                            <div>
                                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                                <div className="text-white/60">AI Availability</div>
                                <div className="text-white/40 text-sm mt-1">
                                    Real-time responses
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Ready to Understand
                            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                Your Mood Better?
                            </span>
                        </h2>

                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Let AI guide you with smart, mood-aware recommendations designed to
                            support focus, balance, and emotional clarity.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={handleStartJourney}
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105"
                            >
                                <span>Start with Mood Mitra</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <div className="text-white/60 text-sm">
                                Simple • Fast • AI-Powered
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}