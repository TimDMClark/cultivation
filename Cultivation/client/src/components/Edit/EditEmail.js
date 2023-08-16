import React, { useState } from 'react';
import { editUser } from '../../APIManagers/UserManager';

export default function EditEmail({ currentUser, onUpdate }) {
    const [newEmail, setNewEmail] = useState(currentUser.email);
    
    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleEmailSubmit = () => {
        const updatedUser = {
            ...currentUser,
            email: newEmail
        };

        editUser(updatedUser)
            .then(() => {
                onUpdate(updatedUser);
            })
            .catch(error => {
                console.error("Error updating user email:", error);
            });
    };

    return (
        <div>
            <input 
                type="email"
                value={newEmail}
                onChange={handleEmailChange}
            />
            <button onClick={handleEmailSubmit}>Update Email</button>
        </div>
    );
}
