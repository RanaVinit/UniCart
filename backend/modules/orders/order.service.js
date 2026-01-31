const prisma = require("../../prismaClient");

exports.createOrder = async (productId, buyerId) => {
    // Check if product exists and is not sold
    const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) }
    });

    if (!product) {
        throw new Error("Product not found");
    }

    if (product.isSold) {
        throw new Error("Product is already sold");
    }

    if (product.sellerId === parseInt(buyerId)) {
        throw new Error("Sellers cannot buy their own products");
    }

    // Prevent duplicate purchases of the same product
    const existingOrderForProduct = await prisma.order.findFirst({
        where: {
            productId: parseInt(productId),
            buyerId: parseInt(buyerId)
        }
    });

    if (existingOrderForProduct) {
        throw new Error("You have already requested to buy this product.");
    }

    // Prevent multiple pending orders (must resolve current one first)
    // "One active trade at a time" rule
    const activePendingOrder = await prisma.order.findFirst({
        where: {
            buyerId: parseInt(buyerId),
            status: 'PENDING'
        }
    });

    if (activePendingOrder) {
        throw new Error("You have a pending order. Please wait for it to be approved or rejected.");
    }

    return await prisma.order.create({
        data: {
            productId: parseInt(productId),
            buyerId: parseInt(buyerId),
            status: 'PENDING'
        },
        include: {
            product: true,
            buyer: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });
};

exports.getOrdersByBuyer = async (buyerId) => {
    return await prisma.order.findMany({
        where: { buyerId: parseInt(buyerId) },
        include: {
            product: {
                include: {
                    seller: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

exports.getOrdersBySeller = async (sellerId) => {
    return await prisma.order.findMany({
        where: {
            product: {
                sellerId: parseInt(sellerId)
            }
        },
        include: {
            product: true,
            buyer: {
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

exports.updateOrderStatus = async (orderId, status, userId) => {
    return await prisma.$transaction(async (tx) => {
        const order = await tx.order.findUnique({
            where: { id: parseInt(orderId) },
            include: {
                product: true
            }
        });

        if (!order) {
            throw new Error("Order not found");
        }

        // Only the seller of the product can update the order status
        if (order.product.sellerId !== parseInt(userId)) {
            throw new Error("Unauthorized to update this order");
        }

        const updatedOrder = await tx.order.update({
            where: { id: parseInt(orderId) },
            data: { status }
        });

        // If order is accepted, mark product as sold
        if (status === 'ACCEPTED') {
            await tx.product.update({
                where: { id: order.productId },
                data: { isSold: true }
            });
        }

        return updatedOrder;
    });
};
