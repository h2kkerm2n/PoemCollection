const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const cookieParser = require("cookie-parser");
const poemRoutes = require("./routes/poemRoutes");
const userRoutes = require("./routes/userRoutes");

const corsOptions = {
  origin: "http://localhost:8080/",
  credentials: true, //access-control-allow-credentials:true
  origin: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//replace passwordstring with password
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

//mongoose db connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successfull!"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.use("/api/v1/poems", poemRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server us running on port: ${process.env.PORT}`);
});
