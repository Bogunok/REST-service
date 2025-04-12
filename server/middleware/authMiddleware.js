const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRole = null) => (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;

        if (requiredRole && user.role !== requiredRole) {
            return res.status(403).json({ message: "Forbidden: insufficient privileges." });
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = authMiddleware;