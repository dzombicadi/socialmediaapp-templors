import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ListGroup, Image } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs"; // Import the chat icon
import { firebaseFirestore } from "../configuration";
import { useAuth } from "../contexts/AuthContext.tsx";
import { createOrGetChat } from "../services/MessageService.ts";
import { useNavigate } from "react-router-dom";

const SidebarNav = () => {
  const [users, setUsers] = useState([]);
  const { uid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const userDocs = await getDocs(
        collection(firebaseFirestore, "users")
      ).catch((err) =>
        console.log("Error while fetching users for sidebar: " + err)
      );
      console.log(userDocs);
      const fetched = userDocs.docs.map((user) => ({
        name: user.data().name,
        profilePic: "https://via.placeholder.com/50",
        userId: user.id,
      }));

      setUsers(fetched);
    };

    fetchUsers();
  }, []);

  const handleMessageButton = async (otherId) => {
    console.log("Clicked on button id: " + otherId);
    const chat = await createOrGetChat(uid, otherId)
    .catch((err) => console.log("Err in createOrGetChar: " + err));
    navigate(`/chat/${chat.id}`); 
  }

  return (
    <ListGroup variant="flush">
      {users.map((user, index) => (
        <ListGroup.Item key={index} className="d-flex align-items-center">
          <Image
            src={user.profilePic}
            roundedCircle
            style={{ width: "40px", marginRight: "10px" }}
          />

          <div className="flex-grow-1">{user.name}</div>

          <BsChatDots
            size={20}
            className="text-primary text-me"
            style={{ cursor: "pointer" }}
            onClick={() => handleMessageButton(user.userId)}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SidebarNav;
