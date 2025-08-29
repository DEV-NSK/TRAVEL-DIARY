import { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Travel Posts</h2>
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="p-4 border rounded-lg shadow">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-700">{post.description}</p>
              <p className="text-sm text-gray-500">
                ✍️ {post.user?.username || "Anonymous"}
              </p>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
