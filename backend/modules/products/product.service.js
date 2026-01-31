const prisma = require("../../prismaClient");

exports.addProduct = async (data, sellerId) => {
    return await prisma.product.create({
        data: {
            title: data.title,
            description: data.description,
            price: parseFloat(data.price),
            pickupLocation: data.pickupLocation,
            imageUrl: data.imageUrl,
            publicId: data.publicId,
            sellerId: parseInt(sellerId)
        }
    });
};

exports.getAllProducts = async () => {
    return await prisma.product.findMany({
        where: {
            status: 'APPROVED'
        },
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

// Admin version to see all products including PENDING
exports.getAdminProducts = async () => {
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

exports.updateProduct = async (id, data, sellerId) => {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product || product.sellerId !== parseInt(sellerId)) {
        throw new Error("Unauthorized to update this product");
    }

    return await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
            title: data.title,
            description: data.description,
            price: data.price ? parseFloat(data.price) : undefined,
            pickupLocation: data.pickupLocation,
            imageUrl: data.imageUrl,
            publicId: data.publicId,
            isSold: data.isSold
        }
    });
};

exports.updateProductStatus = async (id, status) => {
    return await prisma.product.update({
        where: { id: parseInt(id) },
        data: { status }
    });
};

exports.deleteProduct = async (id, sellerId) => {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product || product.sellerId !== parseInt(sellerId)) {
        throw new Error("Unauthorized to delete this product");
    }

    return await prisma.product.delete({
        where: { id: parseInt(id) }
    });
};