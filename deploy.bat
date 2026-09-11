@echo off
title Deploy to Raghav Food Processing Machines (Production)
echo ========================================================
echo  Deploying to Raghav Food Processing Machines
echo  Target: https://raghavfoodprocessingmachines.com
echo ========================================================
echo.

node "%~dp0scripts\deploy.cjs" %*

echo.
echo Press any key to close this window...
pause >nul
