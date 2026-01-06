@echo off
echo ===================================================
echo   Starting Spatial Temporal Crime Intelligence
echo ===================================================

echo.
echo [1/2] Launching Backend Server (FastAPI)...
start "Backend Server" cmd /k "uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"

echo.
echo [2/2] Launching Frontend Client (Vite)...
start "Frontend Client" cmd /k "cd frontend && npm run dev"

echo.
echo ===================================================
echo   System is starting up...
echo   Backend: http://localhost:8000
echo   Frontend: http://localhost:5173 (usually)
echo ===================================================
echo.
pause
