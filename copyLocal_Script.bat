:: set "source=u:\MyDocuments\00_MyStuff\MSTR Visualizations\Development\EmptyVis\EmptyVis"
set "source=%~dp0\EmptyVis"

set "destination=c:\Program Files\MicroStrategy\Workstation\Code\plugins\EmptyVis"

robocopy /mir "%source%" "%destination%"

start "C:\Program Files\MicroStrategy\Workstation\Workstation.exe" "%~dp0DemoEmpty.mstr"

exit /b