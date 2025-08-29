import { useState } from "react";

export default function DiaryCard({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-md mx-auto">
      {post.media?.[0] && (
        <img
          src={post.media[0]}
          alt={post.title}
          className="w-full h-48 object-cover rounded-xl mb-3"
        />
      )}

      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-600 text-sm">{post.description}</p>
      <p className="text-gray-400 text-xs mt-1">{post.location}</p>

      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => setLiked(!liked)}
          className={`px-3 py-1 rounded-lg ${
            liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          {liked ? "♥ Liked" : "♡ Like"}
        </button>
        <span className="text-gray-500 text-sm">
          {post.comments?.length || 0} comments
        </span>
      </div>
    </div>
  );
}
