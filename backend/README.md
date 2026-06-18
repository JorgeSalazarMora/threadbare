# Threadbare — Backend

Spring Boot 4 REST API for the Threadbare clothing store. Built day by day as part of the 30-day full-stack challenge.

## Requirements

- Java 17+
- Maven (or use the included `./mvnw` wrapper)
- Docker (required from Day 3 onward for PostgreSQL)

## Running

```bash
./mvnw spring-boot:run
```

Health check:

```bash
curl http://localhost:8080/api/health
# {"status":"ok"}
```

## Why JPA is excluded on Day 1

`spring-boot-starter-data-jpa` is already declared in `pom.xml` because it will be needed from Day 3 onward. However, Spring Boot's autoconfiguration tries to create a `DataSource` connection pool at startup. Without a running database and a configured `spring.datasource.url`, the app fails immediately with a `DataSourceProperties$DataSourceBeanCreationException`.

To let the app boot without a database on Day 1, both JPA-related autoconfiguration classes are excluded in `application.properties`:

```properties
spring.autoconfigure.exclude=\
  org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration,\
  org.springframework.boot.hibernate.autoconfigure.HibernateJpaAutoConfiguration
```

This exclusion will be removed in Day 3 once PostgreSQL is running via Docker Compose and the datasource is configured.

## Current endpoints

| Method | Path               | Auth | Description        |
|--------|--------------------|------|--------------------|
| GET    | /api/health        | None | Health check       |
| GET    | /api/products      | None | List all products  |
| GET    | /api/products/{id} | None | Get product by id  |

## Running tests

```bash
./mvnw test
```

## Production note

Secrets (`spring.datasource.password`, JWT secret) must be supplied as environment variables in production — never committed to source control.

## Request flow

When a request hits GET /api/products, the embedded Tomcat server
receives it first and hands it to Spring's DispatcherServlet, which
matches the path to the getAllProducts() method based on its
@GetMapping annotation. That method runs and returns a
List<Product>, which Jackson automatically converts into JSON
before Tomcat sends it back to the client as the HTTP response.