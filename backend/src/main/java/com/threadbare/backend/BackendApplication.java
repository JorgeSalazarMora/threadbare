package com.threadbare.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	// @SpringBootApplication is a shortcut for three annotations combined:
	// @Configuration (this class can define beans), @EnableAutoConfiguration
	// (Spring auto-configures things based on the dependencies on the classpath,
	// like Tomcat and Jackson for JSON), and @ComponentScan (Spring scans this
	// package and sub-packages for @RestController, @Service, @Repository, etc.)
	public static void main(String[] args) {
		// Boots the entire Spring application context: starts the embedded
		// Tomcat server, runs component scanning, wires up all the beans
		// (controllers, services, repositories), and keeps the app running
		// until it's stopped.
		SpringApplication.run(BackendApplication.class, args);
	}

}
