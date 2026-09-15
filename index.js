const express = require("express");
const mongoose = require("mongoose");
const {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require("./user");

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

app.get("/users/:id", async (req, res) => {
	try {
		const user = await getUserById(req.params.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		res.status(400).json({ message: "Invalid user id" });
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

app.put("/users/:id", updateUserRoute);

async function updateUserRoute(req, res) {
	try {
		if (!mongoose.isValidObjectId(req.params.id)) {
			return res.status(400).json({ message: "Enter a valid user id" });
		}

		const changes = {};

		if (req.body.name !== undefined) {
			changes.name = req.body.name.trim();
		}

		if (req.body.email !== undefined) {
			changes.email = req.body.email.trim().toLowerCase();
		}

		if (Object.keys(changes).length === 0) {
			return res.status(400).json({ message: "Send a name or email to update" });
		}

		const user = await updateUser(req.params.id, changes);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "User updated", user });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).json({ message: "Email already exists" });
		}

		res.status(400).json({ message: "Could not update user" });
	}
}

app.delete("/users/:id", async (req, res) => {
	try {
		const user = await deleteUser(req.params.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "User deleted", user });
	} catch (error) {
		res.status(400).json({ message: "Invalid user id" });
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
