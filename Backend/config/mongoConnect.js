import mongoose from "mongoose";

const mongoConnect =async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        console.log('MONGODB CONNECTED');
    }catch(error){
        console.log('MONGO ERROR');
    }
   
    
}
export default mongoConnect