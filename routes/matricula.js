const express = require("express");
const router = express.Router();
const { getCursoByAlumnoByPeriodo } = require("../api");

// Get all cursos by CORREO ALUMNO and PERIODO
router.get("/:correo_alumno", async(req, res) => {
    console.log("inside get");
    try {
        const cursos = await getCursoByAlumnoByPeriodo(req.params.correo_alumno);
        console.log(cursos);
        res.json(cursos);
    }
    catch (err) {
        return res.status(500).json({ message: err.message});
    }
});

module.exports = router;