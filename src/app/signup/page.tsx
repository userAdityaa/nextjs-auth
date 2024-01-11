"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';



const SignUp = () => {

  const[loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "", 
    password: "",
    username: ""
  }) 

  const onSignUp = async() => {
    try{
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success", response);
      router.push('/login');
    }catch(err: any){
      console.log("Signup failed", err.message);
      toast.error(err.message);
    }
  }

  const[buttonDisabled, setButtonDisabled] = React.useState(false);


  useEffect(() => {
    if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  })


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input type='text' id='username' value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder='username' className='text-black'/>
        <label htmlFor="email">email</label>
        <input type='text' id='email' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder='email' className='text-black'/>
        <label htmlFor="password">password</label>
        <input type='password' id='password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder='password' className='text-black'/>
        <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onSignUp}>{buttonDisabled? "No Signup" : "Signup"}</button>
        <Link href='/login'>Visit login page</Link>
    </div>
  )
}

export default SignUp