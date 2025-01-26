import mongoose from "mongoose";

const mongoConnect =async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/ToDo')
        console.log('MONGODB CONNECTED');
    }catch(error){
        console.log('MONGO ERROR');
        
    }
   
    
}
export default mongoConnect