"use client";
import React, { useState, useEffect, use } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast'

const LoginPage  = () => {
    const router = useRouter(); 
    const[loading, setLoading] = useState(false);
    const [user, setUser] = React.useState({
        email: "", 
        password: "",
      }) 


      const onLogin = async() => {
        try{
          setLoading(true);
          const response = await axios.post("/api/users/login", user);
          console.log(response);
          toast.success("Login Success");
          router.push("/profile")
        
        }catch(err: any){
            console.log("Login Failed", err.message);
            toast.error(err.message);
        }
      }
      
    
      const[buttonDisabled, setButtonDisabled] = React.useState(false);


      useEffect(() => {
        if(user.email.length > 0  && user.password.length > 0){
          setButtonDisabled(false);
        }
        else{
          setButtonDisabled(true);
        }
      })
    
    
      return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input type='text' id='email' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder='email' className='text-black'/>
            <label htmlFor="password">password</label>
            <input type='password' id='password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder='password' className='text-black'/>
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onLogin}>Login Here</button>
            <Link href='/signup'>Visit signup page</Link>
        </div>
      )
}

export default LoginPage 