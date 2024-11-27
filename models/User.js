import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: [true, "Email is already exist"],
	},
	username: {
		type: String,
		required: [true, "username is required"],
	},
	image: String,
});
const User = models.User || model("User", userSchema);
export default User;
