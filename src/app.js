const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

const app = express();
app.use(
    cors({
        origin: ["*", "http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "PATCH", "PUT", "POST", "DELETE", "OPTIONS"],
    })
);
const port = 3000;

app.use(bodyParser.json());
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
