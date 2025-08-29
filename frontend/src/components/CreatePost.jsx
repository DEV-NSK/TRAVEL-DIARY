import { useState } from "react";

export default function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    for (let i = 0; i < files.length; i++) {
      formData.append("media", files[i]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/diary/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Post created!");
        onPostCreated(); // refresh feed
        setTitle("");
        setDescription("");
        setLocation("");
        setFiles([]);
      } else {
        alert(data.msg || "Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md space-y-3"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border rounded p-2"
      />
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post
      </button>
    </form>
  );
}
