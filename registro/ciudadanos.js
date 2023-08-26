const express = require('express');
const router = express.Router();

const ciudadanos = [];

router.post('/api/registro/ciudadanos', (req, res) => {
    // Implementa la lógica de registro de ciudadanos
    const { nombres, apellidos, DPI, fechaNacimiento, estadoCivil } = req.body;
    
    // Validaciones de los campos
    if (!nombres || !apellidos || !DPI || !fechaNacimiento || !estadoCivil) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    
    if (DPI.length !== 13) {
        return res.status(400).json({ error: 'El DPI debe tener 13 dígitos' });
    }
    
    const nuevoCiudadano = {
        nombres,
        apellidos,
        DPI,
        fechaNacimiento,
        estadoCivil
    };
    
    ciudadanos.push(nuevoCiudadano);
    
    res.status(201).json({ message: 'Ciudadano registrado exitosamente' });
    
});

router.put('api/registro/ciudadanos/:dpi', (req, res) => {
    // Implementa la lógica de actualización de datos de ciudadanos

    const dpiParam = req.params.dpi;
    const { nombres, apellidos, fechaNacimiento, estadoCivil } = req.body;

    // Encuentra al ciudadano por su DPI
    const ciudadano = ciudadanos.find(ciudadano => ciudadano.DPI === dpiParam);

    if (!ciudadano) {
        return res.status(404).json({ error: 'Ciudadano no encontrado' });
    }

    // Actualiza los datos si se proporcionan en el cuerpo de la solicitud
    if (nombres) ciudadano.nombres = nombres;
    if (apellidos) ciudadano.apellidos = apellidos;
    if (fechaNacimiento) ciudadano.fechaNacimiento = fechaNacimiento;
    if (estadoCivil) ciudadano.estadoCivil = estadoCivil;

    res.json({ message: 'Datos del ciudadano actualizados exitosamente' });
});

router.delete('api/registro/ciudadanos/:dpi', (req, res) => {
    // Implementa la lógica de eliminación de ciudadanos

    const dpiParam = req.params.dpi;

    // Encuentra al ciudadano por su DPI
    const ciudadanoIndex = ciudadanos.findIndex(ciudadano => ciudadano.DPI === dpiParam);

    if (ciudadanoIndex === -1) {
        return res.status(404).json({ error: 'Ciudadano no encontrado' });
    }

    // Simplemente elimina al ciudadano del array (esto es una simulación)
    ciudadanos.splice(ciudadanoIndex, 1);

    res.json({ message: 'Ciudadano eliminado exitosamente' });
});

router.get('api/registro/ciudadanos', (req, res) => {
    // Implementa la lógica para obtener información de un ciudadano

    const dpiParam = req.params.dpi;

    // Encuentra al ciudadano por su DPI
    const ciudadano = ciudadanos.find(ciudadano => ciudadano.DPI === dpiParam);

    if (!ciudadano) {
        return res.status(404).json({ error: 'Ciudadano no encontrado' });
    }

    res.json(ciudadano);
});

router.get('/api/registro', (req, res) => {
    // Implementa la lógica para obtener el listado de ciudadanos

    res.json(ciudadanos);
});

module.exports = router;
