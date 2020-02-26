const express = require("express")
const morgan = require("morgan")
const compression = require("compression")
const notifier = require("notifier")
const methodOverride = require("method-override")
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
//app.use(session({ secret: "1234" }));
app.use(morgan("combined"));
app.use(compression());

function errorHandler(err, req, res, next) {
    if (!err) {
      return next();
    }
    if (err) {
      const message = `Error en ${req.method} ${req.url}`;
      notifier.notify({ title: "Error", message });
      res.status(500).send("Algo se ha roto");
    }
}

console.log(`Corriendo server en modo ${process.env.NODE_ENV}`)
if (process.env.NODE_ENV === "development") {
app.use(methodOverride());
app.use(errorHandler);
}

app.listen(8080, () => console.log("Ready on port 8080!"));