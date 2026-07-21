@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Santidade - Publicar no GitHub Pages

echo ================================================
echo   SANTIDADE - publicar atualizacao no GitHub
echo ================================================
echo.
echo  Envia a pasta public/ para a branch gh-pages,
echo  que e o que o GitHub Pages serve.
echo.

git add -A
git commit -m "Atualiza app"
git push origin main

echo.
echo  Publicando no GitHub Pages...
git subtree push --prefix public origin gh-pages

echo.
echo  Pronto. Em 1-2 minutos a atualizacao estara no ar em:
echo    https://robsonfulaneti-lgtm.github.io/santidade/
echo.
echo  No celular o app se atualiza sozinho: abra, feche
echo  e abra de novo (o service worker troca de versao).
echo.
pause
