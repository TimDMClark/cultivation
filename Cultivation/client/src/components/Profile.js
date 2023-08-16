import React, { useState, useEffect, useRef } from "react";
import { getUserById, editUser } from "../APIManagers/UserManager";
import { getAllRelationshipStatus } from "../APIManagers/RelationshipStatusManager";
import EditName from "./Edit/EditName";
import DeleteCurrentUser from "./Delete/DeleteCurrentUser";
import EditEmail from "./Edit/EditEmail";
import EditBio from "./Edit/EditBio";
import EditRelationshipStatus from "./Edit/EditRelationshipStatus";
import EditPassword from "./Edit/EditPassword";
import { Card, CardBody, CardTitle, CardImg, Button, CardText } from 'reactstrap';
import './Profile.css';

export default function Profile() {
    const [user, setUser] = useState({});
    const [relationshipStatus, setRelationshipStatus] = useState("");
    const [editingName, setEditingName] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingBio, setEditingBio] = useState(false);
    const [editingRelationshipStatus, setEditingRelationshipStatus] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
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
          getAllRelationshipStatus()
            .then((statuses) => {
              const status = statuses.find(s => s.id === user.relationshipId);
                setRelationshipStatus(status.status);
            })
            .catch(error => {
              console.error("Error fetching relationship statuses:", error);
            });
    }, [user]);

    const handleUserUpdate = (updatedUser) => {
      setUser(updatedUser);
      setEditingName(false);
      setEditingEmail(false);
      setEditingBio(false);
      setEditingRelationshipStatus(false);
      setEditingPassword(false);
  };

  const handleUserDeleted = () => {
    localStorage.clear();
    window.location.reload();
};

    return (
      <div className="profile-container">
      <h2>{user.name}'s Profile</h2>
      <Card>
          <CardImg top width="100%" src={`data:image/jpeg;base64,${user.profilePicture}`} alt="Profile" />
          {!user.profilePicture && (
              <div className="upload-btn-wrapper">
                  <Button color="primary" onClick={() => fileInput.current.click()}>Upload Profile Picture</Button>
                  <input type="file" style={{ display: 'none' }} onChange={handleImageSelectAndUpload} ref={fileInput} />
              </div>
          )}
          <CardBody>
              <CardTitle tag="h5">Name: {user.name}</CardTitle>
              <Button color="link" onClick={() => setEditingName(true)}>Edit Name</Button>
              {editingName && <EditName currentUser={user} onUpdate={handleUserUpdate} />}
              
              <CardText>Email: {user.email}</CardText>
              <Button color="link" onClick={() => setEditingEmail(true)}>Edit Email</Button>
              {editingEmail && <EditEmail currentUser={user} onUpdate={handleUserUpdate} />}

              <CardText>Bio: {user.bio}</CardText>
              <Button color="link" onClick={() => setEditingBio(true)}>Edit Bio</Button>
              {editingBio && <EditBio currentUser={user} onUpdate={handleUserUpdate} />}
              
              <CardText>Relationship Status: {relationshipStatus}</CardText>
              <Button color="link" onClick={() => setEditingRelationshipStatus(true)}>Edit Relationship Status</Button>
              {editingRelationshipStatus && <EditRelationshipStatus currentUser={user} onUpdate={handleUserUpdate} />}
              
              <Button color="link" onClick={() => setEditingPassword(true)}>Edit Password</Button>
              {editingPassword && <EditPassword currentUser={user} onUpdate={handleUserUpdate} />}
              
              <DeleteCurrentUser currentUser={user} onUserDeleted={handleUserDeleted} />
          </CardBody>
      </Card>
  </div>
    );
}
