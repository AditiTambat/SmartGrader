package com.SmartGrader.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SmartGrader.Entity.Student;
import com.SmartGrader.Entity.StudentAnswer;

public interface Studentanswerrepo extends JpaRepository<StudentAnswer, Integer> {
	 boolean existsByStudent(Student student);
}
