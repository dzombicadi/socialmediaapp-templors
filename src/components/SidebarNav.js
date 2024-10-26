import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ListGroup, Image } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs";
import { firebaseFirestore } from "../configuration";

const SidebarNav = () => {
  const [users, setUsers] = useState([]);

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
            className="text-me text-primary"
            style={{ cursor: "pointer" }}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SidebarNav;
