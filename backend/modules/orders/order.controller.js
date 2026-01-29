const service = require("./order.service");

exports.placeOrder = async (req, res) => {
    try {
        const { productId } = req.body;
        const buyerId = req.user.id;
        const order = await service.createOrder(productId, buyerId);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBuyerOrders = async (req, res) => {
    try {
        const orders = await service.getOrdersByBuyer(req.user.id);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSellerOrders = async (req, res) => {
    try {
        const orders = await service.getOrdersBySeller(req.user.id);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await service.updateOrderStatus(id, status, req.user.id);
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
