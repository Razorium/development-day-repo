// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	const images = [
		{
			description: "Sunny Beach",
			url: "https://via.placeholder.com/300x200?text=Sunny+Beach",
		},
		{
			description: "Mountain View",
			url: "https://via.placeholder.com/300x200?text=Mountain+View",
		},
		{
			description: "City Skyline",
			url: "https://via.placeholder.com/300x200?text=City+Skyline",
		},
		// Add more images to reach 30+
		// ...
	];

	for (const img of images) {
		await prisma.image.create({
			data: img,
		});
	}

	console.log("Seeding completed.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
