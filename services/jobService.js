const jobRepository = require('../repositories/jobRepository');

const getAllJobs = async (page, size) => {
  const limit = size;
  const offset = (page - 1) * size;
  const jobs = await jobRepository.getAllJobs(limit, offset);
  const total = await jobRepository.getTotalJobCount();
  return { jobs, total };
};

const getJobById = async (id) => {
  return await jobRepository.getJobById(id);
};

const createJob = async (job) => {
  return await jobRepository.createJob(job);
};

const updateJob = async (id, job) => {
  return await jobRepository.updateJob(id, job);
};

const deleteJob = async (id) => {
  return await jobRepository.deleteJob(id);
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
