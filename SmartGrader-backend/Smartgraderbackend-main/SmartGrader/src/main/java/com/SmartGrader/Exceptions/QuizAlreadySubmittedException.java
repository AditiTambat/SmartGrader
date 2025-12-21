package com.SmartGrader.Exceptions;

public class QuizAlreadySubmittedException extends Exception {
	public QuizAlreadySubmittedException(String message) {
        super(message);
    }

}
