import React, { useContext } from "react";
import { User, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const {login}=useContext(AuthContext);

  const navigate = useNavigate();
  const handleClick = () => {
    axios
      .post("http://localhost:3001/", { email, password })
      .then((msg) => {
        setMessage(msg.data.message);

        if (msg.data.message === "Login Successfull") {
          console.log('login:',email)
          const user=email.split("@")[0];
          console.log('user:',user)
          login(user)
          navigate("/homepage");
        } else {
          console.log(msg.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-purple-700 w-screen h-screen flex justify-center items-center">
      <div className="bg-white p-8 w-full lg:mx-28 mx-10 flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-purple-700 mb-10">
          Sign In
        </h1>
        <div className="flex flex-col w-full gap-3 items-center">
          <div className="bg-gray-100 px-3 py-1 flex gap-3 items-center w-full">
            <User />
            <input
              className="bg-transparent w-full py-3 active:bg-transparent"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="bg-gray-100 px-3 py-1 flex gap-3 items-center w-full">
            <Eye />
            <input
              type="password"
              className="bg-transparent w-full py-3 active:bg-transparent"
              placeholder="Username"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="w-full flex justify-end gap-2 ">
            Dont have an account?{" "}
            <Link to="/signup" className="text-purple-600 cursor-pointer">
              Sign Up
            </Link>
          </p>
          <button
            onClick={handleClick}
            className="bg-purple-700 rounded-lg text-lg cursor-pointer mt-8 hover:bg-purple-800 py-3 text-white w-full"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
