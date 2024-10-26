import React, { useEffect, useState } from "react";
import "../styles/Chat.css";
import { useNavigate, useParams } from "react-router-dom";
import { getChat, getChatRef } from "../services/MessageService.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { UserProvider, getUserData } from "../services/UserProvider.ts";

const Chat = () => {
  const navigate = useNavigate();
  const handleGoToFeed = () => {
    navigate("/feedpage");
  };

  const { chatId } = useParams();
  const { uid } = useAuth();
 
  const [messages, setMessages] = useState([]);
  const [outgoing, setOutgoing] = useState();

  const fetchUserData = async (userid) => {
    const uData = await getUserData(userid);
    setUserData(uData);
  }

  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetchUserData(uid);
  }, [])

  const fetchMessages = async () => {
    const msgs = await getChat(chatId);

    try {
      if (msgs.exists()) { 
        const messagesArray = msgs.data().messages || [];
        const fetched = messagesArray.map((msg) => ({
            ...msg,
            timestamp: msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleString() : null, 
        }));
        console.log("Fetched messages array: ", fetched); 
        setMessages(fetched);
      } else {
        console.log("No messages found for chat id: " + chatId);
        setMessages([]); 
      }
    } catch (err) {
        console.log("Could not find chat " + chatId, err);
        setMessages([]); 
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (outgoing) {
      const newMessage = {
        uid: uid,
        content: outgoing,
        timestamp: new Date(serverTimestamp()).toLocaleString()
      };

      const chatRef = getChatRef();
      await updateDoc(doc(chatRef, chatId), {
        messages: arrayUnion(newMessage)
      });
      
      setOutgoing("");
      fetchMessages();
    }
  }

  return (
    <div className="chat-container">
      <h1>{userData.firstName + " " + userData.lastName + "'s chat"}</h1>
      <div className="messages-container">
        {messages && messages.map((message) => (
          <div key={message.uid} className="message">
            <div className="message-info">
              <strong>{message.uid}</strong>
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
          value={outgoing}
          onChange={(e) => setOutgoing(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={() => handleSendMessage()}>
          Send
        </button>
        <button onClick={handleGoToFeed} className="return-button">
          Return
        </button>
      </div>
    </div>
  );
};

export default Chat;
