const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const oauth2orize = require('oauth2orize');
const https = require('https');
const fs = require('fs');
const session = require('express-session');

// Server configuration with HTTPS options
const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

const app = express();

app.use(session({
  secret: 'una_clave_secreta_dura_de_adivinar',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } // Usa true si usas HTTPS y dominios reales
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

app.get('/callback', (req, res) => {
  const authorizationCode = req.query.code;
  const error = req.query.error;
  
  if (error) {
    return res.status(400).send(`Authorization error: ${error}`);
  }
  
  if (!authorizationCode) {
    return res.status(400).send('Missing authorization code');
  }
  
  res.send(`Authorization successful! Code received: ${authorizationCode}`);
});

app.use('/oauth2', (req, res, next) => {
  console.log('Body:', req.body);
  next();
}, oauth2Routes);

// Servidor escuchando en puerto 3000

https.createServer(options, app).listen(3000, () => {
    console.log('HTTPS server listening on port 3000');
});
