import mongoose  from "mongoose"; 

const connectDB = async () =>{
    try{
        const url : string = process.env.MONGO_URL as string;
        await mongoose.connect(url);
        console.log("Mongobd conenction is successful");
    }catch(e){
        console.log("Error in connecting to the database");
    }
}

export default connectDB;