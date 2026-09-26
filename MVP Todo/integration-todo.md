# Integration MVP Todo List

## API Contract Definition

### Endpoint: Process ISL Sign
- **URL**: `POST /process-isl`
- **Base URL**: Backend server (e.g., `http://localhost:8000` for local development)
- **Request Body** (JSON):
    ```json
    {
      "video_base64": "string (base64-encoded video segment, MP4 or WebM format)",
      "context": "string (optional, for future use - can be empty string or omitted for MVP)"
    }
    ```
- **Successful Response** (HTTP 200):
    ```json
    {
      "recognized_meaning": "string (the English meaning of the recognized ISL sign)",
      "confidence": "string (one of: 'high', 'medium', 'low')",
      "processing_time_ms": "integer (time taken to process the request in milliseconds)"
    }
    ```
- **Error Responses**:
    - **400 Bad Request**: Invalid input (e.g., missing or malformed `video_base64`)
        ```json
        {
          "error": "string (error message)",
          "detail": "string (optional, more details about the error)"
        }
        ```
    - **500 Internal Server Error**: Backend processing error (e.g., Gemini API failure)
        ```json
        {
          "error": "string (error message)",
          "detail": "string (optional, more details about the error)"
        }
        ```

### Health Check Endpoint (Optional but Recommended)
- **URL**: `GET /health`
- **Response** (HTTP 200):
    ```json
    {
      "status": "string (e.g., 'ok')",
      "timestamp": "string (ISO 8601 timestamp)"
    }
    ```

## Integration Steps

### 1. Backend Setup
- [ ] Ensure backend is running and accessible at the agreed URL (default: `http://localhost:8000`)
- [ ] Verify that the `/process-isl` endpoint is available and accepting POST requests
- [ ] Confirm that the backend returns the expected JSON format for both success and error cases
- [ ] Check that the backend handles base64 video data correctly (decodes and sends to Gemini)
- [ ] Test the backend with a sample base64 video string (can be a short clip of a known ISL sign)
- [ ] Ensure CORS is configured to allow requests from the frontend's origin (for local development, this might be `http://localhost:5173` or similar, depending on the frontend dev server)

### 2. Frontend Setup
- [ ] Ensure frontend is set up to make HTTP requests to the backend URL
- [ ] Implement a function to capture video from the webcam and convert it to a base64 string
    - Use the MediaRecorder API to record a short segment (2-3 seconds)
    - Convert the recorded Blob to a base64 string
- [ ] Implement the API call to `/process-isl` using `fetch` or `axios`
    - Send a POST request with the JSON body as defined above
    - Handle the response (both success and error)
    - Update the UI based on the response (show recognized meaning, confidence, etc.)
- [ ] Handle loading states during the API call
- [ ] Display error messages to the user in a user-friendly way
- [ ] Test the full flow: capture video -> send to backend -> receive and display result

### 3. Joint Testing
- [ ] Start both frontend and backend servers
- [ ] From the frontend, grant camera permissions when prompted
- [ ] Perform a sign in front of the camera and trigger the processing
- [ ] Verify that the backend receives the request, processes it, and returns a response
- [ ] Check that the frontend correctly displays the recognized meaning and confidence
- [ ] Test error cases:
    - Deny camera permissions and ensure frontend handles it gracefully
    - Simulate backend downtime and ensure frontend shows an appropriate error message
    - Send malformed data (if possible) and check backend returns 400
- [ ] Test with different ISL signs (within the MVP scope) to verify basic recognition works
- [ ] Measure end-to-end latency (capture to display) and ensure it's acceptable for MVP

### 4. Environment and Configuration
- [ ] Frontend should know the backend URL (can be hardcoded for MVP, or set via environment variable)
    - For local development, frontend might use `http://localhost:8000` or `http://127.0.0.1:8000`
    - Consider using a `.env` file in the frontend to set `REACT_APP_BACKEND_URL` (if using Create React App) or `VITE_BACKEND_URL` (if using Vite)
- [ ] Backend should have the Gemini API key set in its environment (`.env` file)
- [ ] Ensure both frontend and backend are using compatible video formats (both should agree on MP4/WebM and base64 encoding)
- [ ] Check that the backend does not have any hardcoded origins that block the frontend's requests (CORS)

### 5. Documentation for Integration
- [ ] Create a simple integration guide that includes:
    - How to start the backend
    - How to start the frontend
    - The API contract (as above)
    - Troubleshooting tips (e.g., "If you see a CORS error, check the backend's CORS middleware")
    - Expected behavior for MVP

## Post-Integration Checks
- [ ] Verify that the MVP is free to run (only relies on Gemini's free tier and open-source tools)
- [ ] Ensure no unnecessary costs are incurred (e.g., no paid services beyond the free Gemini API)
- [ ] Confirm that the frontend and backend can be run independently by different people
- [ ] Document any known limitations of the MVP (e.g., only recognizes a limited set of signs, confidence is not yet calibrated, etc.)

## Sign-Off Criteria for MVP Integration
- [ ] Frontend can successfully capture video and send it to the backend
- [ ] Backend processes the video with Gemini and returns a recognized meaning and confidence
- [ ] Frontend displays the result to the user in a clear way
- [ ] Error cases are handled gracefully on both ends
- [ ] The integration works repeatedly without manual intervention (e.g., no need to restart servers between tests)
- [ ] The MVP meets the goal of recognizing basic ISL signs and a few one-handed mode signs (as defined in the MVP scope)