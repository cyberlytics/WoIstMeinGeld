Start-Process powershell { docker-compose up --build --force-recreate -d }
Set-Location ./backend
../wait-for-it.sh localhost:3306 -t 15 -- yarn serve
Set-Location ../frontend
yarn start
