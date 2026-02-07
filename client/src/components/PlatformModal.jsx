import React from 'react';
import { X } from 'lucide-react'; // Assuming lucide-react is installed, or use a simple SVG

const PlatformModal = ({ isOpen, onClose, title, category }) => {
    if (!isOpen) return null;

    const searchQuery = encodeURIComponent(`${title} ${category}`);

    // Platform definitions
    const allPlatforms = {
        movie: [
            { name: "Netflix", color: "bg-red-600 hover:bg-red-700", url: `https://www.netflix.com/search?q=${searchQuery}`, icon: "N" },
            { name: "Amazon Prime", color: "bg-blue-500 hover:bg-blue-600", url: `https://www.amazon.com/s?k=${searchQuery}&i=instant-video`, icon: "Prime" },
            { name: "YouTube", color: "bg-red-500 hover:bg-red-600", url: `https://www.youtube.com/results?search_query=${searchQuery}`, icon: "▶" },
            { name: "Disney+", color: "bg-blue-900 hover:bg-blue-800", url: `https://www.disneyplus.com/search?q=${searchQuery}`, icon: "D+" },
            { name: "Hulu", color: "bg-green-500 hover:bg-green-600", url: `https://www.hulu.com/search?q=${searchQuery}`, icon: "Hulu" }
        ],
        music: [
            { name: "Spotify", color: "bg-green-500 hover:bg-green-600", url: `https://open.spotify.com/search/${searchQuery}`, icon: "♫" },
            { name: "YouTube Music", color: "bg-red-600 hover:bg-red-700", url: `https://music.youtube.com/search?q=${searchQuery}`, icon: "▶Music" },
            { name: "Apple Music", color: "bg-pink-500 hover:bg-pink-600", url: `https://music.apple.com/us/search?term=${searchQuery}`, icon: "" },
            { name: "Amazon Music", color: "bg-blue-400 hover:bg-blue-500", url: `https://music.amazon.com/search/${searchQuery}`, icon: "Amz" }
        ],
        webseries: [
            { name: "Netflix", color: "bg-red-600 hover:bg-red-700", url: `https://www.netflix.com/search?q=${searchQuery}`, icon: "N" },
            { name: "Amazon Prime", color: "bg-blue-500 hover:bg-blue-600", url: `https://www.amazon.com/s?k=${searchQuery}&i=instant-video`, icon: "Prime" },
            { name: "Hulu", color: "bg-green-500 hover:bg-green-600", url: `https://www.hulu.com/search?q=${searchQuery}`, icon: "Hulu" },
            { name: "Disney+", color: "bg-blue-900 hover:bg-blue-800", url: `https://www.disneyplus.com/search?q=${searchQuery}`, icon: "D+" },
            { name: "HBO Max", color: "bg-purple-600 hover:bg-purple-700", url: `https://play.hbomax.com/search?q=${searchQuery}`, icon: "HBO" }
        ],
        anime: [
            { name: "Crunchyroll", color: "bg-orange-500 hover:bg-orange-600", url: `https://www.crunchyroll.com/search?q=${searchQuery}`, icon: "CR" },
            { name: "Netflix", color: "bg-red-600 hover:bg-red-700", url: `https://www.netflix.com/search?q=${searchQuery}`, icon: "N" },
            { name: "Hulu", color: "bg-green-500 hover:bg-green-600", url: `https://www.hulu.com/search?q=${searchQuery}`, icon: "Hulu" },
            { name: "Funimation", color: "bg-purple-600 hover:bg-purple-700", url: `https://www.funimation.com/search/?q=${searchQuery}`, icon: "Fun" }
        ],
        documentary: [
            { name: "Netflix", color: "bg-red-600 hover:bg-red-700", url: `https://www.netflix.com/search?q=${searchQuery}`, icon: "N" },
            { name: "YouTube", color: "bg-red-500 hover:bg-red-600", url: `https://www.youtube.com/results?search_query=${searchQuery}`, icon: "▶" },
            { name: "Amazon Prime", color: "bg-blue-500 hover:bg-blue-600", url: `https://www.amazon.com/s?k=${searchQuery}&i=instant-video`, icon: "Prime" },
            { name: "Discovery+", color: "bg-blue-400 hover:bg-blue-500", url: `https://www.discoveryplus.com/search?q=${searchQuery}`, icon: "D+" }
        ],
        book: [
            { name: "Amazon", color: "bg-yellow-600 hover:bg-yellow-700", url: `https://www.amazon.com/s?k=${searchQuery}&i=stripbooks`, icon: "a" },
            { name: "Kindle", color: "bg-blue-500 hover:bg-blue-600", url: `https://www.amazon.com/s?k=${searchQuery}&i=digital-text`, icon: "K" },
            { name: "Audible", color: "bg-orange-500 hover:bg-orange-600", url: `https://www.audible.com/search?keywords=${searchQuery}`, icon: "Au" },
            { name: "Google Books", color: "bg-blue-600 hover:bg-blue-700", url: `https://www.google.com/search?tbm=bks&q=${searchQuery}`, icon: "G" },
            { name: "Goodreads", color: "bg-amber-700 hover:bg-amber-800", url: `https://www.goodreads.com/search?q=${searchQuery}`, icon: "gr" }
        ],
        podcast: [
            { name: "Spotify", color: "bg-green-500 hover:bg-green-600", url: `https://open.spotify.com/search/${searchQuery}`, icon: "♫" },
            { name: "Apple Podcasts", color: "bg-purple-500 hover:bg-purple-600", url: `https://podcasts.apple.com/us/search?term=${searchQuery}`, icon: "" },
            { name: "YouTube", color: "bg-red-500 hover:bg-red-600", url: `https://www.youtube.com/results?search_query=${searchQuery} podcast`, icon: "▶" }
        ]
    };

    // Normalize category to lowercase and handle variations
    const normCategory = category ? category.toLowerCase().replace(/\s+/g, '') : 'movie';

    // Map safe key or default to 'movie' or 'webseries' logic
    let contentKey = 'movie';
    if (normCategory.includes('music')) contentKey = 'music';
    else if (normCategory.includes('series')) contentKey = 'webseries';
    else if (normCategory.includes('anime')) contentKey = 'anime';
    else if (normCategory.includes('doc')) contentKey = 'documentary';
    else if (normCategory.includes('book')) contentKey = 'book';
    else if (normCategory.includes('podcast')) contentKey = 'podcast';


    const platforms = allPlatforms[contentKey] || allPlatforms.movie;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-2 pr-8">{title}</h2>
                <p className="text-gray-400 mb-6">Select a platform to watch/listen:</p>

                <div className="grid grid-cols-2 gap-4">
                    {platforms.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${platform.color} h-24 rounded-xl flex flex-col items-center justify-center text-white font-bold transition transform hover:scale-105 shadow-lg group`}
                        >
                            <span className="text-2xl mb-1 opacity-80 group-hover:opacity-100">{platform.icon}</span>
                            <span className="text-sm">{platform.name}</span>
                        </a>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        we don't host any content. redirection to 3rd party platforms.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlatformModal;
