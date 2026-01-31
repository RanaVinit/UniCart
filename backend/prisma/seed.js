const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('--- Seeding UniCart with Realistic Data ---');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = [
        { name: 'Arjun Sharma', email: 'arjun.sharma@chitkara.edu.in', role: 'USER' },
        { name: 'Nishita Rana', email: 'nishita.rana@chitkara.edu.in', role: 'USER' },
        { name: 'Rohan Mehta', email: 'rohan.mehta@chitkara.edu.in', role: 'USER' },
        { name: 'Admin User', email: 'admin@chitkara.edu.in', role: 'ADMIN' },
        { name: 'Ananya Singh', email: 'ananya.singh@chitkara.edu.in', role: 'USER' },
        { name: 'Kabir Verma', email: 'kabir.verma@chitkara.edu.in', role: 'USER' },
    ];

    const createdUsers = [];
    for (const userData of users) {
        const user = await prisma.user.upsert({
            where: { email: userData.email },
            update: {},
            create: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: userData.role
            }
        });
        createdUsers.push(user);
        console.log(`User created: ${user.email}`);
    }

    const products = [
        {
            title: 'Calculus: Early Transcendentals (14th Edition)',
            price: 1200.00,
            imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop',
            sellerId: createdUsers[0].id,
            status: 'APPROVED'
        },
        {
            title: 'MacBook Pro 13" (2019) - 256GB',
            price: 45000.00,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
            sellerId: createdUsers[1].id,
            status: 'APPROVED'
        },
        {
            title: 'Ergonomic Office Chair - Like New',
            price: 6500.00,
            imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop',
            sellerId: createdUsers[2].id,
            status: 'APPROVED'
        },
        {
            title: 'Scientific Calculator TI-84 Plus',
            price: 3500.00,
            imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop',
            sellerId: createdUsers[4].id,
            status: 'APPROVED'
        },
        {
            title: 'Organic Chemistry Lab Manual & Goggles',
            price: 800.00,
            imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop',
            sellerId: createdUsers[0].id,
            status: 'APPROVED'
        },
        {
            title: 'Mechanical Keyboard - Cherry MX Blue',
            price: 5500.00,
            imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop',
            sellerId: createdUsers[1].id,
            status: 'APPROVED'
        },
        {
            title: 'Mini Fridge - Compact Dorm Size',
            price: 4500.00,
            imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&auto=format&fit=crop',
            sellerId: createdUsers[2].id,
            status: 'APPROVED'
        },
        {
            title: 'Noise-Cancelling Headphones Sony WH-1000XM4',
            price: 18000.00,
            imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop',
            sellerId: createdUsers[5].id,
            status: 'APPROVED'
        },
        {
            title: 'Desk Lamp - Adjustable LED',
            price: 1500.00,
            imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop',
            sellerId: createdUsers[0].id,
            status: 'APPROVED'
        },
        {
            title: 'Backpack - North Face Jester',
            price: 3000.00,
            imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop',
            sellerId: createdUsers[1].id,
            status: 'APPROVED'
        }
    ];

    for (const p of products) {
        await prisma.product.create({
            data: p
        });
        console.log(`✓ Product added: ${p.title}`);
    }

    console.log('\nRealistic seeding completed successfully!');
    console.log(`Created ${createdUsers.length} users and ${products.length} products`);
    console.log('\nLogin credentials for all users:');
    console.log('Email: any of the above emails');
    console.log('Password: password123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
