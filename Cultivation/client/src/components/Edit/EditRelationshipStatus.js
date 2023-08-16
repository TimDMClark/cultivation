import React, { useState, useEffect } from 'react';
import { editUser } from '../../APIManagers/UserManager';
import { getAllRelationshipStatus } from '../../APIManagers/RelationshipStatusManager';

export default function EditRelationshipStatus({ currentUser, onUpdate }) {
    const [newStatus, setNewStatus] = useState(currentUser.relationshipId);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        getAllRelationshipStatus().then(setStatuses);
    }, []);

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    const handleStatusSubmit = () => {
        const updatedUser = {
            ...currentUser,
            relationshipId: parseInt(newStatus)
        };

        editUser(updatedUser)
            .then(() => {
                onUpdate(updatedUser);
            })
            .catch(error => {
                console.error("Error updating user relationship status:", error);
            });
    };

    return (
        <div>
            <select value={newStatus} onChange={handleStatusChange}>
                {statuses.map(status => (
                    <option key={status.id} value={status.id}>
                        {status.status}
                    </option>
                ))}
            </select>
            <button onClick={handleStatusSubmit}>Update Relationship Status</button>
        </div>
    );
}
