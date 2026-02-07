import express from "express";
import { searchVectorDB } from "../rag/query.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

// Helper to fetch image based on category
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
        console.warn(`Deezer fetch failed for ${title}:`, e.message);
      }

      // 2. Fallback to LastFM
      const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(title)}&api_key=${LASTFM_API_KEY}&format=json`;
      const res = await axios.get(url);
      const track = res.data.results?.trackmatches?.track?.[0];
      const images = track?.image;
      const imgObj = images?.find(i => i.size === 'extralarge') || images?.find(i => i.size === 'large');
      return imgObj?.['#text'] || null;
    }

    // For Movies, Web Series (TV), Anime (TV implies usually), Documentaries
    else if (category === 'Movies' || category === 'Web Series' || category === 'Anime' || category === 'Documentaries') {
      const type = (category === 'Movies' || category === 'Documentaries') ? 'movie' : 'tv';
      const url = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
      const res = await axios.get(url);
      const result = res.data.results?.[0];

      // Prefer backdrop (landscape) or high-res poster
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
      // Try to get the highest resolution possible
      const images = book?.volumeInfo?.imageLinks;
      return images?.extraLarge || images?.large || images?.medium || images?.thumbnail || null;
    }

    // Podcasts fallback - Try LastFM?
    else if (category === 'Podcasts') {
      const url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(title)}&api_key=${LASTFM_API_KEY}&format=json`;
      const res = await axios.get(url);
      const artist = res.data.results?.artistmatches?.artist?.[0];
      const images = artist?.image;
      const imgObj = images?.find(i => i.size === 'extralarge') || images?.find(i => i.size === 'large');
      return imgObj?.['#text'] || null;
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch image for ${title} (${category}):`, error.message);
    return null;
  }
}

router.post("/recommend", async (req, res) => {
  try {

    const moodInput = req.body.mood?.toLowerCase();
    const categoryInput = req.body.category;
    const languageInput = req.body.language;

    if (!moodInput || !categoryInput) {
      return res.status(400).json({
        error: "Mood and category required"
      });
    }

    // 1. Construct Filter for Chroma (to narrow down search space)
    // Fix: "Web Series" was becoming "Web series" which failed in Chroma.
    // If input is "Web Series" (frontend sends matched case), rely on it or smarter title casing.
    // For now, let's just Title Case words if it's not "Web Series" or map common ones.

    let categoryFixed = categoryInput;

    // Simple normalization: if it's all lowercase, try to title case it.
    // Use a map for known multi-word categories
    const categoryMap = {
      "web series": "Web Series",
      "webseries": "Web Series",
      "movies": "Movies",
      "music": "Music",
      "books": "Books",
      "anime": "Anime",
      "documentaries": "Documentaries",
      "podcasts": "Podcasts"
    };

    if (categoryMap[categoryInput.toLowerCase()]) {
      categoryFixed = categoryMap[categoryInput.toLowerCase()];
    } else {
      // Fallback: Title Case each word if not in map
      categoryFixed = categoryInput.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    const languageFixed = languageInput ? languageInput.charAt(0).toUpperCase() + languageInput.slice(1).toLowerCase() : null;

    const chromaFilter = {
      "$and": [
        { "category": categoryFixed }
      ]
    };

    if (languageFixed) {
      chromaFilter["$and"].push({ "language": languageFixed });
    }

    const query = `${moodInput} ${languageInput || ""} ${categoryInput}`;

    // Pass filter to Chroma
    const docs = await searchVectorDB(query, chromaFilter);

    // 2. Relaxed JS Filter (Double check, but allow partial matches)
    const filtered = docs.filter(d => {
      const item = d.metadata || {};

      // Fuzzy match for mood (e.g. "motivation" matches "Need Motivation")
      const dbMood = (item.mood || "").toLowerCase();
      const matchMood = dbMood.includes(moodInput) || moodInput.includes(dbMood);

      return matchMood;
    });

    const finalResults = filtered.length ? filtered : docs;

    const uniqueMap = new Map();

    finalResults.forEach(d => {
      const key = d.metadata.id || d.metadata.title;
      uniqueMap.set(key, d.metadata);
    });

    const recommendations = Array.from(uniqueMap.values());

    // Enrich with images
    const enrichedRecommendations = await Promise.all(
      recommendations.map(async (item) => {
        let image = item.image; // Use existing image from DB

        // Only fetch if missing or empty
        if (!image || image === "" || image === "NONE") {
          image = await fetchImage(item.title, item.category);
        }
        return { ...item, image };
      })
    );

    res.json({
      recommendations: enrichedRecommendations
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Recommendation failed"
    });
  }
});

export default router;
