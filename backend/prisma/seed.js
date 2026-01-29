const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('--- Seeding UniCart database ---');

    // Create a demo user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user = await prisma.user.upsert({
        where: { email: 'demo@unicart.edu' },
        update: {},
        create: {
            name: 'Demo Student',
            email: 'demo@unicart.edu',
            password: hashedPassword,
            role: 'USER'
        }
    });

    console.log(`User created: ${user.email}`);

    // Create some demo products
    const products = [
        {
            title: 'Calculus Early Transcendentals',
            price: 45.00,
            pickupLocation: 'Main Library - Desk 4',
            sellerId: user.id,
            status: 'APPROVED'
        },
        {
            title: 'Mechanical Keyboard (Blue Switches)',
            price: 60.00,
            pickupLocation: 'Student Union Lounge',
            sellerId: user.id,
            status: 'APPROVED'
        },
        {
            title: 'Vintage Dorm Desk Lamp',
            price: 15.00,
            pickupLocation: 'East Hall Room 202',
            sellerId: user.id,
            status: 'APPROVED'
        },
        {
            title: 'Scientific Calculator TI-84',
            price: 80.00,
            pickupLocation: 'Engineering Center',
            sellerId: user.id,
            status: 'APPROVED'
        }
    ];

    for (const p of products) {
        await prisma.product.create({
            data: p
        });
    }

    console.log('Seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
