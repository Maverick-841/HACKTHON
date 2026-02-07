import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

// HELPER FUNCTION (Same as moodRoutes.js)
async function fetchImage(title, category) {
    try {
        if (category === 'Music') {
            // 1. Try Deezer (High Quality)
            try {
                const deezerUrl = `https://api.deezer.com/search?q=track:"${encodeURIComponent(title)}"`;
                const deezerRes = await axios.get(deezerUrl);
                const deezerTrack = deezerRes.data.data?.[0];
                if (deezerTrack?.album?.cover_xl) return deezerTrack.album.cover_xl;
                if (deezerTrack?.album?.cover_big) return deezerTrack.album.cover_big;
            } catch (e) {
                // ignore
            }

            // 2. Fallback to LastFM
            const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(title)}&api_key=${LASTFM_API_KEY}&format=json`;
            const res = await axios.get(url);
            const track = res.data.results?.trackmatches?.track?.[0];
            const images = track?.image;
            const imgObj = images?.find(i => i.size === 'extralarge') || images?.find(i => i.size === 'large');
            return imgObj?.['#text'] || null;
        }

        // For Movies, Web Series (TV), Anime (TV implies usually)
        // ADDED: Documentaries often exist as Movies or TV on TMDB
        else if (category === 'Movies' || category === 'Web Series' || category === 'Anime' || category === 'Documentaries') {
            const type = (category === 'Movies' || category === 'Documentaries') ? 'movie' : 'tv';
            // Try specific type first
            let url = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
            let res = await axios.get(url);
            let result = res.data.results?.[0];

            // Trigger fallback if not found
            // For Documentaries OR Anime, try the other type
            if (!result && (category === 'Documentaries' || category === 'Anime')) {
                const fallbackType = type === 'movie' ? 'tv' : 'movie';
                url = `https://api.themoviedb.org/3/search/${fallbackType}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
                res = await axios.get(url);
                result = res.data.results?.[0];
            }

            // Assume "Podcasts" might find something on TMDB? Unlikely but worth a shot if we treat as TV?
            // Or maybe we treat Podcasts effectively as Music or Audiobooks?
            // Let's rely on User's request for valid images.
            // For now, let's skip Podcasts or try Google Books/LastFM?
            // Let's try Google Books for Podcasts? (Maybe as books/audiobooks)

            if (result?.backdrop_path) {
                return `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
            }
            if (result?.poster_path) {
                return `https://image.tmdb.org/t/p/original${result.poster_path}`;
            }
        }

        // For Books (using Google Books API)
        else if (category === 'Books') {
            const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}`;
            const res = await axios.get(url);
            const book = res.data.items?.[0];
            const images = book?.volumeInfo?.imageLinks;
            return images?.extraLarge || images?.large || images?.medium || images?.thumbnail || null;
        }

        // Podcasts fallback - Try LastFM?
        else if (category === 'Podcasts') {
            // Try searching as an "album" or "track"?
            // Often podcasts don't resolve well on these APIs.
            // Let's return a specific placeholder if we can't find one?
            // Or try Google Images custom search? (Too complex for now)
            // Let's try LastFM "artist" search for the podcast host/title?
            const url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(title)}&api_key=${LASTFM_API_KEY}&format=json`;
            const res = await axios.get(url);
            const artist = res.data.results?.artistmatches?.artist?.[0];
            const images = artist?.image;
            const imgObj = images?.find(i => i.size === 'extralarge') || images?.find(i => i.size === 'large');
            if (imgObj?.['#text']) return imgObj['#text'];

            // Fallback for Podcasts if not found on LastFM
            return "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=1000&auto=format&fit=crop";
        }

        return null;
    } catch (error) {
        console.error(`Failed to fetch image for ${title}:`, error.message);
        return null;
    }
}

async function run() {
    console.log("Reading data.json...");
    // Use absolute path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dataPath = path.resolve(__dirname, "rag/data.json");

    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    console.log(`Found ${data.length} items. Filling missing images...`);

    let updatedCount = 0;
    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        // ONLY fetch if image is missing or empty or "NONE"
        if (!item.image || item.image === "" || item.image === "NONE") {
            process.stdout.write(`Fetching for [${item.category}] ${item.title}... `);
            let imageUrl = await fetchImage(item.title, item.category);

            // Final Fallback if API fails
            if (!imageUrl) {
                // Use a high-quality abstract/star themed image as requested
                // "add star image which not founs"
                imageUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop"; // Starry night / Abstract
                console.log("⚠️ Using Fallback Star Image");
            } else {
                console.log("✅ Found");
            }

            if (imageUrl) {
                item.image = imageUrl;
                updatedCount++;
            }
            // Rate limiting
            await new Promise(r => setTimeout(r, 200));
        }
    }

    console.log(`\nFinished! Updated ${updatedCount} items.`);
    console.log(`Writing to ${dataPath}...`); // Debug path
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        console.log("✅ Saved to data.json successfully.");
    } catch (err) {
        console.error("❌ Failed to save data.json:", err);
    }
}

run();
