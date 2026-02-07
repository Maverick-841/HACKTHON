import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
let data = JSON.parse(rawData);

console.log(`Initial count: ${data.length}`);

const seenTitles = new Set();
const uniqueData = [];
let duplicatesCount = 0;

data.forEach(item => {
    // Normalize title for comparison (trim and lowercase)
    const normalizedTitle = item.title.trim().toLowerCase();

    if (seenTitles.has(normalizedTitle)) {
        console.log(`Duplicate found: "${item.title}" (ID: ${item.id})`);
        duplicatesCount++;
    } else {
        seenTitles.add(normalizedTitle);
        uniqueData.push(item);
    }
});

fs.writeFileSync(dataPath, JSON.stringify(uniqueData, null, 2));

console.log(`✅ Process complete.`);
console.log(`🗑️ Removed ${duplicatesCount} duplicates.`);
console.log(`Final count: ${uniqueData.length}`);
