// llamadas a las apis
const axios = require("axios");
const { response } = require("express");

// modificar con los valores reales
const api_cursos = "http://api-cursos_c:3000";
const api_estudiantes = "http://api-estudiante_c:8080";
const api_profesores = "api-profesores_c:7997";

// get todos los cursos del alumno en el periodo actual
// todavía no funciona con periodo
const getCursoByAlumnoByPeriodo = async(correo, periodo) => {
    try {
        const response = await axios.get(`${api_cursos}/inscripciones/alumno/${correo}/${periodo}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

// GET datos del alumno BY CORREO
const getAlumnoDataByCorreo = async(correo) => {
    try {
        const response = await axios.get(`${api_estudiantes}/api/estudiantes/by-email?correo=${correo}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return {};
    }
};

module.exports = {
    getCursoByAlumnoByPeriodo,
    getAlumnoDataByCorreo
};
