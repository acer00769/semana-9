const db = require('../config/db');

exports.getHorarios = async (req, res) => {
  const result = await db.query('SELECT * FROM schedules WHERE available = true');
  res.json(result.rows);
};

exports.reservar = async (req, res) => {
  const { schedule_id } = req.body;
  const user_id = req.user.id;
  await db.query('INSERT INTO reservations(user_id, schedule_id, status) VALUES($1, $2, $3)', [user_id, schedule_id, 'confirmado']);
  await db.query('UPDATE schedules SET available = false WHERE id = $1', [schedule_id]);
  res.send('Reserva confirmada');
};
