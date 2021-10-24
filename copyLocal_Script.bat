:: set "source=u:\MyDocuments\00_MyStuff\MSTR Visualizations\Development\AZoomableGantt\AZoomableGantt"
set "source=%~dp0\AZoomableGantt"

set "destination=c:\Program Files\MicroStrategy\Workstation\Code\plugins\AZoomableGantt"

robocopy /mir "%source%" "%destination%"

start "C:\Program Files\MicroStrategy\Workstation\Workstation.exe" "%~dp0DemoZoomableGantt.mstr"

exit /b