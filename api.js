// Importar módulos necesarios
const express = require("express");
const axios = require("axios");

// Crear una instancia de Express
const app = express();
app.use(express.json());

// URLs base de las APIs
const apiEstudiantes = "http:/98.83.108.27:8009";
const apiProfesores = "http://98.83.108.27:8010";
const apiCursos = "http://98.83.108.27:7999";

// Función para obtener el consolidado de un estudiante

// Función para obtener el consolidado de un estudiante
const getConsolidadoEstudiante = async (correo, periodo) => {
    try {
        const [estudianteResponse, inscripcionesResponse, profesoresResponse] = await Promise.all([
            axios.get(`${apiEstudiantes}/api/estudiantes/by-email?correo=${correo}`),
            axios.get(`${apiCursos}/inscripciones/alumno/${correo}/${periodo}`),
            axios.get(`${apiProfesores}/profesor`)
        ]);

        const estudiante = estudianteResponse.data;
        const inscripciones = inscripcionesResponse.data;
        const profesores = profesoresResponse.data;

        // Mapear inscripciones con profesores correspondientes
        const cursosConProfesores = inscripciones.map((inscripcion) => {
            const profesorCurso = profesores.find(profesor => profesor.id === inscripcion.id_profesor);
            return {
                ...inscripcion,
                profesor: profesorCurso ? profesorCurso.nombres : "Profesor no asignado"
            };
        });

        // Consolidar la información del estudiante y sus cursos
        const consolidado = {
            estudiante: {
                carrera: estudiante.carrera,
                nombre: estudiante.nombre,
                genero: estudiante.genero,
                fechaNacimiento: estudiante.fechaNacimiento,
                correo: estudiante.correo,
                escalaPago: estudiante.escalaPago
            },
            inscripciones: cursosConProfesores
        };

        return consolidado;
    } catch (error) {
        console.error("Error al obtener el consolidado:", error);
        throw new Error("No se pudo obtener el consolidado");
    }
};

// Endpoint para obtener el consolidado de un estudiante
app.get("/consolidado/:correo/:periodo", async (req, res) => {
    const { correo, periodo } = req.params;
    try {
        const consolidado = await getConsolidadoEstudiante(correo, periodo);
        res.json(consolidado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Escuchar en el puerto 4000
app.listen(4000, () => {
    console.log("Servidor corriendo en el puerto 4000");
});
