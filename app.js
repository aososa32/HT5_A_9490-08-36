const express = require('express');
const app = express();

const registroRoutes = require('./registro');

app.use(express.json());

app.use('/api/registro', registroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
