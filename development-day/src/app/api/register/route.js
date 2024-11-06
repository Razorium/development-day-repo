// pages/api/register.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// ... existing imports ...

export async function POST(request) {
	try {
		const body = await request.json();

		// Validate user input here if needed

		const newUser = await prisma.user.create({
			data: {
				...body,
				// Make sure all required fields are included
			},
		});

		return new Response(JSON.stringify(newUser), { status: 201 });
	} catch (error) {
		// Improved error logging
		console.error("Failed to register user:", error.message);

		// Return a more specific error message
		return new Response(
			JSON.stringify({
				error: "Unable to register user",
				details: error.message,
			}),
			{ status: 500 }
		);
	}
}
