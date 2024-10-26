import React from "react";
import "../styles/Chat.css"; // Import CSS for styling

const messages = [
  {
    user: "Alice",
    content: "Hey! How are you?",
    timestamp: "2024-10-26T12:00:00",
  },
  {
    user: "Bob",
    content: "I’m good, thanks! How about you?",
    timestamp: "2024-10-26T12:01:00",
  },
  {
    user: "Alice",
    content: "Doing well! Just enjoying the day.",
    timestamp: "2024-10-26T12:02:00",
  },
];

const Chat = () => {
  return (
    <div className="chat-container">
      <h1>Chat between Alice and Bob</h1>
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-info">
              <strong>{message.user}</strong>
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="message-text">{message.content}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          // value={newMessage}
          // onChange={(e) => setNewMessage(e.target.value)}

          placeholder="Type your message..."
        />
        <button /*onClick={handleSendMessage}*/>Send</button>
      </div>
    </div>
  );
};

export default Chat;
