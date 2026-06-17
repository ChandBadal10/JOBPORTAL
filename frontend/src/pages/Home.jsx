import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const CATEGORIES = ["Frontend", "Backend", "Data Science", "DevOps", "Design", "Marketing"];

const Home = ({ user, setUser }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${keyword}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} setUser={setUser} />

      {/* Hero */}
      <section className="bg-white py-20 px-4 text-center">
        <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
          Nepal's #1 Job Portal
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Find Your Dream Job <br /> Today
        </h1>
        <p className="text-gray-500 mb-8 text-lg max-w-xl mx-auto">
          Thousands of companies are hiring. Search jobs that match your skills.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center max-w-xl mx-auto bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden"
        >
          <input
            type="text"
            placeholder="Job title, skills, or company..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 px-5 py-3 text-sm outline-none text-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/jobs?keyword=${cat}`)}
              className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { number: "1,200+", label: "Active Jobs" },
            { number: "400+", label: "Companies" },
            { number: "50,000+", label: "Job Seekers" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "👤", title: "Create Account", desc: "Sign up as a job seeker or recruiter in seconds." },
            { icon: "🔍", title: "Search Jobs", desc: "Browse listings filtered by role and skill." },
            { icon: "✅", title: "Apply & Get Hired", desc: "Apply with one click and track your status." },
          ].map((step) => (
            <div key={step.title} className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;