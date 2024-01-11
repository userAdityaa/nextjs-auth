import {connect} from '@/app/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const{email, password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({
            email
        })

        if(!user){
            return NextResponse.json({error: "User doesnot exist"}, {status: 400});
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "The password doesnot match"}, {status: 400});
        }

        const tokenData = {
            id: user._id, 
            username: user.username, 
            email: user.email
        }

        // Create Token: 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            message: "Login Successful", 
            success: true,
        })

        response.cookies.set("token", token, {httpOnly: true})


        return response;


    }
    catch(err: any){
        return NextResponse.json({error: err.message}, {status: 500});
    }
}


connect()