import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);

  const startChat = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt!");
      return;
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    document.getElementById("chatResponse").innerHTML = data.conversation
    .map((msg) => `<p>${msg.sender}: ${msg.text}</p>`).join("");
  };

  return (
    <div>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
        style={{
          border: "2px solid blue",
        }}
      />
      <button onClick={startChat}> Start</button>
      <div id="chatResponse"></div>
    </div>
  );
}
