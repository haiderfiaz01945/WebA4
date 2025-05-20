import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { fetchProducts } from "./firebaseService";
import './App.css'
function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    const data = await fetchProducts();
    console.log(data)
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { text, timestamp: new Date() };

    try {
      await addDoc(collection(db, "Data"), product);
      setText("");
      await loadMessages(); // Reload messages after submission
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md"
      >
        <label htmlFor="text" className="text-lg font-medium text-gray-700">
          Enter Text
        </label>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      <div className="mt-10 w-full max-w-md bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Text Messages</h2>
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          <ul className="space-y-3">
            {messages.map((msg) => (
              <li key={msg.id} className="p-3 border rounded shadow-sm">
                <p className="text-gray-800">{msg.text}</p>
                <p className="text-sm text-gray-500">
                  {msg.timestamp?.toDate?.().toLocaleString?.() || "No timestamp"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
