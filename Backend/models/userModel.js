import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    date:{
        type:Date,
        default: Date.now()
    }
})

export default mongoose.model('user',userSchema);