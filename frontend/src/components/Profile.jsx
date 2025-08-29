import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile later with JWT
    setUser({
      name: "John Doe",
      email: "john@example.com",
      bio: "Traveler & blogger 🌍",
    });
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p className="text-gray-500 mb-2">{user.email}</p>
      <p className="text-gray-700">{user.bio}</p>
      {/* Later: Add edit form + list user’s posts */}
    </div>
  );
}
