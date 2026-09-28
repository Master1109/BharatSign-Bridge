# Backend MVP Todo List

## Project Setup
- [ ] Initialize Python 3.11+ project
- [ ] Create virtual environment
- [ ] Set up dependency management (pip, requirements.txt)
- [ ] Initialize git repository

## Core Dependencies
- [ ] Install required packages:
    - fastapi==0.110.0
    - uvicorn[standard] (ASGI server)
    - pydantic==2.0+
    - python-dotenv (for environment variables)
    - google-generativeai (for Gemini API)
    - python-multipart (for handling form data, if needed)
    - pytest (for testing)
    - pytest-asyncio (for async testing)
    - httpx (for making HTTP requests, if needed)
    - python-jose[cryptography] (for JWT, if authentication is added later)
    - passlib[bcrypt] (for password hashing, if authentication is added later)
    - email-validator (for email validation, if authentication is added later)

## Environment Configuration
- [ ] Create .env file for environment variables (not to be committed)
    - GEMINI_API_KEY: Your Gemini API key
    - DEBUG: Set to True for development
    - HOST: 0.0.0.0
    - PORT: 8000
    - CORS_ORIGINS: List of allowed origins (for development, can be ["*"])

## Main Application Structure
- [ ] Create main.py (FastAPI app instance)
- [ ] Create app/ directory for modular structure
    - app/__init__.py
    - app/main.py (if separating from root)
    - app/api/ (for API routes)
    - app/core/ (for configuration, security, etc.)
    - app/services/ (for business logic)
    - app/models/ (for Pydantic models)
    - app/utils/ (for utility functions)

## Core Features Implementation

### 1. Configuration and Settings
- [ ] Create settings module to load environment variables
- [ ] Configure CORS middleware to allow frontend origins
- [ ] Set up basic logging

### 2. Gemini AI Service
- [ ] Create service for interacting with Gemini API
    - Initialize Gemini client with API key from environment
    - Create function to process video base64 string and return recognized ISL meaning
    - Handle API errors and retries
    - Implement confidence scoring (based on Gemini response or fallback)
    - For MVP, we will use a simple prompt: "Recognize the Indian Sign Language (ISL) sign in this video and return the meaning in English. If unsure, return low confidence."

### 3. Video Processing Endpoint
- [ ] Create API endpoint to receive video data
    - POST /process-isl
    - Accept JSON with: { "video_base64": string, "context": optional string (for future) }
    - Validate input (video_base64 must be a valid base64 string of a video)
    - Call Gemini service to process the video
    - Return JSON response: { "recognized_meaning": string, "confidence": string (high/medium/low), "processing_time_ms": integer }

### 4. Basic Health Check
- [ ] Create GET /health endpoint
    - Returns { "status": "ok", "timestamp": current_time }

### 5. Error Handling
- [ ] Implement global exception handler for FastAPI
- [ ] Return consistent error responses: { "error": string, "detail": optional string }
- [ ] Handle validation errors (422) and internal errors (500)

### 6. Security Basics
- [ ] Enable CORS with allowed origins from environment
- [ ] Set up HTTPS in production (via reverse proxy, not in code)
- [ ] For MVP, we skip authentication to keep it simple and free (no user management)

### 7. Testing
- [ ] Write unit tests for Gemini service (mocking the API)
- [ ] Write integration tests for the API endpoint
- [ ] Test video processing with sample base64 video strings
- [ ] Test error cases (invalid input, API failure)

### 8. Documentation
- [ ] Enable FastAPI's automatic Swagger UI (available at /docs)
- [ ] Add descriptions to endpoints and models
- [ ] Create a simple README with setup and usage instructions

### 9. Deployment Preparation
- [ ] Create Dockerfile for containerization (optional for MVP, but good practice)
    - Use python:3.11-slim base
    - Copy requirements.txt and install dependencies
    - Copy source code
    - Expose port 8000
    - Command to run uvicorn
- [ ] Create docker-compose.yml for easy local development (optional)

### 10. Code Quality
- [ ] Set up Black for code formatting
- [ ] Set up Ruff or Flake8 for linting
- [ ] Set up MyPy for type checking
- [ ] Add pre-commit hooks (optional)

## Notes for MVP
- We are not implementing user authentication to keep it simple and free.
- We are not using a database for MVP; we can store nothing or use in-memory if needed for state (but the MVP is stateless per request).
- We are using the Gemini API's free tier for cost-free operation.
- The frontend will send base64-encoded video segments (2-3 seconds) to the backend.
- The backend will process the video with Gemini and return the recognized meaning and confidence.
- We assume the frontend will handle the UI for capturing video and displaying results.

## Post-MVP Considerations (for future)
- Add user authentication and database (PostgreSQL) for persisting users and conversations.
- Implement refresh tokens and role-based access.
- Add conversation history and message storage.
- Implement personal mode and sequential reconstruction.
- Add context-aware communication and multilingual support.
- Add confidence handling and virtual anchor visualization (frontend).
- Deploy to production with proper scaling and monitoring.