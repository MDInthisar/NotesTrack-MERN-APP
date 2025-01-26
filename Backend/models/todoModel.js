import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title:String,
    descption:String,
    created:{
        type:Date,
        default: Date.now(),
    },
    updated:{
        type:Date,
        default: Date.now(),
    },
    todoBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

export default mongoose.model('todo',todoSchema);