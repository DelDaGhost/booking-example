# Frontend

This folder contains the React-based frontend for the hotel booking application. It allows customers to select rooms, view availability, and make bookings. Managers can view bookings in a calendar interface.

The app is built using:
- React with TypeScript
- Apollo Client for GraphQL communication
- Tailwind CSS for styling
- Vite for local development and fast builds

## Running with Docker

Create a copy of the .env.example file named .env and adjust to your needs.

To run the frontend locally using Docker:

    docker compose up --build

Once running, the application will be accessible at:

    http://localhost:8080

Make sure the backend is also running, as the frontend relies on it for data (see the root or backend README for setup instructions).
