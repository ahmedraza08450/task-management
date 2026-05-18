import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("", {
            dbName: "Task-Management"
        })
        console.log("CONNECTED TO DATABASE " + connectionInstance.connection.host);

    } catch (error) {
        console.log(`SOME ERROR OCCURS WHILE CONNECTING TO DATABASE : ${error}`);

    }
}

export default connectDB