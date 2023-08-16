import React, { useState } from 'react';
import { editUser } from '../../APIManagers/UserManager';

export default function EditName({ currentUser, onUpdate }) {
    const [newName, setNewName] = useState(currentUser.name);
    
    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNameSubmit = () => {
        const updatedUser = {
            ...currentUser,
            name: newName
        };

        editUser(updatedUser)
            .then(() => {
                onUpdate(updatedUser); // update the Profile component with new user data
            })
            .catch(error => {
                console.error("Error updating user name:", error);
            });
    };

    return (
        <div>
            <input 
                type="text"
                value={newName}
                onChange={handleNameChange}
            />
            <button onClick={handleNameSubmit}>Update Name</button>
        </div>
    );
}
