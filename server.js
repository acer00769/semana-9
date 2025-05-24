require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const verifyToken = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reservas', verifyToken, reservaRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en puerto', process.env.PORT || 3000);
});
