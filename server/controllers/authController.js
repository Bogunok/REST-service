const jwt = require("jsonwebtoken");

class AuthController {
    async login(req, res) {
        const { username, password } = req.body;

        try {
            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required." });
            }

            let role = "user"; // Default role
            if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
                role = "admin"; // If admin credentials are provided
            } else if (password !== process.env.SESSION_SECRET) {
                return res.status(401).json({ message: "Invalid credentials." });
            }

            const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ token, role, username });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async logout(req, res) {
        res.json({ message: "Logged out successfully." });
    }

    async checkAdmin(req, res) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ isAdmin: false, message: "No token provided." });
        }

        const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

        try {
            const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
            if (decoded.role === "admin") {
                return res.json({ isAdmin: true });
            } else {
                return res.json({ isAdmin: false });
            }
        } catch (err) {
            return res.status(401).json({ isAdmin: false, message: "Invalid token." });
        }
    }
}

module.exports = new AuthController();