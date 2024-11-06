// pages/api/register.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const body = await request.json();

		const {
			familyName,
			givenName,
			email,
			age,
			country,
			phoneNumber,
			occupation,
			university,
		} = body;

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
				university,
			},
		});

		return new Response(JSON.stringify(newUser), { status: 201 });
	} catch (error) {
		console.log("botak");
		console.error("Failed to register user:", error);
		return new Response(JSON.stringify({ error: "Unable to register user" }), {
			status: 500,
		});
	}
}
