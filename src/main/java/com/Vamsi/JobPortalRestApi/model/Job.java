package com.Vamsi.JobPortalRestApi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Job")
@Setter
@Getter
public class Job {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	Integer jobId;
	String title;
	String company;
	String location;
	Double salary;
	Integer experience;
	String skills;
	String status;
}
 