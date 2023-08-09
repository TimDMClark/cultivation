import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCultById } from "../APIManagers/CultManager";
import { getAllPosts } from "../APIManagers/PostManager";
import { getUserById } from "../APIManagers/UserManager";

function CultDetails() {
    const { cultId } = useParams();
    const [cult, setCult] = useState({});
    const [posts, setPosts] = useState([]);
    const [leader, setLeader] = useState({});

    useEffect(() => {
        getCultById(cultId).then(setCult);
    }, [cultId]);

    useEffect(() => {
        if(cult && cult.leaderId) {
            getUserById(cult.leaderId).then(setLeader);
        }
    }, [cult]);

    useEffect(() => {
        getAllPosts().then(data => {
            console.log(data);
            const relatedPosts = data.filter(post => post.CultId === parseInt(cultId))
            
            // Fetching users for the related posts
            Promise.all(relatedPosts.map(post => getUserById(post.UserId)))
                .then(users => {
                    const postsWithUsers = relatedPosts.map((post, index) => ({
                        ...post,
                        user: users[index]
                    }));
                    setPosts(postsWithUsers);
                    console.log(postsWithUsers);
                });
        });
    }, [cultId]);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div>
            <h1>{cult.name}</h1>
            <h3>Leader: {leader.name}</h3>
            <p>{cult.description}</p>
            <p>Created Date: {formatDate(cult.created)}</p>
            <h2>Posts:</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.Id}>
                        {post.content} by {post.user && post.user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CultDetails;
