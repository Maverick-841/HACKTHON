import React, { useEffect } from 'react';
import { ExternalLink, Search, X } from 'lucide-react';

const getContentKey = (category) => {
    const normCategory = category ? category.toLowerCase().replace(/\s+/g, '') : 'movie';

    if (normCategory.includes('music')) return 'music';
    if (normCategory.includes('series')) return 'webseries';
    if (normCategory.includes('anime')) return 'anime';
    if (normCategory.includes('doc')) return 'documentary';
    if (normCategory.includes('book')) return 'book';
    if (normCategory.includes('podcast')) return 'podcast';
    return 'movie';
};

const buildPlatforms = (searchQuery) => ({
    movie: [
        { name: 'YouTube', color: 'bg-red-600 hover:bg-red-700', url: `https://www.youtube.com/results?search_query=${searchQuery}`, icon: '▶' },
        { name: 'Netflix', color: 'bg-red-700 hover:bg-red-800', url: `https://www.netflix.com/search?q=${searchQuery}`, icon: 'N' },
        { name: 'Amazon Prime', color: 'bg-blue-500 hover:bg-blue-600', url: `https://www.amazon.com/s?k=${searchQuery}&i=instant-video`, icon: 'Prime' },
        { name: 'Disney+', color: 'bg-blue-900 hover:bg-blue-800', url: `https://www.disneyplus.com/search?q=${searchQuery}`, icon: 'D+' },
        { name: 'Hulu', color: 'bg-green-500 hover:bg-green-600', url: `https://www.hulu.com/search?q=${searchQuery}`, icon: 'Hulu' },
    ],
    music: [
        { name: 'YouTube', color: 'bg-red-600 hover:bg-red-700', url: `https://www.youtube.com/results?search_query=${searchQuery}`, icon: '▶' },
        { name: 'Spotify', color: 'bg-green-500 hover:bg-green-600', url: `https://open.spotify.com/search/${searchQuery}`, icon: '♫' },
        { name: 'Apple Music', color: 'bg-pink-500 hover:bg-pink-600', url: `https://music.apple.com/us/search?term=${searchQuery}`, icon: '' },
        { name: 'Amazon Music', color: 'bg-blue-400 hover:bg-blue-500', url: `https://music.amazon.com/search/${searchQuery}`, icon: 'Amz' },
        { name: 'Gaana', color: 'bg-orange-500 hover:bg-orange-600', url: `https://gaana.com/search/${searchQuery}`, icon: 'G' },
        { name: 'JioSaavn', color: 'bg-lime-500 hover:bg-lime-600', url: `https://www.jiosaavn.com/search/${searchQuery}`, icon: 'J' },
    ],
    webseries: [
        { name: 'YouTube', color: 'bg-red-600 hover:bg-red-700', url: `https://www.youtube.com/results?search_query=${searchQuery}`, icon: '▶' },
        { name: 'Netflix', color: 'bg-red-700 hover:bg-red-800', url: `https://www.netflix.com/search?q=${searchQuery}`, icon: 'N' },
        { name: 'Amazon Prime', color: 'bg-blue-500 hover:bg-blue-600', url: `https://www.amazon.com/s?k=${searchQuery}&i=instant-video`, icon: 'Prime' },
        { name: 'Hulu', color: 'bg-green-500 hover:bg-green-600', url: `https://www.hulu.com/search?q=${searchQuery}`, icon: 'Hulu' },
        { name: 'Disney+', color: 'bg-blue-900 hover:bg-blue-800', url: `https://www.disneyplus.com/search?q=${searchQuery}`, icon: 'D+' },
        { name: 'HBO Max', color: 'bg-purple-600 hover:bg-purple-700', url: `https://play.hbomax.com/search?q=${searchQuery}`, icon: 'HBO' },
    ],
    anime: [
        { name: 'YouTube', color: 'bg-red-600 hover:bg-red-700', url: `https://www.youtube.com/results?search_query=${searchQuery}`, icon: '▶' },
        { name: 'Crunchyroll', color: 'bg-orange-500 hover:bg-orange-600', url: `https://www.crunchyroll.com/search?q=${searchQuery}`, icon: 'CR' },
        { name: 'Netflix', color: 'bg-red-700 hover:bg-red-800', url: `https://www.netflix.com/search?q=${searchQuery}`, icon: 'N' },
        { name: 'Hulu', color: 'bg-green-500 hover:bg-green-600', url: `https://www.hulu.com/search?q=${searchQuery}`, icon: 'Hulu' },
        { name: 'Funimation', color: 'bg-purple-600 hover:bg-purple-700', url: `https://www.funimation.com/search/?q=${searchQuery}`, icon: 'Fun' },
    ],
    documentary: [
        { name: 'YouTube', color: 'bg-red-600 hover:bg-red-700', url: `https://www.youtube.com/results?search_query=${searchQuery}`, icon: '▶' },
        { name: 'Netflix', color: 'bg-red-700 hover:bg-red-800', url: `https://www.netflix.com/search?q=${searchQuery}`, icon: 'N' },
        { name: 'Amazon Prime', color: 'bg-blue-500 hover:bg-blue-600', url: `https://www.amazon.com/s?k=${searchQuery}&i=instant-video`, icon: 'Prime' },
        { name: 'Discovery+', color: 'bg-blue-400 hover:bg-blue-500', url: `https://www.discoveryplus.com/search?q=${searchQuery}`, icon: 'D+' },
    ],
    book: [
        { name: 'Amazon', color: 'bg-yellow-600 hover:bg-yellow-700', url: `https://www.amazon.com/s?k=${searchQuery}&i=stripbooks`, icon: 'a' },
        { name: 'Kindle', color: 'bg-blue-500 hover:bg-blue-600', url: `https://www.amazon.com/s?k=${searchQuery}&i=digital-text`, icon: 'K' },
        { name: 'Audible', color: 'bg-orange-500 hover:bg-orange-600', url: `https://www.audible.com/search?keywords=${searchQuery}`, icon: 'Au' },
        { name: 'Google Books', color: 'bg-blue-600 hover:bg-blue-700', url: `https://www.google.com/search?tbm=bks&q=${searchQuery}`, icon: 'G' },
        { name: 'Goodreads', color: 'bg-amber-700 hover:bg-amber-800', url: `https://www.goodreads.com/search?q=${searchQuery}`, icon: 'gr' },
    ],
    podcast: [
        { name: 'YouTube', color: 'bg-red-600 hover:bg-red-700', url: `https://www.youtube.com/results?search_query=${searchQuery}`, icon: '▶' },
        { name: 'Spotify', color: 'bg-green-500 hover:bg-green-600', url: `https://open.spotify.com/search/${searchQuery}`, icon: '♫' },
        { name: 'Apple Podcasts', color: 'bg-purple-500 hover:bg-purple-600', url: `https://podcasts.apple.com/us/search?term=${searchQuery}`, icon: '' },
    ],
});

const PlatformModal = ({ isOpen, onClose, title, category }) => {
    useEffect(() => {
        if (!isOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const searchQuery = encodeURIComponent(`${title} ${category || ''}`.trim());
    const contentKey = getContentKey(category);
    const platforms = buildPlatforms(searchQuery)[contentKey] || buildPlatforms(searchQuery).movie;
    const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    const googleUrl = `https://www.google.com/search?q=${searchQuery}`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                    aria-label="Close platform options"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 pr-8">{title}</h2>
                <p className="text-gray-400 mb-6">Choose where you want to open this recommendation:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 transition"
                    >
                        <Search size={18} />
                        Search On YouTube
                    </a>

                    <a
                        href={googleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-3 transition"
                    >
                        <ExternalLink size={18} />
                        Search On Google
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {platforms.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${platform.color} h-24 rounded-xl flex flex-col items-center justify-center text-white font-bold transition transform hover:scale-105 shadow-lg group`}
                        >
                            <span className="text-2xl mb-1 opacity-80 group-hover:opacity-100">{platform.icon}</span>
                            <span className="text-sm text-center px-2 leading-tight">{platform.name}</span>
                        </a>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        We do not host content. We only redirect to third-party platforms.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlatformModal;
