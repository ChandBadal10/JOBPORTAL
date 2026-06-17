import { useEffect, useState } from "react";
import axios from "axios";

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
  });

  const [resume, setResume] = useState(null);

  // LOAD USER
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
      });
    }
  }, []);

  // INPUT CHANGE
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FILE CHANGE
  const fileHandler = (e) => {
    setResume(e.target.files[0]);
  };

  // SUBMIT
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const data = new FormData();

      data.append("fullname", formData.fullname);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("bio", formData.bio);
      data.append("skills", formData.skills);

      if (resume) {
        data.append("file", resume);
      }

      const res = await axios.put(
        "http://localhost:8000/api/v1/user/profile/update",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setMessage("✅ Profile updated successfully");

        // UPDATE LOCAL STORAGE
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* TOP CARD */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[30px] p-10 text-white shadow-2xl relative overflow-hidden">

          <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-8">

            {/* PROFILE IMAGE */}
            <div className="relative">
              <img
                src="https://i.pravatar.cc/200"
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
              />

              <div className="absolute bottom-1 right-1 bg-green-400 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>

            {/* INFO */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black">
                {formData.fullname || "Your Name"}
              </h1>

              <p className="text-blue-100 mt-2">
                {formData.email}
              </p>

              <p className="mt-4 text-blue-50 max-w-2xl">
                {formData.bio || "Add your professional bio..."}
              </p>

              {/* SKILLS */}
              <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
                {formData.skills &&
                  formData.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white mt-10 rounded-[30px] shadow-xl p-8 md:p-10">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Edit Profile
            </h2>

            {message && (
              <div className="text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-xl">
                {message}
              </div>
            )}
          </div>

          <form
            onSubmit={submitHandler}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* FULLNAME */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={changeHandler}
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter fullname"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Phone Number
              </label>

              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={changeHandler}
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            {/* RESUME */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Resume
              </label>

              <input
                type="file"
                onChange={fileHandler}
                className="w-full border border-gray-200 rounded-2xl px-5 py-4"
              />
            </div>

            {/* BIO */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Bio
              </label>

              <textarea
                rows={5}
                name="bio"
                value={formData.bio}
                onChange={changeHandler}
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write something about yourself..."
              />
            </div>

            {/* SKILLS */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={changeHandler}
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Node.js, MongoDB"
              />

              <p className="text-sm text-gray-400 mt-2">
                Separate skills with commas
              </p>
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white py-4 rounded-2xl font-bold text-lg transition duration-300 shadow-lg"
              >
                {loading ? "Updating Profile..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;