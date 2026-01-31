module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: Missing authentication" });
    }

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Forbidden: Admin access required" });
    }

    next();
};
