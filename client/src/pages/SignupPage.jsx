import React, { useState } from 'react'
import {User,Eye} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const SignupPage = () => {
    const navigate=useNavigate();
    const [email,setEmail]=useState()
    const[password,setPassword]=useState()


    const handleClick=()=>{
        axios
      .post("http://localhost:3001/signup", {email,password})
      .then(result => 
      {
        console.log(result)
        navigate('/')
      })
      .catch((err) => console.log(err));
    }
    return (
        <div className='bg-purple-700 w-screen h-screen flex justify-center items-center'>
            <div className='bg-white p-8 w-full lg:mx-28 md:mx-10 flex flex-col items-center'>
                <h1 className='text-3xl font-semibold text-purple-700 mb-10'>Create an account</h1>
                <div className='flex flex-col w-full gap-3 items-center'>
                    <div className= 'bg-gray-100 px-3 py-1 flex gap-3 items-center w-full'>
                        <User/>
                        <input className='bg-transparent w-full py-3 active:bg-transparent' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className= 'bg-gray-100 px-3 py-1 flex gap-3 items-center w-full'>
                        <Eye/>
                        <input type='password' className='bg-transparent w-full py-3 active:bg-transparent' placeholder='Username' onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <button className='bg-purple-700 rounded-lg text-lg cursor-pointer mt-8 hover:bg-purple-800 py-3 text-white w-full' onClick={handleClick}>Sign up</button>
                </div>
            </div>
        </div>
      )
}

export default SignupPage