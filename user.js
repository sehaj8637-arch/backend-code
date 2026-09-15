const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			 lowercase: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

function saveUser(user, callback) {
		User.create(user)
			.then((savedUser) => callback(null, savedUser))
			.catch((error) => callback(error));
}

function createUser(user) {
	return new Promise((resolve, reject) => {
		saveUser(user, (error, savedUser) => {
			if (error) {
				return reject(error);
			}

			resolve(savedUser);
		});
	});
}

async function getUsers() {
	return User.find().sort({ createdAt: -1 });
}

async function getUserById(id) {
	return User.findById(id);
}

async function updateUser(id, changes) {
	return User.findByIdAndUpdate(id, changes, {
		new: true,
		runValidators: true,
	});
}

async function deleteUser(id) {
	return User.findByIdAndDelete(id);
}

module.exports = {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
};
