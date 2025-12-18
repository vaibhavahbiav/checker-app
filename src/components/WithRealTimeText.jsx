import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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
    "Hair Thinning",
    "Burning Sensation",
    "Tingling",
    "Itchiness",
    "Insomnia",
    "Dizzyness",
    "Mood Swings",
    "Shakiness",
    "Dull Pain",
    "Discomfort In The Upper Right Abdomen",
    "Unexplained Weight Loss"
];

// symptom to organ
const symptomToOrgan = {
    "Headache": "head",
    "Dizzyness": "head",
    "Mood Swings": "head",
    "Insomnia": "head",
    "Hair loss": "head",
    "Hair Thinning":"stomach",
    "Burning Sensation": "head",
    "Cough": "lungs",
    "Shortness of breath": "lungs",
    "Sore throat": "lungs",
    "Fever": "lungs",
    "Chest pain": "heart",
    "Fatigue": "heart",
    "Nausea": "stomach",
    "Vomiting": "stomach",
    "Diarrhea": "stomach",
    "Dull Pain": "liver",
    "Discomfort In The Upper Right Abdomen": "liver",
    "Unexplained Weight Loss": "liver",
};

function Organs3D({ activeItems, onHoverOrgan, onHoverPointer }) {
    const activeOrgans = new Set(
        activeItems.map((symptom) => symptomToOrgan[symptom]).filter(Boolean)
    );

    const handleOver = (organ) => (e) => {
        e.stopPropagation();
        onHoverOrgan(organ);
        onHoverPointer({ x: e.clientX, y: e.clientY });
    };

    const handleOut = () => {
        onHoverOrgan(null);
    };

    return (
        <Canvas camera={{ position: [0, 0, 5] }} className="bg-teal-950/90">
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />

            {/* head */}
            <mesh position={[0, 1.2, 0]} onPointerOver={handleOver("Head")} onPointerOut={handleOut}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial
                    color={activeOrgans.has("head") ? "orange" : "#ffffff"}
                    emissive={activeOrgans.has("head") ? "orange" : "#000000"}
                    emissiveIntensity={activeOrgans.has("head") ? 0.5 : 0}
                />
            </mesh>

            {/* heart */}
            <mesh position={[0.0, 0.3, 0.0]} onPointerOver={handleOver("heart")} onPointerOut={handleOut}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial
                    color={activeOrgans.has("heart") ? "pink" : "#ffffff"}
                    emissive={activeOrgans.has("heart") ? "pink" : "#000000"}
                    emissiveIntensity={activeOrgans.has("heart") ? 0.5 : 0}
                />
            </mesh>

            {/* liver */}
            <mesh position={[-0.3, -0.5, 0]} onPointerOver={handleOver("liver")} onPointerOut={handleOut}>
                <boxGeometry args={[0.2, 0.4, 0.4]} />
                <meshStandardMaterial
                    color={activeOrgans.has("liver") ? "purple" : "#ffffff"}
                    emissive={activeOrgans.has("liver") ? "purple" : "#000000"}
                    emissiveIntensity={activeOrgans.has("liver") ? 0.5 : 0}
                />
            </mesh>
            <mesh position={[0.3, -0.5, 0]} onPointerOver={handleOver("liver")} onPointerOut={handleOut}>
                <boxGeometry args={[0.2, 0.4, 0.4]} />
                <meshStandardMaterial
                    color={activeOrgans.has("liver") ? "purple" : "#ffffff"}
                    emissive={activeOrgans.has("liver") ? "purple" : "#000000"}
                    emissiveIntensity={activeOrgans.has("liver") ? 0.5 : 0}
                />
            </mesh>

            {/* lungs */}
            <mesh position={[-0.5, -1.2, 0]} onPointerOver={handleOver("lung")} onPointerOut={handleOut}>
                <boxGeometry args={[0.3, 0.5, 0.4]} />
                <meshStandardMaterial
                    color={activeOrgans.has("lungs") ? "blue" : "#ffffff"}
                    emissive={activeOrgans.has("lungs") ? "blue" : "#000000"}
                    emissiveIntensity={activeOrgans.has("lungs") ? 0.5 : 0}
                />
            </mesh>
            <mesh position={[0.5, -1.2, 0]} onPointerOver={handleOver("lung")} onPointerOut={handleOut}>
                <boxGeometry args={[0.3, 0.5, 0.4]} />
                <meshStandardMaterial
                    color={activeOrgans.has("lungs") ? "blue" : "#ffffff"}
                    emissive={activeOrgans.has("lungs") ? "blue" : "#000000"}
                    emissiveIntensity={activeOrgans.has("lungs") ? 0.5 : 0}
                />
            </mesh>

            {/* stomach */}
            <mesh position={[0.0, -2, 0]} rotation={[0, 0, Math.PI / 2]} onPointerOver={handleOver("stomach")} onPointerOut={handleOut}>
                <capsuleGeometry args={[0.2, 0.7, 4, 8]} />
                <meshStandardMaterial
                    color={activeOrgans.has("stomach") ? "yellow" : "#ffffff"}
                    emissive={activeOrgans.has("stomach") ? "yellow" : "#000000"}
                    emissiveIntensity={activeOrgans.has("stomach") ? 0.5 : 0}
                />
            </mesh>

            <OrbitControls enablePan={false} />
        </Canvas>
    );
}


export default function WithRealTimeText() {
    const [activeItems, setActiveItems] = useState([]);
    const [hoveredOrgan, setHoveredOrgan] = useState(null);
    const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

    const [description, setDescription] = useState("");

    const toggleSymptom = (item) => {
        setActiveItems((prev) =>
            prev.includes(item)
                ? prev.filter((s) => s !== item)
                : [...prev, item]
        );
    };

    const listRefs = useRef({});

    useEffect(() => {
        if (!activeItems) return;
        const el = listRefs.current[activeItems];
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [activeItems]);

    const handleSelect = () => {
        const selection = document.getSelection();
        const text = (selection && selection.toString().trim()) || "";
        if (!text) return;

        const matched = symptoms.filter((item) =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        if (matched.length === 0) return;

        setActiveItems((prev) => {
            const next = [...prev];
            matched.forEach((m) => {
                if (!next.includes(m)) next.push(m);
            });
            // scroll to matched
            setTimeout(() => {
                matched.forEach((m) => {
                    const el = listRefs.current[m];
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                });
            }, 0);
            return next;
        });
    };

    // smallcase and removes everything except small case or normalize i guess
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

    const updateActiveFromText = (text) => {
        const normalizedText = normalize(text);

        const textWords = new Set(
            normalizedText.split(/\s+/).filter(Boolean)
        );

        const matched = symptoms.filter((symptom) => {
            const words = normalize(symptom).split(/\s+/).filter(Boolean);
            // matches any word/s to string. and it is Set so no duplicates
            return words.some((w) => textWords.has(w));
        });

        setActiveItems(matched);
    };


    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
        updateActiveFromText(value);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500/30 to-80% to-green-200/30 font-mono">
            <div className="w-full max-w-5xl mx-auto px-10 py-12 sm:px-20 md:px-10">
                <div className="flex flex-col-reverse space-y-5 md:space-y-0 md:flex-row md:space-x-5 xl:space-x-10">
                    {/* left side */}
                    <div className="mt-3 md:mt-0 md:w-1/2 w-full bg-stone-100 border-b-2 border-green-800 shadow py-2 pl-4 pr-1">
                        <h2 className="font-semibold mb-2 text-lg border-l-2 border-green-800 pl-4 md:text-base drop-shadow xl:text-lg">
                            Symptoms
                        </h2>
                        <ul className="space-y-1 text-sm md:text-base max-h-80 overflow-y-auto px-4 custom-scrollbar">
                            {symptoms.map((item) => {
                                const isActive = activeItems.includes(item);
                                return (
                                    <li
                                        key={item}
                                        ref={(el) => {
                                            listRefs.current[item] = el;
                                        }}
                                        onClick={() => toggleSymptom(item)}
                                        className={`py-2 sm:py-3 px-1 cursor-pointer transition-all ${isActive
                                            ? "border-b-2 border-green-800 text-stone-950 bg-gradient-to-r from-green-500/30 to-80% to-green-200/30 font-semibold pl-3"
                                            : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {item}
                                    </li>
                                );
                            })}

                        </ul>
                    </div>

                    <span className="self-center text-green-950 -rotate-90 text-lg md:rotate-0 lg:text-2xl">
                        &larr;
                    </span>

                    {/* right side */}
                    <div className="md:w-1/2 w-full bg-stone-100 border-b-2 border-green-800 shadow text-sm md:text-base leading-relaxed px-4 py-2">
                        <h2 className="font-semibold mb-2 text-lg border-l-2 border-green-800 pl-4 md:text-base drop-shadow xl:text-lg">
                            Patient Description
                        </h2>
                        <textarea
                            className="p-2 w-full h-40 md:h-56 lg:h-64 resize-none outline-none text-stone-800 bg-transparent placeholder:text-stone-400 placeholder:italic focus:shadow "
                            value={description}
                            placeholder="your symptoms..."
                            onMouseUp={handleSelect}
                            onChange={handleDescriptionChange}
                        />
                    </div>

                </div>

                <p className="mt-3 text-xs text-green-950 drop-shadow">How to - Now you can type on your own. And you can also select like earlier which is unnecessary, but you can.</p>

                {/* 3d model implementation, vaguely human but working as intended */}
                <div className="mt-6 bg-stone-100 border-b-2 border-green-800 shadow overflow-hidden w-full place-self-center">
                    <div className="px-4 py-2">
                        <div className="border-l-2 border-green-800 pl-4">
                            <h3 className="font-semibold text-base text-green-950 drop-shadow leading-snug">
                                3D model very remotely ressembling human organs
                            </h3>
                            <p className="text-xs text-green-900 mt-2">
                                Higlights different organs corresponding to the selected symptoms.
                            </p>
                        </div>
                    </div>
                    <div className="h-60 lg:h-[350px]">
                        <Organs3D activeItems={activeItems} onHoverOrgan={setHoveredOrgan} onHoverPointer={(pos) => setPointerPos(pos)} />

                        {/* organ name */}
                        {hoveredOrgan && (
                            <div className="fixed z-50 px-2 py-1 text-xs bg-green-200/30 text-green-300 rounded" style={{ left: pointerPos.x + 12, top: pointerPos.y + -12 }}>{hoveredOrgan}</div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
