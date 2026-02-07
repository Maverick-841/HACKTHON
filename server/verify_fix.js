import axios from "axios";

async function verify() {
    try {
        const res = await axios.post("http://127.0.0.1:5000/api/mood/recommend", {
            mood: "Need Motivation",
            language: "Telugu",
            category: "Movies"
        });

        console.log(`RECO OUTPUT: ${res.data.recommendations.length} items found.`);

        const results = res.data.recommendations;
        if (results.length > 0) {
            results.forEach(r => {
                console.log(`- ${r.title} (${r.language}) [${r.mood}]`);
            });

            const hasWrongLang = results.some(r => r.language.toLowerCase() !== "telugu");
            const hasWrongMood = results.some(r => !r.mood.toLowerCase().includes("motivation"));

            if (hasWrongLang || hasWrongMood) {
                console.log("FAIL: Found mismatched items!");
            } else {
                console.log("PASS: All items match strictly.");
            }
        } else {
            console.log("PASS: No results found (Strict mode works).");
        }
    } catch (err) {
        console.error("Verification failed:", err.message);
        if (err.response) {
            console.error("Status:", err.response.status);
            console.error("Data:", err.response.data);
        }
    }
}

verify();
