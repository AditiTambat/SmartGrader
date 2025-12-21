package com.SmartGrader.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SmartGrader.Entity.Question;

public interface Questionrepo extends JpaRepository<Question, Integer> {

	 List<Question> findAllByOrderByIdAsc();
	
}
