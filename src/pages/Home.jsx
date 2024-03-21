import { useEffect, useState } from "react";
import Post from "../component/post";

export default function Home() {
    const [posts,setPosts] = useState([]);
    useEffect(() => {
      fetch('https://yvettes-mern-blog-b1h4ysmae-rene-rodriguezs-projects.vercel.app/post').then(response => {
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
