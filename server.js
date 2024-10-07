const express = require("express");

const app = express();
app.use(express.json());

app.get('/status', (req, res) => {
    res.status(200).send('Service is healthy');
});

const mainRouter = require("./routes/matricula")
app.use("/", mainRouter);

app.listen(3000, () => console.log("Matricula server started"));
