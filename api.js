// llamadas a las apis
const axios = require("axios")

// modificar con los valores reales
const api_cursos = "http://3.94.250.107:7999";
const api_profesores = "api-profesores_c:8080";
const api_estudiantes = "api-estudiantes_c:8000";

// get todos los cursos del alumno en el periodo actual
// todavía no funciona con periodo
const getCursoByAlumnoByPeriodo = async(correo, periodo="2024-2") => {
    try {
        response = await axios.get(`${api_cursos}/inscripciones/alumno/${correo}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    getCursoByAlumnoByPeriodo
};