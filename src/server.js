const usersRouter = require("./api/products/index.ts")
const express = require("express")
const morgan = require("morgan")
const compression = require("compression")
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("combined"));
app.use(compression());

app.use("/users", usersRouter)
app.listen(8080, () => console.log("Ready on port 8080!"));