import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
let data = JSON.parse(rawData);

console.log(`Total items: ${data.length}`);

// Set to track unique image URLs
const seenImages = new Set();
let updatedCount = 0;

// Known static placeholders to force replace
const staticPlaceholders = [
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1450&auto=format&fit=crop", // Movies
    "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1469&auto=format&fit=crop", // Web Series
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop", // Music
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1470&auto=format&fit=crop", // Books
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1470&auto=format&fit=crop", // Anime
    "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?q=80&w=1470&auto=format&fit=crop", // Documentaries
    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1470&auto=format&fit=crop"  // Podcasts
];

data = data.map(item => {
    // Check if image is one of the known static placeholders OR if we've seen this URL before
    const isStatic = staticPlaceholders.includes(item.image);
    const isDuplicate = seenImages.has(item.image);

    if (isStatic || isDuplicate || !item.image) {
        // Generate a unique seeded image
        // Using picsum for reliability regarding uniqueness
        // Seed ensures consistency for the same ID
        // Dimensions 600x900 (2:3 aspect ratio) suitable for posters
        const uniqueImage = `https://picsum.photos/seed/${item.id}/600/900`;

        item.image = uniqueImage;
        updatedCount++;
    }

    seenImages.add(item.image);
    return item;
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log(`✅ Process complete.`);
console.log(`🔄 Updated ${updatedCount} items to have unique images.`);
console.log(`Total unique images now: ${seenImages.size}`);



