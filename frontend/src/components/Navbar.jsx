import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axios";

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.get("/user/logout");
    setUser(null);
    navigate("/login");
  };

  const studentLinks = [
    { label: "Home", to: "/" },
    { label: "Jobs", to: "/jobs" },
    { label: "Browse", to: "/browse" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const recruiterLinks = [
    { label: "Companies", to: "/admin/dashboard" },
    { label: "Jobs", to: "/admin/jobs" },
  ];

  const links = user?.role === "recruiter" ? recruiterLinks : studentLinks;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            Job<span className="text-blue-600">Portal</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* User info */}
              <Link
                to="/profile"
                className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {user.fullname?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800 leading-none">{user.fullname}</p>
                  <p className="text-xs text-gray-400 mt-0.5 capitalize">{user.role === "student" ? "Job Seeker" : "Recruiter"}</p>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"

              >
                Login
              </Link>

            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-gray-600 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-gray-600 transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-gray-600 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <>
              <div className="flex items-center gap-2.5 px-4 py-2.5 mt-1 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                  {user.fullname?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{user.fullname}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role === "student" ? "Job Seeker" : "Recruiter"}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-left px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;