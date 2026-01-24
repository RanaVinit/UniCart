const service = require("./auth.service");

exports.register = async (req, res) => {
    try {
        const user = await service.register(req.body);
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const token = await service.login(req.body);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};