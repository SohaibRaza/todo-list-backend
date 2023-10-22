import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  const connection = await mongoose.connect(
    process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/todo-tasks",
    {}
  );

  const mongoConnectedMsg = `Mongodb connected: ${connection.connection.host} to db ${connection.connection.name}`;
  console.log("\x1b[33m%s\x1b[0m", mongoConnectedMsg, "\n");
};

export default connectDB;
