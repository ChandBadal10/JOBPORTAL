import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("student");

  // Register fields
  const [fullname, setFullname] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regRole, setRegRole] = useState("student");

  const switchTab = (toLogin) => {
    setIsLogin(toLogin);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/user/login", {
        email: loginEmail,
        password: loginPassword,
        role: loginRole,
      });
      setUser(res.data.user);
      navigate(res.data.user.role === "recruiter" ? "/admin/companies" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/user/register", {
        fullname,
        email: regEmail,
        password: regPassword,
        phoneNumber,
        role: regRole,
      });
      switchTab(true); // go to login after register
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  const RoleBtn = ({ current, value, label, setter }) => (
    <button
      type="button"
      onClick={() => setter(value)}
      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${
        current === value
          ? "bg-blue-600 text-white border-blue-600"
          : "border-gray-300 text-gray-600 hover:border-blue-400"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Job<span className="text-blue-600">Portal</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isLogin ? "Sign in to find your next job" : "Create your free account"}
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex mx-8 mt-2 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => switchTab(true)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => switchTab(false)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              !isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="px-8 py-6">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required placeholder="••••••••" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Login as</label>
                <div className="flex gap-3">
                  <RoleBtn current={loginRole} value="student" label="Job Seeker" setter={setLoginRole} />
                  <RoleBtn current={loginRole} value="recruiter" label="Recruiter" setter={setLoginRole} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition">
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="text-center text-sm text-gray-500">
                No account?{" "}
                <button type="button" onClick={() => switchTab(false)} className="text-blue-600 font-medium hover:underline">
                  Sign up free
                </button>
              </p>
            </form>
          ) : (

            /* REGISTER FORM */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required placeholder="John Doe" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required placeholder="••••••••" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder="98XXXXXXXX" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                <div className="flex gap-3">
                  <RoleBtn current={regRole} value="student" label="Job Seeker" setter={setRegRole} />
                  <RoleBtn current={regRole} value="recruiter" label="Recruiter" setter={setRegRole} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition">
                {loading ? "Creating account..." : "Create Account"}
              </button>
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button type="button" onClick={() => switchTab(true)} className="text-blue-600 font-medium hover:underline">
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;