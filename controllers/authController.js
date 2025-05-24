const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users(email, password) VALUES($1, $2)', [email, hash]);
  res.send('Usuario registrado');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Credenciales inválidas');
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.json({ token });
};
