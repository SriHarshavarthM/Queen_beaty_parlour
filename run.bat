@echo off
title Glamour Studio - Beauty Parlour Website
color 0A

echo.
echo ========================================
echo    Glamour Studio - Setup ^& Run
echo    Queen Beauty Parlour Website
echo ========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Node.js found: 
node --version
echo.

:: Install Backend Dependencies
echo [STEP 1/4] Installing backend dependencies...
cd backend
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Failed to install backend dependencies!
        pause
        exit /b 1
    )
) else (
    echo [INFO] Backend dependencies already installed.
)
cd ..
echo.

:: Install Frontend Dependencies
echo [STEP 2/4] Installing frontend dependencies...
cd frontend
if not exist "node_modules" (
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Failed to install frontend dependencies!
        pause
        exit /b 1
    )
) else (
    echo [INFO] Frontend dependencies already installed.
)
cd ..
echo.

echo ========================================
echo    Starting Servers...
echo ========================================
echo.

:: Start Backend Server
echo [STEP 3/4] Starting Backend Server on port 3001...
start "Glamour Studio - Backend" cmd /k "cd backend && npm run dev"

:: Wait for backend to initialize
timeout /t 3 /nobreak >nul

:: Start Frontend Server
echo [STEP 4/4] Starting Frontend Server on port 8080...
start "Glamour Studio - Frontend" cmd /k "cd frontend && npm run dev"

:: Wait for frontend to initialize
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo    Glamour Studio is Running!
echo ========================================
echo.
echo    Website:    http://localhost:8080
echo    Admin:      http://localhost:8080/admin
echo    Backend:    http://localhost:3001
echo.
echo    Admin Password: glamour2024
echo.
echo ========================================
echo.

:: Open browser
echo Opening website in browser...
start http://localhost:8080

echo.
echo Press any key to close this window...
echo (Servers will continue running in separate windows)
pause >nul
