const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const oauth2orize = require('oauth2orize');
const https = require('https');
const fs = require('fs');

// Server configuration with HTTPS options
const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

const app = express();

app.use(bodyParser.json());
app.enable("trust proxy")

// Conexión a base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/oauth-server', {
  // Opciones actualizadas no necesarias en versiones nuevas
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Configuración Passport y OAuth2 (asumo en otros archivos requeridos)
require('./config/passport');
const oauth2Routes = require('./routes/index');

// Rutas OAuth2
app.use('/oauth2', oauth2Routes);

// Servidor escuchando en puerto 3000

https.createServer(options, app).listen(3000, () => {
    console.log('HTTPS server listening on port 3000');
});
