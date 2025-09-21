import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { toast } from "react-toastify";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function LoginUser() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully!");
      toast.success("Logged in successfully!");
      navigate("/MainTodo");
      localStorage.setItem("email", email);
    } catch (err) {
      console.error("Login failed:", err.message);
      toast.error("Invalid email or password!");
      setemail("");
      setpassword("");
    }
  }

  return (
    <div className="sm:flex h-screen bg-[#7C3AED]">
      <div className="flex items-center  py-[92px] h-auto justify-center w-full">
        <div className="text-white">
          <p className="font-bold text-7xl sm:text-8xl">TO DO</p>
          <p className="text-xl text-center mt-1 font-semibold">
            Reminds Everything!
          </p>
        </div>
      </div>

      <div className="sm:flex items-end sm:items-center justify-center p-5 sm:h-screen sm:w-6/12 text-blue-500">
        <div className="bg-white p-3 sm:p-0 sm:h-full rounded w-full">
          <div className="flex h-full items-end sm:items-center justify-center pb-6 sm:pb-0">
            <div>
              <div className="mb-6 sm:mb-10">
                <p className="text-xl sm:text-5xl text-[#7C3AED] font-bold">
                  Welcome Back!
                </p>
                <p className="w-auto text-blue-500 sm:text-xl">
                  Hey! welcome back to your special place...
                </p>
              </div>

              <div>
                <p className="font-semibold text-xl">Email:</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="anurag@gmail.com"
                  className="p-1.5 rounded border w-full sm:w-[400px] border-gray-500"
                />
              </div>

              {/* Password */}
              <div className="mt-4">
                <p className="font-semibold text-xl">Password:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="********"
                  className="p-1.5 rounded border w-full border-gray-500"
                />
              </div>

              {/* Forgot password */}
              <div className="py-2 flex justify-end">
                <button className="text-sm text-blue-600 hover:underline">
                  forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                onClick={LoginUser}
                className="text-white rounded hover:shadow-xl w-full py-1 bg-[#7C3AED] hover:bg-[#6D28D9]"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
