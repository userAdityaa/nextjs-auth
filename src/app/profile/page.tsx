'use client'

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Profile = () => {

  const router = useRouter();


  const logout = async() => {
      try{
        await axios.get("/api/users/logout");
        toast.success("Logout Successfull")
      }catch(err: any){
        console.log(err.message);
        toast.error(err.message);
      }
  }

  return (
    <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded' onClick={logout}>Logout</button>
  )
}

export default Profile