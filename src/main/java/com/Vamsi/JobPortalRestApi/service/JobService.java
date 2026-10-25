package com.Vamsi.JobPortalRestApi.service;
import java.util.List;
 

import com.Vamsi.JobPortalRestApi.model.Job;

public interface JobService {
	
	  	Job createJob(Job j);

	    List<Job> getAllJobs();

	    Job getJobById(Integer jobId);

	    Job updateJob(Job j, Integer jobId);

	    void deleteJobById(Integer jobId);
	    
	    Job findByJobTitle(String jobTitle);

	     

		 

		 
	

}
