const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
	try {
		const authToken = req.headers.authorization;
		if (authToken) {
			const token = authToken.split(" ")[1];
			if (token) {
				jwt.verify(token, "THISis_theSecret_ForTHISACT!", (err, payload) => {
					req.user = payload;
					next();
				});
			} else {
				res.status(400).json({
					message: "Your token isn't correct",
				});
			}
		} else {
			res.status(400).json({
				message: "You do not have access for this operation",
			});
		}
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = verify;
