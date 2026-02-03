const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

const isApiKeyValid = API_KEY && API_KEY.startsWith('SG.');

if (isApiKeyValid) {
    sgMail.setApiKey(API_KEY);
} else {
    console.warn("WARNING: Valid SENDGRID_API_KEY is not set. Emails will be logged to console but not sent.");
}

/**
 * Common function to send email
 */
const sendEmail = async (to, subject, html, replyTo) => {
    const msg = {
        to,
        from: {
            email: FROM_EMAIL,
            name: "UniCart"
        },
        subject,
        html,
        replyTo: replyTo || FROM_EMAIL
    };

    if (!isApiKeyValid) {
        console.log("--- MOCK EMAIL START ---");
        console.log(`To: ${msg.to}`);
        console.log(`Subject: ${msg.subject}`);
        console.log(`Body: ${msg.html}`);
        console.log("--- MOCK EMAIL END ---");
        return;
    }

    try {
        await sgMail.send(msg);
        console.log(`Email successfully sent to ${to}`);
    } catch (error) {
        console.error("Error sending email via SendGrid:", error);
        if (error.response) {
            console.error(JSON.stringify(error.response.body, null, 2));
        }
    }
};

/**
 * Notify seller about a new order request with action buttons
 */
exports.sendSellerOrderNotification = async (seller, buyer, product, acceptToken, rejectToken) => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const acceptLink = `${backendUrl}/api/orders/action?token=${acceptToken}`;
    const rejectLink = `${backendUrl}/api/orders/action?token=${rejectToken}`;

    const subject = `Order Request: ${product.title} - UniCart`;
    const html = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <h2 style="color: #4f46e5; margin-top: 0;">Hello ${seller.name},</h2>
            <p style="font-size: 16px;">Good news! <strong>${buyer.name}</strong> wants to buy your item:</p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #f3f4f6;">
                <div style="font-size: 18px; font-weight: 600; color: #111827;">${product.title}</div>
                <div style="font-size: 20px; color: #4f46e5; font-weight: bold; margin-top: 4px;">₹${product.price}</div>
            </div>

            <p style="margin-bottom: 10px;">You can accept or reject this request directly from this email:</p>
            
            <div style="display: flex; gap: 12px; margin-top: 20px;">
                <a href="${acceptLink}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin-right: 10px;">Accept Order</a>
                <a href="${rejectLink}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Reject Order</a>
            </div>

            <p style="font-size: 14px; color: #6b7280; margin-top: 30px; border-top: 1px solid #f3f4f6; padding-top: 20px;">
                Best regards,<br>
                <strong>The UniCart Team</strong>
            </p>
        </div>
    `;
    await sendEmail(seller.email, subject, html, buyer.email);
};

/**
 * Notify buyer that their order was accepted
 */
exports.sendBuyerAcceptanceEmail = async (buyer, seller, product) => {
    const subject = `Order Accepted! Contact Information for ${product.title}`;
    const html = `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #059669;">Great news, ${buyer.name}!</h2>
            <p>Your order for <strong>${product.title}</strong> has been <strong>ACCEPTED</strong> by the seller.</p>
            <p>You can now reach out to the seller to finalize the exchange:</p>
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #10b981;">
                <p><strong>Seller Name:</strong> ${seller.name}</p>
                <p><strong>Seller Email:</strong> <a href="mailto:${seller.email}">${seller.email}</a></p>
            </div>
            <p>Happy shopping!<br>The UniCart Team</p>
        </div>
    `;
    await sendEmail(buyer.email, subject, html, seller.email);
};

/**
 * Notify buyer that their order was rejected
 */
exports.sendBuyerRejectionEmail = async (buyer, product) => {
    const subject = `Update on your order: ${product.title}`;
    const html = `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h2>Hi ${buyer.name},</h2>
            <p>We're sorry, but the seller has declined your request for <strong>${product.title}</strong>.</p>
            <p>Don't worry, there are plenty of other great items available on UniCart!</p>
            <p>Best regards,<br>The UniCart Team</p>
        </div>
    `;
    await sendEmail(buyer.email, subject, html);
};
