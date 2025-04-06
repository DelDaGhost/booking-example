# Backend

This is a Laravel application exposing a GraphQL API.

## Features

- Query rooms and bookings
- Book a room through mutations

## Getting started

### .env

Create a copy of the .env.example file named .env and adjust to your needs.

### Startup environment

```
docker compose up -d
```

### Connect to container

```
docker exec -it php-fpm /bin/bash
```

### Generate App Key (run in container)

```
php artisan key:generate
```

### Prepare database (run in container)

```
php artisan migrate --seed
```

## GraphQL endpoint

Accessible at: http://localhost:8000/graphql
