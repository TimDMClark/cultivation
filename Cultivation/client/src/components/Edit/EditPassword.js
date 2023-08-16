import React, { useState } from 'react';
import { editUser } from '../../APIManagers/UserManager';

export default function EditPassword({ currentUser, onUpdate }) {
    const [newPassword, setNewPassword] = useState("");

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handlePasswordSubmit = () => {
        const updatedUser = {
            ...currentUser,
            password: newPassword
        };

        editUser(updatedUser)
            .then(() => {
                onUpdate(updatedUser);
            })
            .catch(error => {
                console.error("Error updating user password:", error);
            });
    };

    return (
        <div>
            <input 
                type="password"
                value={newPassword}
                placeholder="Enter new password"
                onChange={handlePasswordChange}
            />
            <button onClick={handlePasswordSubmit}>Update Password</button>
        </div>
    );
}
