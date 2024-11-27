import mongoose from "mongoose";
let isConnected = false;
export const connecToDb = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		console.log("database is already connected");
		return;
	}
	try {
		mongoose.connect(process.env.MONGODB_URI);
		console.log("connected to daabase");
		isConnected = true;
	} catch (error) {
		console.log(error);
	}
};
