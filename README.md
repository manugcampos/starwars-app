# Star Wars App

## Requirements
- Docker and Docker Compose
- (Optional) Node.js 20+ and npm for local frontend development

## Project Structure
```
starwars-app/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api.py
│   │   ├── swapi_client.py
│   │   ├── models.py
│   │   ├── utils.py
│   │   └── test_api.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   └── ...
├── docker-compose.yml
└── README.md
```

## Technologies Used
- **Backend:** FastAPI (Python), Docker
- **Frontend:** React + TypeScript, TanStack Query, Tailwind CSS, Radix UI, Wouter, Docker

### Backend
- **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **Docker:** Containerizes the backend for easy deployment and consistent environments.
- **Testing:** Uses `pytest` for backend API tests.

### Frontend
- **React + TypeScript:** Modern frontend framework with static typing for robust UI development.
- **TanStack Query:** Efficient data fetching, caching, and state management for server state.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development and responsive design.
- **Radix UI:** Accessible, unstyled UI primitives for building high-quality design systems.
- **Wouter:** Minimalist routing for React.
- **Docker:** Containerizes the frontend for easy deployment.

## How to Run the Full App with Docker Compose

1. (Optional) Create a `.env` file in the `backend/` directory with the following content:
   ```
   LOG_LEVEL=INFO
   SWAPI_BASE_URL=https://swapi.info/api
   ```
   This allows you to configure the logging level and the base URL for the Star Wars API proxy.
2. Build and start all services:
   ```bash
   docker-compose up --build
   ```
   This will start both the backend and frontend containers. The frontend will be available at [http://localhost:6969](http://localhost:6969).

## Frontend Details
- **Styling:** Uses Tailwind CSS for a modern, responsive look.
- **Accessible Components:** Built with Radix UI for accessibility.
- **Routing:** Uses Wouter for client-side navigation.
- **Data Fetching:** Uses TanStack Query for efficient and reliable data management.

## Features
- Paginated tables for Star Wars characters and planets, with search and sorting capabilities.
- Simulated AI insights for any character or planet (mocked/fake AI response for demonstration).
- Responsive and modern user interface.
- Clear loading and error states for a better user experience.

## Local Development

### Backend
To run the backend locally (without Docker):
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- The backend will be available at `http://localhost:8000`.
- Hot-reloading is enabled for development.

### Frontend
To run the frontend locally (without Docker):
```bash
cd frontend
npm install
npm start
```
- The frontend will be available at `http://localhost:3000` by default.
- The app will automatically reload if you make changes to the source code.

## Backend Testing
To run backend tests:
```bash
cd backend
pytest app/test_api.py
```
- This will execute all API tests to ensure endpoints are working as expected.

---

Ready to explore the Star Wars universe! If you have any questions or want to contribute, feel free to open an issue or pull request. 