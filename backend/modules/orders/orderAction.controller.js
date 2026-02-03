const jwt = require("jsonwebtoken");
const orderService = require("./order.service");

/**
 * Handle Accept/Reject actions from email links
 */
exports.handleEmailAction = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).send(getErrorHtml("Action link is missing a token."));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { orderId, status, sellerId } = decoded;

        // Verify it's a valid status for this action
        if (status !== 'ACCEPTED' && status !== 'REJECTED') {
            throw new Error("Invalid action status.");
        }

        // Update the order status using the existing service logic
        await orderService.updateOrderStatus(orderId, status, sellerId);

        const color = status === 'ACCEPTED' ? '#10b981' : '#ef4444';
        const statusText = status === 'ACCEPTED' ? 'Accepted' : 'Rejected';

        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Order ${statusText}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
                    <style>
                        body { font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f9fafb; }
                        .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); text-align: center; max-width: 400px; width: 100%; border-top: 8px solid ${color}; }
                        h1 { color: #111827; margin-bottom: 8px; }
                        p { color: #6b7280; line-height: 1.5; }
                        .btn { display: inline-block; margin-top: 24px; padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; transition: background 0.2s; }
                        .btn:hover { background-color: #4338ca; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>Order ${statusText}</h1>
                        <p>The order has been successfully ${status.toLowerCase()}. The buyer will be notified via email.</p>
                        <a href="${process.env.FRONTEND_URL || '#'}" class="btn">Go to Dashboard</a>
                    </div>
                </body>
            </html>
        `);
    } catch (err) {
        console.error("Email Action Error:", err);
        let message = "This link is either invalid, expired, or has already been used.";
        if (err.message === "Order not found") message = "This order could not be found.";
        if (err.message === "Unauthorized to update this order") message = "You are not authorized to perform this action.";

        res.status(400).send(getErrorHtml(message));
    }
};

function getErrorHtml(message) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Action Failed</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
                <style>
                    body { font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #fef2f2; }
                    .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); text-align: center; max-width: 400px; width: 100%; border-top: 8px solid #ef4444; }
                    h1 { color: #991b1b; margin-bottom: 8px; }
                    p { color: #b91c1c; line-height: 1.5; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Action Failed</h1>
                    <p>${message}</p>
                </div>
            </body>
        </html>
    `;
}
