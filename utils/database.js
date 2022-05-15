const mongoose = require("mongoose");
const url = "mongodb://localhost/comsolDB";
const urlOnline =
	"mongodb+srv://comsol:comsol@cluster0.kjlbe.mongodb.net/comsol?retryWrites=true&w=majority";

mongoose.connect(urlOnline).then(() => {
	console.log("database is now connected");
});

module.exports = mongoose;
