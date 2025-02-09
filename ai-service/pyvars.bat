REM @echo off
REM 
REM rem Ensure Python and Scripts are in the PATH temporarily
REM set "PATH=%USERPROFILE%\AppData\Local\Programs\Python\Python39;%USERPROFILE%\AppData\Local\Programs\Python\Python39\Scripts;%PATH%"
REM 
REM setlocal enabledelayedexpansion
REM pushd "%~dp0"
REM 
REM rem Figure out the Python version.
REM set print_version=python -c "import sys; print(sys.version + ' (' + sys.platform + ')')"
REM for /F "usebackq delims=" %%v in (`%print_version%`) do set version=%%v
REM 
REM rem Print message.
REM echo Your environment has been set up for using Python: !version!
REM 
REM popd
REM endlocal
REM 
REM rem If we're in the Python directory, change to the user's home dir.
REM if "%CD%\"=="%~dp0" cd /d "%HOMEDRIVE%%HOMEPATH%"