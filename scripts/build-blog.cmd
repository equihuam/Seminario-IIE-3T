@echo off
setlocal
rem RStudio custom build on Windows: use the verified project-local workflow.
pushd "%~dp0.." || exit /b 1
if not exist ".venv\Scripts\python.exe" (
  echo Falta .venv. Siga ENVIRONMENT.md para preparar Python.
  popd
  exit /b 1
)
".venv\Scripts\python.exe" "scripts\site.py" check
set "blog_build_status=%errorlevel%"
popd
exit /b %blog_build_status%
