import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB Successfully Connected.');
        })

        connection.on('error', () => {
            console.log('Problem Connecting To MongoDB.')
        }) 
    }
    catch(error){

    }
}