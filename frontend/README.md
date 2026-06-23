# FraudGuard AI Frontend

A modern React + Vite dashboard for the FraudGuard AI fintech platform.

## Setup

```bash
cd frontend
npm install
npm run dev
```

## Local API proxy

The app expects the backend API at `http://localhost:8000`.

- GET `/` returns `{ message: 'FraudGuard AI Running' }`
- POST `/predict` accepts transaction payloads and returns fraud prediction results.
