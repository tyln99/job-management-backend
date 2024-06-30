const pool = require('../db/db');

const getAllJobs = async (limit, offset) => {
  const result = await pool.query(
    'SELECT * FROM jobs ORDER BY updated_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return result.rows;
};

const getTotalJobCount = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM jobs');
  return parseInt(result.rows[0].count, 10);
};

const getJobById = async (id) => {
  const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
  return result.rows[0];
};

const createJob = async (job) => {
  const { title, description, expiry_date } = job;
  const result = await pool.query(
    'INSERT INTO jobs (title, description, expiry_date, updated_at, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
    [title, description, expiry_date]
  );
  return result.rows[0];
};

const updateJob = async (id, job) => {
  const { title, description, expiry_date } = job;
  const result = await pool.query(
    'UPDATE jobs SET title = $1, description = $2, expiry_date = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
    [title, description, expiry_date, id]
  );
  return result.rows[0];
};

const deleteJob = async (id) => {
  const result = await pool.query(
    'DELETE FROM jobs WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getTotalJobCount,
};
