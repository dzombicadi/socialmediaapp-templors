import React from "react";
import { ListGroup, Image } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs"; // Import the chat icon

const users = [
  { name: "John Doe", profilePic: "https://via.placeholder.com/50" },
  { name: "Jane Smith", profilePic: "https://via.placeholder.com/50" },
  { name: "Michael Brown", profilePic: "https://via.placeholder.com/50" },
  // Add more users as needed
];

const SidebarNav = () => {
  return (
    <ListGroup variant="flush">
      {users.map((user, index) => (
        <ListGroup.Item key={index} className="d-flex align-items-center">
          {/* User profile image */}
          <Image
            src={user.profilePic}
            roundedCircle
            style={{ width: "40px", marginRight: "10px" }}
          />
          {/* User name */}
          <div className="flex-grow-1">{user.name}</div>
          {/* Messaging icon */}
          <BsChatDots
            size={20}
            className="text-primary"
            style={{ cursor: "pointer" }}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SidebarNav;
