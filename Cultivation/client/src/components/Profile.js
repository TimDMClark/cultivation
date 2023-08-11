import React, { useState, useEffect, useRef } from "react";
import { getUserById, editUser } from "../APIManagers/UserManager";
import { getAllRelationshipStatus } from "../APIManagers/RelationshipStatusManager";
import './Profile.css';
import EditName from "./EditName";
import DeleteCurrentUser from "./DeleteCurrentUser";

export default function Profile() {
    const [user, setUser] = useState({});
    const [relationshipStatus, setRelationshipStatus] = useState("");
    const [editingName, setEditingName] = useState(false);
    const fileInput = useRef(null);

    const handleImageSelectAndUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          const base64String = e.target.result.split(',')[1];
          updateUserProfilePicture(base64String);
        };
        reader.onerror = () => {
          console.error("Error reading the file");
        };
      }
    };
  
    function updateUserProfilePicture(base64Image) {
      const updatedUser = {
        ...user,
        profilePicture: base64Image
      };

      const handleUserUpdate = (updatedUser) => {
        setUser(updatedUser);
        setEditingName(false);  // Hide the EditName component after updating
    };
  
      editUser(updatedUser)
        .then(response => {
          if (response.ok) {
            setUser(updatedUser); // update local state
          } else {
            console.error("Failed to update profile picture");
          }
        })
        .catch(error => {
          console.error("Error updating user:", error);
        });
    }

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser && loggedInUser.id) {
          getUserById(loggedInUser.id)
            .then(setUser)
            .catch(error => {
              console.error("Error fetching user by ID:", error);
            });
        }
    }, []);

    useEffect(() => {
        if (user.relationshipId) {
          getAllRelationshipStatus()
            .then((statuses) => {
              const status = statuses.find(s => s.id === user.relationshipId);
              if (status) {
                setRelationshipStatus(status.name);
              } else {
                console.error("No matching status found for:", user.relationshipId);
              }
            })
            .catch(error => {
              console.error("Error fetching relationship statuses:", error);
            });
        }
    }, [user]);

    const handleUserUpdate = (updatedUser) => {
      setUser(updatedUser);
      setEditingName(false); // This line ensures the EditName form closes after an update.
  };

  const handleUserDeleted = () => {
    localStorage.clear();
    window.location.reload();
};


    return (
        <div>
          <h2>Profile</h2>
          <img tag="profile-pic" src={`data:image/jpeg;base64,${user.profilePicture}`} alt="Profile" />
          {!user.profilePicture && (
            <div>
              <input 
                type="file" 
                style={{ display: 'none' }} 
                onChange={handleImageSelectAndUpload} 
                ref={fileInput} 
              />
              <button onClick={() => fileInput.current.click()}>Upload Profile Picture</button>
            </div>
          )}
          <p>Name: {user.name} 
              <button onClick={() => setEditingName(true)}>Edit Name</button> 
          </p>
          {editingName && <EditName currentUser={user} onUpdate={handleUserUpdate} />}
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio}</p>
          <p>Relationship Status: {relationshipStatus}</p>
          <DeleteCurrentUser currentUser={user} onUserDeleted={handleUserDeleted} />
        </div>
    );
}
