package com.Vamsi.JobPortalRestApi.repo;

 
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.Vamsi.JobPortalRestApi.model.Job;

@Repository
public interface JobRepo extends JpaRepository<Job, Integer> {
	
	Job findByTitle(String title);

	 
}
