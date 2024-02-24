import mongoose  from "mongoose"; 

export const connectDB = async () =>{
    try{
        const url : string = process.env.MONGO_URL as string;
        await mongoose.connect(url,{});
        console.log("Mongobd conenction is successful");
    }catch(e){
        console.log("Error in connecting to the database");
    }
}

export const disconnectDB = async () =>{
    try {
        await mongoose.disconnect();
        console.log("MongoDB connection closed successfully!");
      } catch (error) {
        console.error("Error closing MongoDB connection:", error);
      }
}
