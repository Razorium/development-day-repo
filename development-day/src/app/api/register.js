// pages/api/register.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function registerHandler(req, res) {
	if (req.method === "POST") {
		const {
			familyName,
			givenName,
			email,
			age,
			country,
			phoneNumber,
			occupation,
			university,
		} = req.body;

		try {
			const newUser = await prisma.user.create({
				data: {
					familyName,
					givenName,
					email,
					age: parseInt(age),
					country,
					phoneNumber,
					occupation,
					university: occupation === "student" ? university : null,
				},
			});

			res
				.status(200)
				.json({ message: "User registered successfully", user: newUser });
		} catch (error) {
			res.status(500).json({ error: "Error registering user" });
		} finally {
			await prisma.$disconnect();
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
