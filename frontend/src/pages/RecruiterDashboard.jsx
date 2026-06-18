import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const RecruiterDashboard = ({ user, setUser }) => {
  const stats = [
    { label: "Total Jobs Posted", value: "0", icon: "💼", to: "/admin/jobs" },
    { label: "Total Companies", value: "0", icon: "🏢", to: "/admin/companies" },
    { label: "Total Applicants", value: "0", icon: "👥", to: "/admin/jobs" },
  ];

  const quickLinks = [
    { label: "Post a New Job", desc: "Create a new job listing", icon: "➕", to: "/admin/jobs/create", color: "bg-violet-500 hover:bg-violet-600" },
    { label: "My Companies", desc: "Manage your companies", icon: "🏢", to: "/admin/companies", color: "bg-slate-700 hover:bg-slate-600" },
    { label: "All Jobs", desc: "View all your job posts", icon: "💼", to: "/admin/jobs", color: "bg-slate-700 hover:bg-slate-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar user={user} setUser={setUser} />

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, <span className="text-violet-400">{user?.fullname}</span> 👋
          </h1>
          <p className="text-slate-400 mt-1">Here's an overview of your recruitment activity.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.to}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/40 transition"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`${item.color} rounded-2xl p-6 transition text-white`}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="font-semibold text-base">{item.label}</p>
              <p className="text-sm opacity-75 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;