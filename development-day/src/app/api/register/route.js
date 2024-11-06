// pages/api/register.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
	try {
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

		// Create a new user in the database
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

		return new Response(JSON.stringify(newUser), { status: 201 });
	} catch (error) {
		console.error("Failed to register user:", error);
		return new Response(JSON.stringify({ error: "Unable to register user" }), {
			status: 500,
		});
	}
}
