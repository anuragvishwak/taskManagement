import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { toast } from "react-toastify";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function Login() {
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
    <div className="sm:flex min-h-screen bg-[#0F4C5C]">
      <div className="flex items-center h-full py-[92px] sm:h-auto justify-center w-full">
        <div className="text-white">
          <p className="text-bold text-8xl">TO DO</p>
          <p className="text-xl text-center mt-1 font-semibold">
            Reminds Everything!
          </p>
        </div>
      </div>
      <div className="sm:flex items-center justify-center p-5 sm:h-screen sm:w-6/12 text-[#0F4C5C] ">
        <div className="bg-white p-3 sm:p-0 sm:h-full rounded w-full">
          <div className="flex h-full items-end sm:items-center justify-center">
            <div className="">
              <div className="mb-3 sm:mb-10">
                <p className="text-xl sm:text-5xl font-bold">Welcome Back!</p>
                <p
                  className="w-auto sm:text-xl"
                >
                  Hey! welcome back to your special place...
                </p>
              </div>
              <div>
                <p>Email:</p>
                <input
                  type="email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  placeholder="anurag@gmail.com"
                  className="bg-[#0F4C5C] p-1.5 rounded border w-full sm:w-[400px] border-white"
                ></input>
              </div>

              <div className="mt-4">
                <p>Password:</p>
                <input
                  type="password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  placeholder="********"
                  className="bg-[#0F4C5C] p-1.5 rounded border w-full border-white"
                ></input>
              </div>

              <div className="py-2 flex justify-end">
                <button>forgot password?</button>
              </div>

              <button
                onClick={() => {
                  Login();
                }}
                className="text-white rounded hover:shadow-xl w-full py-1 bg-[#0F4C5C]"
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
