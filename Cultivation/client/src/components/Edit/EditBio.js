import React, { useState } from 'react';
import { editUser } from '../../APIManagers/UserManager';

export default function EditBio({ currentUser, onUpdate }) {
    const [newBio, setNewBio] = useState(currentUser.bio);
    
    const handleBioChange = (e) => {
        setNewBio(e.target.value);
    };

    const handleBioSubmit = () => {
        const updatedUser = {
            ...currentUser,
            bio: newBio
        };

        editUser(updatedUser)
            .then(() => {
                onUpdate(updatedUser);
            })
            .catch(error => {
                console.error("Error updating user bio:", error);
            });
    };

    return (
        <div>
            <textarea 
                value={newBio}
                onChange={handleBioChange}
            />
            <button onClick={handleBioSubmit}>Update Bio</button>
        </div>
    );
}
