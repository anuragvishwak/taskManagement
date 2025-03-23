import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="sm:flex justify-center">
      <div className="flex items-center h-full py-[92px] sm:h-auto justify-center w-full">
        <div>
          <p className="text-bold text-8xl">TO DO</p>
          <p className="text-xl text-center mt-1 font-semibold">
            Reminds Everything!
          </p>
        </div>
      </div>
      <div className="bg-[#0F4C5C] flex items-center justify-center h-full py-10 sm:h-screen w-full text-white">
        <div className="w-80 sm:w-96">
          <div className="mb-3">
            <p className="text-xl sm:text-3xl font-bold">Welcome Back!</p>
            <p className="w-auto">Hey! welcome back to your special place...</p>
          </div>
          <div>
            <p>Email:</p>
            <input
              placeholder="anurag@gmail.com"
              className="bg-[#0F4C5C] p-1.5 rounded border w-full border-white"
            ></input>
          </div>

          <div className="mt-4">
            <p>Password:</p>
            <input
              placeholder="********"
              className="bg-[#0F4C5C] p-1.5 rounded border w-full border-white"
            ></input>
          </div>

          <div className="py-2 flex justify-end">
            <button>forgot password?</button>
          </div>

          <button
            onClick={() => {
              navigate("/MainTodo");
            }}
            className="bg-white rounded hover:shadow-xl w-full py-1 text-[#0F4C5C]"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
