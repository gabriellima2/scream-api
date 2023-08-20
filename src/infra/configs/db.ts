import mongoose from "mongoose";

export const db = {
	connect: async () => {
		try {
			const isConnected = await mongoose.connect(process.env.DATABASE_URL);
			if (!isConnected) throw new Error("Error while connecting database");
			console.log("Database has been connected successfully");
		} catch (err) {
			console.log(err);
		}
	},
	disconnect: async () => {
		try {
			await mongoose.disconnect();
			console.log("Database has been disconnected successfully");
		} catch (err) {
			console.log(err);
		}
	},
};
