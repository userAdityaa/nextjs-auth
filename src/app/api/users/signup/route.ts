import {connect} from '@/app/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'



export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        //Check if user already exits: 
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exits"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username, 
            email, 
            password: hashPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User Created Successfully", 
            success: true, 
            savedUser
        })

    }catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500});
    }
}

connect()