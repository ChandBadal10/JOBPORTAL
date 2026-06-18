import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../utils/axios";

const CreateJob = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [experience, setExperience] = useState("0");
  const [position, setPosition] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/job/post", {
        title,
        description,
        requirements,   // comma separated, backend splits it
        salary,
        location,
        jobType,
        experience,
        position,

      });
      navigate("/admin/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition";

  const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar user={user} setUser={setUser} />

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1 transition"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Post a New Job</h1>
          <p className="text-slate-400 mt-1">Fill in the details below to create a job listing.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Senior Frontend Developer"
              className={inputClass}
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              placeholder="e.g. Software Engineer"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              className={inputClass + " resize-none"}
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Requirements
              <span className="text-slate-500 font-normal ml-1">(comma separated)</span>
            </label>
            <input
              type="text"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              required
              placeholder="e.g. React, Node.js, MongoDB"
              className={inputClass}
            />
          </div>

          {/* Salary + Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Salary (NPR)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                placeholder="e.g. 50000"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="e.g. Kathmandu"
                className={inputClass}
              />
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Job Type</label>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setJobType(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                    jobType === type
                      ? "bg-violet-500 text-white border-violet-500"
                      : "border-slate-700 text-slate-400 hover:border-violet-500 hover:text-violet-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Experience (years)</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              min="0"
              placeholder="e.g. 2"
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-violet-600 disabled:opacity-60 transition mt-2"
          >
            {loading ? "Posting Job..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;