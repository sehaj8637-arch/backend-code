const express = require("express");
const mongoose = require("mongoose");
const { createUser, getUsers } = require("./user");

const app = express();
const port = 3000;
const mongoUrl = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/usersdb";

app.use(express.json());

app.get("/users", async (req, res) => {
	try {
		const users = await getUsers();
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: "Could not get users" });
	}
});

app.post("/users", async (req, res) => {
	try {
		const { name, email } = req.body;

		if (!name || !email) {
			return res.status(400).json({ message: "Name and email are required" });
		}

		const cleanEmail = email.trim().toLowerCase();

		if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
			return res.status(400).json({ message: "Enter a valid email" });
		}

		const user = {
			name: name.trim(),
			email: cleanEmail,
		};

		const savedUser = await createUser(user);

		res.status(201).json({
			message: "User saved",
			user: savedUser,
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).json({ message: "Email already exists" });
		}

		res.status(500).json({ message: "User could not be saved" });
	}
});

async function startServer() {
	try {
		await mongoose.connect(mongoUrl);
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Could not connect to MongoDB:", error.message);
		process.exit(1);
	}
}

startServer();
