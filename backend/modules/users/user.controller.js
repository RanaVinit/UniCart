exports.me = (req, res) => {
    res.json(req.user);
};