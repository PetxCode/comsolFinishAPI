const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3550;
require("./utils/database");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("The best platform for all NGOs in Africa...!");
});

app.use("/api/user", require("./router/userRouter"));

app.use("/api/user", require("./other/register"));

app.use("/api/brand", require("./builds/brandRouter"));
app.use("/api/event", require("./builds/eventRouter"));

app.use("/api/pitch", require("./builds/pitchRouter"));
app.use("/api/video", require("./builds/videoRouter"));
app.use("/api/journey", require("./builds/journeyRouter"));

app.listen(port, () => {
	console.log("server is ready for connection: 3550");
});
