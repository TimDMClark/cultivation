import React from "react";
import { deleteUser } from "../APIManagers/UserManager";

export default function DeleteCurrentUser({ currentUser, onUserDeleted }) {

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            deleteUser(currentUser.id)
                .then(() => {
                    onUserDeleted(); // This callback will handle what to do after a user is deleted
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                });
        }
    }

    return (
        <button onClick={handleDelete}>
            Delete My Account
        </button>
    );
}
