const service = require("./auth.service");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const user = await service.register(req.body);
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "7d" }
        );
        const { password, ...userWithoutPassword } = user;

        res.status(201).json({ token, user: userWithoutPassword });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await service.login(req.body);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};