const prisma = require("../../prismaClient");

exports.addProduct = async (data, sellerId) => {
    return await prisma.product.create({
        data: {
            title: data.title,
            price: parseFloat(data.price),
            pickupLocation: data.pickupLocation,
            sellerId: parseInt(sellerId)
        }
    });
};

exports.getAllProducts = async () => {
    return await prisma.product.findMany({
        include: {
            seller: {
                select: {
                    name: true,
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

exports.getProductById = async (id) => {
    return await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
            seller: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });
};