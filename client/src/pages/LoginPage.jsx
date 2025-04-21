import React, { useContext, useEffect } from "react";
import { User, Eye, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginText, setLoginText] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const {login}=useContext(AuthContext);

  useEffect(()=>{
    console.log("Isloggedin:",isLoggedIn);
    console.log("LoginText:",loginText);
    console.log("Message:",message);
    console.log("LoginError:",loginError);
  },[isLoggedIn,loginText,message,loginError])

  const navigate = useNavigate();
  const handleClick = () => {
    axios
      .post("http://localhost:3001/", { email, password })
      .then((msg) => {
        setMessage(msg.data.message);

        if (msg.data.message === "Login Successfull") {
          setLoginText("Redirecting...");
          localStorage.setItem("userid", msg.data.userId);
          console.log('login:',email)
          const user=email.split("@")[0];
          console.log('user:',user)
          login(user)
          setTimeout(() => {
            setIsLoggedIn(true);
          }
          , 1000);
          setTimeout(()=>{
            navigate("/homepage");
          },2000);
        }
      })
      .catch((err) =>{ console.log(err);
        setLoginError(true)
        setMessage("Login Failed. Please try again.");
        setTimeout(() => {
          setLoginError(false);
        },2000);
      });
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
      <div className="bg-white p-8 w-1/2 rounded-md shadow-2xl lg:mx-28 mx-10 flex flex-col items-center">
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
          <button
            onClick={handleClick}
            className="bg-purple-700 rounded-lg text-lg cursor-pointer mt-8 hover:bg-purple-800 py-3 text-white w-full"
          >
           {loginText? loginText : "Login"}
          </button>
          <p className="w-full flex justify-end gap-2 ">
            Dont have an account?{" "}
            <Link to="/signup" className="text-blue-600 cursor-pointer hover:text-blue-900">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      {isLoggedIn && (
        <div className="fixed top-4 px-10 rounded-lg items-center justify-center h-10 flex bg-green-600 opacity-80 transition-transform text-white p-4 m-4 shadow-lg">
          Login Successfull!
        </div>  
      )}
      {loginError && (
        <div className={`fixed top-4 px-10 rounded-lg items-center justify-center h-10 flex ${message==="Login Successfull"?"bg-green-600":"bg-red-600"} opacity-80 transition-transform text-white p-4 m-4 shadow-lg`}>
          Login Failed!
        </div>  
      )}
    </div>
  );
};

export default LoginPage;
