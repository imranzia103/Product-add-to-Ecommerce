import mongoose from "mongoose";

const connectDB = async(req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('SUCESSFULLY CONNECTED TO MONGODB...')
    } catch (error) {
        console.log('connection error')
        
    }
};
export default connectDB;