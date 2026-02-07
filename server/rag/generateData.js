import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const existingData = JSON.parse(rawData);

// Get last ID
const lastId = existingData.reduce((max, item) => Math.max(max, item.id), 0);
console.log(`Current last ID: ${lastId}`);

const categories = [
    "Movies", "Web Series", "Music", "Books", "Anime", "Documentaries", "Podcasts"
];

const moods = [
    "Feeling Low", "Need Motivation", "Want Peace", "Just for Fun", "Want Focus"
];

const languages = [
    "English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali"
];

const sampleTitles = {
    "Movies": ["The Silent Echo", "Urban jungle", "Lost in Time", "Future World", "Ocean's Song", "Desert Storm", "City Lights", "Mountain Peak", "River Flow", "Sky High"],
    "Web Series": ["Code Red", "Startup Life", "Cyber Chase", "Mystery Manor", "Love & Logic", "The Office Life", "Space Drift", "Comedy Club", "Daily Grind", "Weekend Vibes"],
    "Music": ["Melody of Rain", "Beats of Life", "Soulful Night", "Morning Energy", "Focus Flow", "Relaxing Tones", "Party Vibes", "Workout Pump", "Deep Dive", "Acoustic Dreams"],
    "Books": ["The Art of Living", "Mind Power", "History of Now", "Future Tech", "Cooking 101", "Travel Guide", "Sci-Fi Tales", "Mystery Novels", "Self Help Guide", "Biography of a Legend"],
    "Anime": ["Ninja Chronicles", "Spirit World", "Mecha Wars", "School Days", "Hero's Journey", "Fantasy Land", "Dark Souls", "Light Bringer", "Cyberpunk Edge", "Magic Academy"],
    "Documentaries": ["Planet Earth", "History of War", "Science Explained", "Tech Revolution", "Nature's Fury", "Space Exploration", "Ocean Depths", "Human Mind", "Ancient Civs", "Food Science"],
    "Podcasts": ["Tech Talk", "Daily News", "Mindset Shift", "Comedy Hour", "Story Time", "Science Today", "History Buff", "Health & Wellness", "Money Matters", "Creative Minds"]
};

const newData = [];
let currentId = lastId + 1;

// Generate ~72 items for each category (7 categories * 72 = 504 items)
// Using a higher count to meet the 500 requirement
const ITEMS_PER_CATEGORY = 72;

categories.forEach(category => {
    for (let i = 0; i < ITEMS_PER_CATEGORY; i++) {
        const titleBase = sampleTitles[category][Math.floor(Math.random() * sampleTitles[category].length)];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        const randomLang = languages[Math.floor(Math.random() * languages.length)];

        // Generate unique seeded image immediately
        const uniqueImage = `https://picsum.photos/seed/${currentId}/600/900`;

        newData.push({
            id: currentId++,
            title: `${titleBase} ${currentId}`, // Ensure unique title with ID
            category: category,
            language: randomLang,
            mood: randomMood,
            description: `A ${randomMood.toLowerCase()} ${category.toLowerCase()} experience in ${randomLang}. Generated content #${currentId}.`,
            image: uniqueImage
        });
    }
});

const finalData = [...existingData, ...newData];

fs.writeFileSync(dataPath, JSON.stringify(finalData, null, 2));

console.log(`Successfully added ${newData.length} new items. Total items: ${finalData.length}`);
