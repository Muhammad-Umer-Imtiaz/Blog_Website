import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

interface LoginResponse {
  success: boolean;
  message?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLogin, navigate, axios } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<LoginResponse>(
        "/api/admin/login",
        { email, password },
        { withCredentials: true }
      );
      if (data.success) {
        setIsLogin(true);
        toast.success(data.message || "Login successful");
        navigate("/admin");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error.message, error.response?.data);
      toast.error(error.response?.data?.message || error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="absolute right-0 bottom-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 opacity-30 blur-2xl pointer-events-none"></div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Admin
          </span>{" "}
          <span className="text-black">Login</span>
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Enter your credentials to access the admin panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;