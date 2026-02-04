import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useShopContext } from "../context/shopcontext";


export default function Language() {
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();
    const { updatePreferences } = useShopContext(); // ✅ ADD THIS

    const options = [
        { label: "Hindi", code: "IN" },
        { label: "English", code: "GB" },
        { label: "Telugu", code: "IN" },
        { label: "Tamil", code: "IN" },
        { label: "Kannada", code: "IN" },
        { label: "Malayalam", code: "IN" },
        { label: "Marathi", code: "IN" },
        { label: "Bengali", code: "IN" }
    ];

    function handleSelect(item) {
        const newSelection = selectedItems.includes(item)
            ? selectedItems.filter((i) => i !== item)             
            : [...selectedItems, item];

        setSelectedItems(newSelection);

    }

    // ✅ MODIFIED THIS FUNCTION
    function handleNext() {
        if (selectedItems.length === 0) return;

        // Ensure languages are saved to context
        updatePreferences({ selectedLanguages: selectedItems });

        navigate("/genres"); // 👈 CHANGED from "/genres" to "/content-type"
    }

    function handleBack() {
        navigate("/mode");
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
                    <h1 className="text-3xl font-bold">
                        What language do you enjoy?
                    </h1>
                    <p className="text-white/60 mt-2">
                        Select your preferred languages
                    </p>
                </div>

                {/* Selected Chips */}
                {selectedItems.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {selectedItems.map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-sm"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}

                {/* Language Options */}
                <div className="flex flex-wrap justify-center gap-4">
                    {options.map(({ label, code }) => {
                        const isSelected = selectedItems.includes(label);

                        return (
                            <button
                                key={label}
                                onClick={() => handleSelect(label)}
                                className={`flex items-center gap-3 px-5 py-2 rounded-full border transition-all relative
                                ${isSelected
                                        ? "bg-purple-600 border-purple-400 scale-105"
                                        : "bg-white/5 border-white/20 hover:bg-white/10"
                                    }`}
                            >
                                <ReactCountryFlag
                                    svg
                                    countryCode={code}
                                    style={{ width: "1.5em", height: "1.5em" }}
                                />
                                <span>{label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6">
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 rounded-xl border border-white/30 hover:bg-white/10 transition"
                    >
                        ← Back
                    </button>

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