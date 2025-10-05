const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware que valida el access_token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, "secret");
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Ruta protegida
router.get('/data', verifyToken, (req, res) => {
  res.json({
    message: "Bienvenido al API protegido",
    user: req.user
  });
});

module.exports = router;
