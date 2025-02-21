# Santex-back-EdG

## Overview

This project is built using a modern stack that includes:

- **TypeScript**
- **Node.js + Express**
- **GraphQL**
- **Prisma**
- **PostgreSQL**

## Folder Structure

The project follows a modular folder structure, separating concerns into different layers such as configuration, interfaces, services, and feature-based modules.

## Entities and Design

We have defined four main entities in this project:

- **Competition**
- **Team**
- **Player**
- **Coach**

Going beyond a simple implementation, we centralized **Player** and **Coach** into a single unified class called **Person**

## Database Choice

I opted for an **SQL-based database**, specifically **PostgreSQL**, because our data model is well-structured, and we do not require the flexibility of NoSQL. For other cases where relationships and structured data aren't well defined, a NoSQL database is the most optimal choice, but that's not the case here.

## Prisma ORM

We chose **Prisma** as our ORM because is a tool that allow us to comunicate easier with the bd

## Containerization

Inside the project you will find two docker files

- A **Dockerfile** that defines the container for deployment process
- A **docker-compose.yml** file that simplifies setting up the development environment, you just need to run a single command.

## API Rate Limiting

The API integration with **football-data.org** includes rate limiting using **Bottleneck**. This library allows:

- Efficient **rate control** to comply with API request limits.
- Integration with **Redis**, providing scalability options in case the app needs to grow horizontally.

## GraphQL approach

I didn’t follow an auto-generated GraphQL schema (database-first GraphQL APIs) because, in my opinion, it’s not as robust as having full control over complex business logic that an enterprise application might require. That’s why I used TypeGraphQL to manually generate the GraphQL schemas. It requires writing more code, but it results in a more scalable and maintainable solution.

## Getting Started

### Prerequisites

You just need docker installed in your machine

### Installation

1. Create a new file from .env.example to .env
2. Fill the **FOOTBALL_API_TOKEN** env with my personal value: `ccf36033e25e40239a02534e49c1a1d4`

3. Run `docker compose up`

### Some GraphQL examples

### Import Competition Data

```graphql
mutation ImportCompetitionData($leagueCode: String!) {
  importCompetitionData(leagueCode: $leagueCode) {
    message
  }
}
```

**Variables:**

```json
{
  "leagueCode": "CL"
}
```

### Fetch Players with (Player & Coach)

```graphql
query {
  players(leagueCode: "CL") {
    id
    name
    ... on Player {
      position
    }
    ... on Coach {
      nationality
    }
  }
}
```

### Fetch Players with Filters

```graphql
query {
  players(leagueCode: "CL", filter: { teamName: "Universitario" }) {
    id
    name
    ... on Player {
      position
    }
    ... on Coach {
      nationality
    }
  }
}
```

### Fetch Team Details

```graphql
query {
  team(name: "BSC Young Boys") {
    id
    name
    players {
      position
    }
    coach {
      name
    }
  }
}
```

**GraphQL Endpoint:**

```
localhost:4000/graphql
```
