 
package com.Vamsi.JobPortalRestApi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Vamsi.JobPortalRestApi.model.Job;
import com.Vamsi.JobPortalRestApi.service.JobService;

@CrossOrigin(origins = {
		"http://localhost:5173"
	})
@RestController
@RequestMapping("/Job")
public class JobController {

    @Autowired
    JobService jobService;

    @GetMapping("/Get")
    public String welcome() {
        return "Welcome To Vamsi's Job Portal Rest API";
    }

    @PostMapping("/Post")
    public Job createJob(@RequestBody Job j) {
        return jobService.createJob(j);
    }

    @PutMapping("/Update/{jobId}")
    public Job updateJobById(
            @RequestBody Job j,
            @PathVariable Integer jobId) {
        return jobService.updateJob(j, jobId);
    }

    @GetMapping("/ById/{jobId}")
    public Job getJobById(@PathVariable Integer jobId) {
        return jobService.getJobById(jobId);
    }

    @GetMapping("/Byname/{title}")
    public Job getJobByName(@PathVariable String title) {
        return jobService.findByJobTitle(title);
    }

    @GetMapping("/ByAll")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @DeleteMapping("/Delete/{jobId}")
    public String deleteJobById(@PathVariable Integer jobId) {
        jobService.deleteJobById(jobId);
        return "Deleted Job " + jobId + " Successfully";
    }
}
