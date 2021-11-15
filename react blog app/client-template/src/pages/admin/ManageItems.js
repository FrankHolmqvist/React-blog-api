import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import PostList from '../../components/PostList';
import {
    linkStyle,
  } from '../../components/Style';

function ManagePosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []); // Empty array second argument equals to componentDidMount. Meaning it will only run once.

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/posts');
            if (!response.ok) {
                throw new Error('Server error: ' + response.status)
            }
            const data = await response.json();
            console.log(data);
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (postId) => {
        try {
            await fetch('http://localhost:5000/posts/' + postId, {
                    method: 'DELETE', // *GET, POST, PATCH, DELETE, etc.
            });

            fetchPosts();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Manage Posts</h1>
            <PostList posts={posts} deletePost={deletePost}/>
            <Link to="/create-item" style={linkStyle}>&#x2190; CREATE POST</Link>
        </div>
    )
}

export default ManagePosts