import React, { useState, useRef, useEffect } from "react";

function AICall() {
    const [messages, setMessages] = useState([]);
    const [listening, setListening] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const [locked, setLocked] = useState(false);
    const [showDoctorModal, setShowDoctorModal] = useState(false);
    const recognitionRef = useRef(null);
    const stateRef = useRef("IDLE"); // IDLE | LISTENING | SPEAKING
    const finalResponseRef = useRef(false);

    const token = localStorage.getItem('token');

    // ---------------- INIT SPEECH ----------------
    useEffect(() => {
        const session = crypto.randomUUID();
        setSessionId(session);


        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = async (event) => {
            if (locked) return;
            

            const text =
                event.results[event.results.length - 1][0].transcript;

            console.log("User said:", text);
            console.log("Session ID:", session);

            const response = await sendToAI(text, session);
            speak(response.output);
            
        };

        recognition.onerror = (event) => {
            console.log("Speech error:", event.error);
        };

        recognition.onend = () => {
            if (stateRef.current === "LISTENING" && !locked) {
                safeStart();
            }
        };

        recognitionRef.current = recognition;
    }, []);

    // ---------------- SAFE START/STOP ----------------
    function safeStart() {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        try {
            recognition.start();
        } catch { }
    }

    function safeStop() {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        try {
            recognition.stop();
        } catch { }
    }

    // ---------------- START NEW CONSULTATION ----------------
    async function startListening() {
        setMessages([]);
        setShowDoctorModal(false);
        setLocked(false);

        setListening(true);
        stateRef.current = "SPEAKING";

        const res = await fetch(
            "https://w2y3wr5xdk.execute-api.ap-southeast-1.amazonaws.com/outpatient/ai-call",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    sessionId: sessionId,
                    message: "",
                    history: []
                })
            }
        );

        const data = await res.json();

        const greeting = data.output;

        setMessages([
            { role: "assistant", content: greeting }
        ]);

        speak(greeting);
    }

    function stopListening() {
        setListening(false);
        setLocked(false);
        setShowDoctorModal(false);
        stateRef.current = "IDLE";
        safeStop();
    }

    // ---------------- SEND TO AI ----------------
    async function sendToAI(text, sid) {
        let updatedHistory;
        console.log(sessionId)

        setMessages((prev) => {
            updatedHistory = [
                ...prev,
                { role: "user", content: text }
            ];
            return updatedHistory;
        });

        const res = await fetch(
            "https://w2y3wr5xdk.execute-api.ap-southeast-1.amazonaws.com/outpatient/ai-call",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    sessionId: sid,
                    message: text,
                    history: updatedHistory
                })
            }
        );

        const data = await res.json();

        const finalHistory = [
            ...updatedHistory,
            { role: "assistant", content: data.output }
        ];

        const lowerOutput = data.output.toLowerCase();
        const isFinal =
            lowerOutput.includes("thank you") &&
            lowerOutput.includes("i have all the necessary information for your consultation");
        finalResponseRef.current = isFinal;
        setMessages(finalHistory);

        return data;
    }

    function cleanForSpeech(text) {
        return text
            .replace(/S\/O/gi, "son of")
            .replace(/\//g, " ")
            .replace(/  +/g, " ");
    }

    // ---------------- SPEAK ----------------
    function speak(text) {
        if (!text) return;
        text = cleanForSpeech(text);

        stateRef.current = "SPEAKING";
        safeStop();

        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-SG";

        speech.onend = () => {
            if (finalResponseRef.current) {
                finalResponseRef.current = false;
                setLocked(true);
                setShowDoctorModal(true);
                stateRef.current = "IDLE";
                return;
            }

            stateRef.current = "LISTENING";
            safeStart();
        };

        window.speechSynthesis.speak(speech);
    }

    const currentStatus = locked
        ? "Waiting for doctor to join"
        : stateRef.current === "SPEAKING"
        ? "Assistant is speaking..."
        : stateRef.current === "LISTENING"
        ? "Listening for your response..."
        : "Ready to start consultation";

    return (
        <div className="call-screen">
            <div className="call-card">
                <div className="call-header">
                    <div>
                        <span className="call-title">AI Nurse Assistant</span>
                        <p className="call-subtitle">Session ID: {sessionId || "Generating..."}</p>
                    </div>
                    <div className={`status-badge ${locked ? 'status-waiting' : 'status-active'}`}>
                        {currentStatus}
                    </div>
                </div>

                <div className="call-body">
                    <div className="call-controls">
                        <button
                            className="call-button start"
                            onClick={startListening}
                            disabled={listening || locked}
                        >
                            Start Call
                        </button>
                        <button
                            className="call-button stop"
                            onClick={stopListening}
                            disabled={!listening && !locked}
                        >
                            End Call
                        </button>
                    </div>

                    <div className="chat-window">
                        <div className="chat-header">Conversation</div>
                        <div className="message-list">
                            {messages.length === 0 ? (
                                <div className="empty-message">No messages yet. Start the consultation.</div>
                            ) : (
                                messages.map((m, i) => (
                                    <div key={i} className={`message-bubble ${m.role === 'assistant' ? 'assistant' : 'user'}`}>
                                        <span className="message-role">{m.role}</span>
                                        <p>{m.content}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showDoctorModal && (
                <div className="popup-overlay">
                    <div className="popup-modal">
                        <h3>Doctor Joining</h3>
                        <p>The AI has gathered the required details. Please wait while the doctor joins the call.</p>
                        <button className="popup-close" onClick={() => setShowDoctorModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AICall;