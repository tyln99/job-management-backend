const { validateJob } = require('../middlewares/validateJob');
const jobService = require('../services/jobService');

const getAllJobs = async (req, res) => {
  const pageNumber = parseInt(req.query['page']['number']) || 1;
  const pageSize = parseInt(req.query['page']['size']) || 10; // Default page size is 10
  try {
    const { jobs, total } = await jobService.getAllJobs(pageNumber, pageSize);
    res.status(200).json({
      page: pageNumber,
      size: pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await jobService.getJobById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createJob = async (req, res) => {
  const job = req.body;
  try {
    const newJob = await jobService.createJob(job);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const job = req.body;
  try {
    const updatedJob = await jobService.updateJob(id, job);
    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJob = await jobService.deleteJob(id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted', job: deletedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob: [...validateJob, createJob], // Apply validation middleware before createJob
  updateJob: [...validateJob, updateJob], // Apply validation middleware before updateJob
  deleteJob,
};
