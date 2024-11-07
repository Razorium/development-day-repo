// pages/api/register.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request) {
	try {
		const body = await request.json();

		const { userId, imagesToPush } = body;

		// Create a new user in the database
		const newUser = await prisma.user.update({
			where: {
				id: parseInt(userId),
			},
			data: {
				preference: imagesToPush,
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
