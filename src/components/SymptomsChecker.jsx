import React, { useEffect, useRef, useState } from "react";

const symptoms = [
    "Fever",
    "Cough",
    "Shortness of breath",
    "Headache",
    "Chest pain",
    "Sore throat",
    "Fatigue",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Hair loss",
    "Burning Sensation",
    "Tingling",
    "Itchiness",
    "Insomnia",
    "Dizzyness",
    "Mood Swings",
    "Shakiness"
];

export default function SymptomsChecker() {
    const [activeItem, setActiveItem] = useState(null);
    const listRefs = useRef({});

    useEffect(() => {
        if (!activeItem) return;
        const el = listRefs.current[activeItem];
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [activeItem]);

    const handleSelect = () => {
        const selection = document.getSelection();
        const text = (selection && selection.toString().trim()) || "";
        if (!text) return;

        const match = symptoms.find((item) =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        if (match) {
            setActiveItem(match);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500/30 to-80% to-green-200/30 font-mono">
            <div className="w-full max-w-5xl mx-auto px-10 py-10 sm:px-20 md:px-10 ">
                <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5 xl:space-x-10">
                    {/* left side */}
                    <div className="md:w-1/3 w-full bg-white border-b-2 border-green-800 shadow px-4 py-2 ">
                        <h2 className="font-semibold mb-2 text-sm border-l-2 border-green-800 pl-4 md:text-base drop-shadow xl:text-lg">
                            Symptoms
                        </h2>
                        <ul className="space-y-1 text-sm md:text-base max-h-80  overflow-y-auto">
                            {symptoms.map((item) => (
                                <li
                                    key={item}
                                    ref={(el) => {
                                        listRefs.current[item] = el;
                                    }}
                                    className={`py-3 px-1 cursor-pointer transition-all ${activeItem === item
                                        ? "border-b-2 border-green-800 text-stone-950 bg-gradient-to-r from-green-500/30 to-80% to-green-200/30 font-semibold pl-3"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                            <span className="self-center text-green-950 rotate-90 text-lg md:rotate-0 lg:text-2xl">&larr;</span>
                    {/* right side */}
                    <div className="md:w-2/3 w-full bg-white border-b-2 border-green-800 shadow px-4 py-2 text-sm md:text-base leading-relaxed">
                        <h2 className="font-semibold mb-2 text-sm border-l-2 border-green-800 pl-4 md:text-base drop-shadow xl:text-lg">
                            Patient Description
                        </h2>
                        <p
                            className="text-gray-800"
                            onMouseUp={handleSelect}
                        >
                            The patient complains of persistent fever and severe headache over
                            the last three days. There is also a dry cough and mild shortness
                            of breath on exertion. Fatigue and sore throat were noted at the
                            start of the illness. The patient denies nausea, vomiting, or
                            diarrhea.
                        </p>
                    </div>
                </div>
                <p className="mt-3 text-xs text-green-950 drop-shadow">
                    How to - Select words on right side to find/highlight same on the left side.
                </p>
            </div>
        </div>
    );
}
