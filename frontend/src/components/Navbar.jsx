import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const linkBase = "px-4 py-2 rounded-md hover:bg-gray-100";
const active = ({ isActive }) =>
  isActive ? `${linkBase} bg-gray-100` : linkBase;

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black/80" />
          <span className="font-semibold">Travel Diary</span>
        </Link>

        {/* mobile menu button (only visible <640px) */}
        <button
          className="sm:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>

        {/* nav links */}
        <nav
          className={`${
            open ? "block" : "hidden"
          } sm:flex sm:items-center sm:gap-2`}
        >
          <ul className="flex flex-col sm:flex-row sm:items-center gap-2">
            <li><NavLink to="/" className={active}>Home</NavLink></li>
            <li><NavLink to="/places" className={active}>Places</NavLink></li>
            <li><NavLink to="/feed" className={active}>Feed</NavLink></li>

            {user && (
              <>
                <li><NavLink to="/post" className={active}>Post</NavLink></li>
                <li><NavLink to="/profile" className={active}>Profile</NavLink></li>
                {user.role === "admin" && (
                  <li><NavLink to="/admin" className={active}>Dashboard</NavLink></li>
                )}
                <li>
                  <button
                    onClick={logout}
                    className="ml-2 px-4 py-2 rounded-md border hover:bg-gray-50 w-full sm:w-auto"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li><NavLink to="/login" className={active}>Login</NavLink></li>
                <li><NavLink to="/register" className={active}>Signup</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
