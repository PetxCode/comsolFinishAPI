const userModel = require("../model/userModel");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
	try {
		const getUser = await userModel.find();

		res.status(200).json({
			status: "success",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			status: err.message,
		});
	}
};

const getUser = async (req, res) => {
	try {
		const getUser = await userModel.findById(req.params.id);

		res.status(200).json({
			status: "success",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			status: err.message,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const { userName } = req.body;
		const getUser = await userModel.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: "success",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			status: err.message,
		});
	}
};

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });
		if (user) {
			const checkPassword = await bcrypt.compare(password, user.password);
			if (checkPassword) {
				const token = jwt.sign(
					{
						_id: user._id,
						email: user.email,
						userName: user.userName,
						logo: user.logo,
					},
					"THISis_theSecret_ForTHISACT!",
					{ expiresIn: "2d" }
				);
				const { password, ...info } = user._doc;

				res.status(200).json({
					status: "Welcome back",
					data: { token, ...info },
				});
			} else {
				res.status(404).json({
					status: "password isn't correct",
				});
			}
		} else {
			res.status(404).json({
				status: "email isn't correct",
			});
		}
	} catch (err) {
		res.status(404).json({
			status: err.message,
		});
	}
};

module.exports = {
	getUsers,
	getUser,
	deleteUser,
	signIn,
};
