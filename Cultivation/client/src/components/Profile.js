import React, { useState, useEffect, useRef } from "react";
import { getUserById, editUser } from "../APIManagers/UserManager";
import { getAllRelationshipStatus } from "../APIManagers/RelationshipStatusManager";
import { Button, InputGroup } from "reactstrap";
import { FormControl } from "react-bootstrap";

export default function Profile() {
    const [user, setUser] = useState({});
    const [relationshipStatus, setRelationshipStatus] = useState("");
    const [editingField, setEditingField] = useState(""); // Store which field is currently being edited
    const fileInput = useRef(null);

    const handleUpdate = (field, value) => {
        const updatedUser = { ...user, [field]: value };
        editUser(updatedUser)
            .then(response => {
                if (response.ok) {
                    setUser(updatedUser);
                } else {
                    console.error(`Failed to update ${field}`);
                }
            })
            .catch(error => console.error(`Error updating ${field}:`, error));

        setEditingField("");  // Reset the editing field
    };


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

    return (
        <div>
          <h2>Profile</h2>
          <img src={`data:image/jpeg;base64,${user.profilePicture}`} alt="Profile" />
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
          <p>
            Name: {editingField === "name" 
                ? <InputGroup>
                    <FormControl defaultValue={user.name} onBlur={e => handleUpdate("name", e.target.value)} />
                    <InputGroup.Append>
                        <Button outline onClick={e => handleUpdate("name", e.target.value)}>Save</Button>
                    </InputGroup.Append>
                  </InputGroup>
                : <span>{user.name} <Button outline size="sm" onClick={() => setEditingField("name")}>Edit</Button></span>}
          </p>
          <p>
            Email: {editingField === "email" 
                ? <InputGroup>
                    <FormControl defaultValue={user.email} onBlur={e => handleUpdate("email", e.target.value)} />
                    <InputGroup.Append>
                        <Button outline onClick={e => handleUpdate("email", e.target.value)}>Save</Button>
                    </InputGroup.Append>
                  </InputGroup>
                : <span>{user.email} <Button outline size="sm" onClick={() => setEditingField("email")}>Edit</Button></span>}
          </p>
          <p>
            Bio: {editingField === "bio" 
                ? <InputGroup>
                    <FormControl defaultValue={user.bio} onBlur={e => handleUpdate("bio", e.target.value)} />
                    <InputGroup.Append>
                        <Button outline onClick={e => handleUpdate("bio", e.target.value)}>Save</Button>
                    </InputGroup.Append>
                  </InputGroup>
                : <span>{user.bio} <Button outline size="sm" onClick={() => setEditingField("bio")}>Edit</Button></span>}
          </p>
          <p>Relationship Status: {relationshipStatus}</p>
        </div>
    );
}
