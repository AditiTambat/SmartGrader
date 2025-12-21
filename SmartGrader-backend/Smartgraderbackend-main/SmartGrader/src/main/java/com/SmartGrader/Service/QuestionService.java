package com.SmartGrader.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SmartGrader.Entity.Question;
import com.SmartGrader.Repository.Questionrepo;

@Service
public class QuestionService {
	
	
	
	@Autowired
	private Questionrepo repo;
	
	
	
	public List<Question> getall()
	{
		return repo.findAll();
	}

}
