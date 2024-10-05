const express = require("express");

const app = express();
app.use(express.json());

const mainRouter = require("./routes/matricula")
app.use("/", mainRouter);

app.listen(3000, () => console.log("Matricula server started"));