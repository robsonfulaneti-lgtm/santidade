@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Santidade - Inicializador

echo ================================================
echo   SANTIDADE - iniciando servidor e tunel HTTPS
echo ================================================
echo.

start "Santidade - Servidor" cmd /k "node server.js"
timeout /t 2 >nul
start "Santidade - Tunel HTTPS" cmd /k "cloudflared.exe tunnel --url http://localhost:5173"

echo.
echo  Duas janelas foram abertas:
echo   1) Servidor   (deixe aberta)
echo   2) Tunel HTTPS - a URL https://...trycloudflare.com aparece nela
echo.
echo  Copie essa URL e abra no celular.
echo  Para parar o app, feche as duas janelas.
echo.
echo  ---------------------------------------------------------------
echo  Se o endereco .trycloudflare.com nao abrir no celular
echo  (as vezes o servico fica instavel), use o plano B:
echo.
echo     iniciar-alternativo.bat
echo.
echo  ---------------------------------------------------------------
echo.
pause
