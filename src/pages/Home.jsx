import { useEffect, useState } from "react";
import Post from "../component/post";

export default function Home() {
    const [posts,setPosts] = useState([]);
    useEffect(() => {
      fetch('http://localhost:4000/post').then(response => {
        response.json().then(posts => {
          setPosts(posts);
        });
      });
    }, []);
    if(!posts) return (<div> Loading...</div>)
    return (
      <>
        {posts.length > 0 && posts.map(post => (
          <Post {...post} />
        ))}
      </>
    );
  }