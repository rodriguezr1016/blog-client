import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {format} from 'date-fns'
import { UserContext } from "../UserContext";
import EditPost from "./EditPost";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext)
    const {id} = useParams();
    const [showComponent, setShowComponent] = useState(false);
    const navigate = useNavigate();

    const deletePost = async (id) => {
  try {
    const response = await fetch(`https://yvettes-mern-blog-b1h4ysmae-rene-rodriguezs-projects.vercel.app/post/${postInfo._id}`, {
      method: 'DELETE',
    });
    if(response.ok) {
        navigate('/')
    }
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

    function editPostButton () {
        setShowComponent(!showComponent)
       
    };
    
    useEffect(() => {
        fetch(`https://yvettes-mern-blog-b1h4ysmae-rene-rodriguezs-projects.vercel.app/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            });
        });
    },[]);
let username = userInfo.username;
if(!userInfo){
    // let username = ''
}
if (!postInfo) return <div>Loading...</div>;

    return(
        <div className="post-page">
            {showComponent && <EditPost />}
            <h1>{postInfo.title}</h1>
            {username===postInfo.author.username && (
                <div className="edit-row">
                <button onClick={editPostButton}className="edit-btn">
                {showComponent ? 'Cancel' : 'Edit Post'}
                {showComponent ? '' :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>}

                

                </button>
                <button onClick={deletePost} className="deletebtn">
                    Delete Post
                </button>
            </div>
            )}
            
            <div className="image">
            <img src={`https://yvettes-mern-blog-b1h4ysmae-rene-rodriguezs-projects.vercel.app/${postInfo.cover}`} alt="yuh" />
            </div>
            <div className="info">
                <div className="author">By: {postInfo.firstName} {postInfo.lastName}</div>
                <time>
                {format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}
                </time>

            </div>
            
            
            <div className="content">
            <p dangerouslySetInnerHTML={{__html:postInfo.content}} />


            </div>
        </div>
    );
}
