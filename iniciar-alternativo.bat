@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Santidade - Inicializador (plano B: localtunnel)

echo ================================================
echo   SANTIDADE - servidor + tunel (localtunnel)
echo ================================================
echo.
echo  Use este quando o cloudflared estiver instavel.
echo.

start "Santidade - Servidor" cmd /k "node server.js"
timeout /t 2 >nul
start "Santidade - Tunel HTTPS" cmd /k "npx --yes localtunnel@2.0.2 --port 5173"

echo.
echo  Duas janelas foram abertas:
echo   1) Servidor   (deixe aberta)
echo   2) Tunel      - a URL https://...loca.lt aparece nela
echo.
echo  IMPORTANTE: na primeira visita o localtunnel mostra uma
echo  pagina de aviso pedindo uma senha ("Tunnel Password").
echo  A senha e o IP publico do seu PC, mostrado abaixo:
echo.
powershell -NoProfile -Command "try { Write-Host ('      SENHA: ' + (Invoke-RestMethod -Uri 'https://ipv4.icanhazip.com' -TimeoutSec 15).Trim()) } catch { Write-Host '      (nao consegui obter; veja em https://ipv4.icanhazip.com)' }"
echo.
echo  Digite a senha, clique em "Click to Submit" e o app abre.
echo.
pause
