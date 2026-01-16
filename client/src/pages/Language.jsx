import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";   // ✅ added


export default function Language() {
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();


    const options = [
        { label: "Hindi", icon: "🌐" },
        { label: "English", icon: "🌐" },
        { label: "Telugu", icon: "🌐" },
        { label: "Tamil", icon: "🌐" },
        { label: "Kannada", icon: "🌐" },
        { label: "Malayalam", icon: "🌐" },
        { label: "Marathi", icon: "🌐" },
        { label: "Bengali", icon: "🌐" }
    ];


    function handleSelect(item) {
        setSelectedItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    }

    function handleNext() {
        if (selectedItems.length === 0) return;
        navigate('/genres');
    }


    function handleBack() {
        navigate('/Mode'); // go to Home page
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white px-4">
            <div className="max-w-xl w-full space-y-8">


                {/* Globe Icon */}
                <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-white/10 border border-white/20">
                        <Globe className="w-7 h-7 text-blue-400" />
                    </div>
                </div>


                {/* Title */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">What Language do you enjoy?</h1>
                    <p className="text-white/60 mt-2">
                        select your language to help use understand your language
                    </p>
                </div>

                {/* Selected Chips */}
                {selectedItems.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {selectedItems.map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400 text-sm"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}

                {/* Options */}
                <div className="flex flex-wrap justify-center gap-4">
                    {options.map(({ label, icon }) => (
                        <button
                            key={label}
                            onClick={() => handleSelect(label)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all
                ${selectedItems.includes(label)
                                    ? "bg-purple-600 border-purple-400 scale-105"
                                    : "bg-white/5 border-white/20 hover:bg-white/10"
                                }`}
                        >
                            <span className="text-lg">{icon}</span>
                            <span>{label}</span>
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-6">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 rounded-xl border border-white/30 hover:bg-white/10 transition"
                    >
                        ← Back
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        disabled={selectedItems.length === 0}
                        className={`px-8 py-3 rounded-xl font-medium transition-all
            ${selectedItems.length > 0
                                ? "bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105"
                                : "bg-white/10 text-white/40 cursor-not-allowed"
                            }`}
                    >
                        Next →
                    </button>
                </div>

            </div>
        </div>
    );
}
