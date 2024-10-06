const express = require("express");
const router = express.Router();
const { getCursoByAlumnoByPeriodo, getAlumnoDataByCorreo } = require("../api");

// Get all cursos by CORREO ALUMNO and PERIODO
// + DATA de ALUMNO
router.get("/:correo_alumno/:periodo", async(req, res) => {
    try {
        let cursos_ = await getCursoByAlumnoByPeriodo(req.params.correo_alumno, req.params.periodo);

        let data_alumno_ = await getAlumnoDataByCorreo(req.params.correo_alumno);
        let {nombre, correo, carrera, escalaPago } = data_alumno_;
        data_alumno_ = {nombre, correo, carrera, escalaPago};
        console.log(cursos_);
        
        const unified_response = {
            data_alumno: data_alumno_,
            cursos: cursos_
        };
        res.json(unified_response);
    }
    catch (err) {
        return res.status(500).json({ message: err.message});
    }
});

module.exports = router;