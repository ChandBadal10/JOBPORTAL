import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Data Science",
  "DevOps",
  "Design",
  "Marketing",
];

const Home = ({ user, setUser }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${keyword}`);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] overflow-hidden">
      <Navbar user={user} setUser={setUser} />

      {/* HERO */}
      <section className="relative px-6 lg:px-20 pt-20 pb-28">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <p className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              🚀 Nepal’s #1 Modern Job Portal
            </p>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-900">
              Find Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Dream Job
              </span>
              <br />
              Faster.
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Discover thousands of opportunities from top companies.
              Search jobs by skills, role, company, or category and get hired faster.
            </p>

            {/* SEARCH */}
            <form
              onSubmit={handleSearch}
              className="mt-10 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl p-3 flex items-center"
            >
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 bg-transparent px-4 py-3 outline-none text-gray-700"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
              >
                Search
              </button>
            </form>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mt-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigate(`/jobs?keyword=${cat}`)}
                  className="px-5 py-2 rounded-full bg-white shadow-md border border-gray-100 hover:bg-blue-600 hover:text-white hover:shadow-xl transition duration-300 text-sm font-medium"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-[40px] p-1 shadow-2xl">
              <div className="bg-white rounded-[36px] p-8">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                  alt="team"
                  className="rounded-3xl w-full h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white shadow-2xl rounded-2xl p-5 w-64">
              <p className="text-gray-500 text-sm">🔥 Trending Role</p>
              <h3 className="font-bold text-lg mt-1">Frontend Developer</h3>
              <p className="text-blue-600 font-semibold mt-2">$2k - $5k</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: "1,200+", label: "Active Jobs" },
            { number: "400+", label: "Companies" },
            { number: "50,000+", label: "Job Seekers" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition duration-300"
            >
              <h2 className="text-4xl font-black text-blue-600">
                {stat.number}
              </h2>
              <p className="text-gray-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Simple Process
          </p>

          <h2 className="text-4xl font-black text-gray-900 mt-3">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: "👤",
                title: "Create Account",
                desc: "Sign up easily as a job seeker or recruiter.",
              },
              {
                icon: "🔍",
                title: "Search Jobs",
                desc: "Browse thousands of verified opportunities.",
              },
              {
                icon: "✅",
                title: "Get Hired",
                desc: "Apply instantly and land your dream role.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition duration-300"
              >
                <div className="text-6xl mb-6">{step.icon}</div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-[40px] p-14 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-black">
            Ready to Start Your Career?
          </h2>

          <p className="mt-4 text-blue-100 text-lg">
            Join thousands of professionals finding jobs every day.
          </p>

          <button
            onClick={() => navigate("/jobs")}
            className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300"
          >
            Explore Jobs
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;