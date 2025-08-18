@echo off
echo Compressing videos for GitHub...
echo This requires FFmpeg to be installed

REM Create compressed folder
if not exist "assets\compressed" mkdir "assets\compressed"

REM Compress videos to under 25MB each
ffmpeg -i "assets\trading (1).mp4" -vcodec libx264 -crf 28 -preset medium "assets\compressed\trading (1).mp4"
ffmpeg -i "assets\trading (2).mp4" -vcodec libx264 -crf 30 -preset medium "assets\compressed\trading (2).mp4"
ffmpeg -i "assets\trading (3).mp4" -vcodec libx264 -crf 28 -preset medium "assets\compressed\trading (3).mp4"
ffmpeg -i "assets\trading (4).mp4" -vcodec libx264 -crf 28 -preset medium "assets\compressed\trading (4).mp4"
ffmpeg -i "assets\tradind 5.mp4" -vcodec libx264 -crf 28 -preset medium "assets\compressed\tradind 5.mp4"
ffmpeg -i "assets\educational.mp4" -vcodec libx264 -crf 26 -preset medium "assets\compressed\educational.mp4"
ffmpeg -i "assets\educational (2).mp4" -vcodec libx264 -crf 28 -preset medium "assets\compressed\educational (2).mp4"
ffmpeg -i "assets\motion graphic (1).mp4" -vcodec libx264 -crf 26 -preset medium "assets\compressed\motion graphic (1).mp4"
ffmpeg -i "assets\motion graphic (2).mp4" -vcodec libx264 -crf 26 -preset medium "assets\compressed\motion graphic (2).mp4"
ffmpeg -i "assets\motion graphic (3).mp4" -vcodec libx264 -crf 26 -preset medium "assets\compressed\motion graphic (3).mp4"
ffmpeg -i "assets\sub vdo.mp4" -vcodec libx264 -crf 26 -preset medium "assets\compressed\sub vdo.mp4"

echo Compression complete! Use compressed videos for GitHub.
pause
