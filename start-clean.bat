@echo off
echo Deteniendo procesos de Node existentes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Iniciando servidor...
cd /d "%~dp0"
npm run dev
