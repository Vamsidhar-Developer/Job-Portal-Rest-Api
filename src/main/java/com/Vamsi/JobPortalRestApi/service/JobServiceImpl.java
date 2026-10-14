
package com.Vamsi.JobPortalRestApi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Vamsi.JobPortalRestApi.model.Job;
import com.Vamsi.JobPortalRestApi.repo.JobRepo;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    JobRepo jobRepo;

    @Override
    public Job createJob(Job j) {
        return jobRepo.save(j);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    @Override
    public Job getJobById(Integer jobId) {
        return jobRepo.findById(jobId).orElse(null);
    }

    @Override
    public Job updateJob(Job j, Integer jobId) {
        Job existingJob = jobRepo.findById(jobId).orElse(null);

        if (existingJob != null) {
            existingJob.setTitle(j.getTitle());
            existingJob.setCompany(j.getCompany());
            existingJob.setLocation(j.getLocation());
            existingJob.setSalary(j.getSalary());
            existingJob.setExperience(j.getExperience());
            existingJob.setSkills(j.getSkills());
            existingJob.setStatus(j.getStatus());

            return jobRepo.save(existingJob);
        }

        return null;
    }

    @Override
    public void deleteJobById(Integer jobId) {
        jobRepo.deleteById(jobId);
    }

    @Override
    public Job findByJobTitle(String jobTitle) {
        return jobRepo.findByTitle(jobTitle);
    }
}
