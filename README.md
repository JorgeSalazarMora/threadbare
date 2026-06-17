# Threadbare

A full-stack clothing store built as a 30-day challenge. The goal is to evolve an existing React frontend into a production-grade application backed by Spring Boot, PostgreSQL, JWT authentication, and Docker — one focused concept per day.

## What this is

The 7-day frontend challenge (Days 1–7) produced a working React store: product browsing, category filtering, search, a cart, and a checkout form — all running in the browser with hardcoded data. The 30-day backend challenge picks up from there, replacing the hardcoded data with a real database and adding auth, orders, an admin area, tests, and a free-tier deployment.

## Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 19, Vite 8, React Router v7       |
| Backend    | Spring Boot 4, Java 17, Maven           |
| Database   | PostgreSQL 16 (via Docker Compose)      |
| Auth       | JWT (stateless), BCrypt                 |
| Deploy     | TBD (Day 29)                            |

## Repo layout

```
treadbare/
├── frontend/   # Vite + React app
└── backend/    # Spring Boot API
```

## Running the project

**Frontend** (no backend required yet):

```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

**Backend** (requires Java 17+):

```bash
cd backend
./mvnw spring-boot:run
# http://localhost:8080/api/health
```

**Full stack** (once Docker Compose is added in Day 3):

```bash
docker compose up
```

## Progress

| Day | Topic                        | Status      |
|-----|------------------------------|-------------|
| 1   | Spring Boot setup, /health   | Done        |
| 2–30| Products, DB, Auth, Orders…  | In progress |

See `backend/README.md` for backend-specific notes and `frontend/README.md` for frontend details.
