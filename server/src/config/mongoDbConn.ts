import mongoose, { ConnectOptions } from "mongoose";

mongoose.set("bufferCommands", false);

export async function connectionDatabase() {
  const uri = process.env.DBURL;
  try {
    const connection = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);

    if (connection) {
      console.log("[Database]: Application is connected to database");
    } else {
      console.error(`Invalid Connection is established`);
    }
  } catch (error) {
    console.log("[DatabaseError]: Connection not possible");
    throw new Error(`[Error]: ${error}`);
  }
}
