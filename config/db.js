import mongoose from 'mongoose';

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conguration DataBase is Connected Sucessfully')
    } catch (error) {
        console.log('connecting to Database')
        
    }
};

export default connectDB;