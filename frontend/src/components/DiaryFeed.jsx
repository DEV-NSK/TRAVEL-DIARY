import { useEffect, useState } from "react";
import DiaryCard from "./DiaryCard";

export default function DiaryFeed() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token"); // after login

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/diary/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className="grid gap-4">
      {posts.length > 0 ? (
        posts.map((post) => <DiaryCard key={post._id} post={post} />)
      ) : (
        <p className="text-gray-500">No posts yet.</p>
      )}
    </div>
  );
}
