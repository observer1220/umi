# Auto deploy to Github by shell script .\deploy.sh
git add .
git commit -m "update at $(date "+%Y-%m-%d %H:%M:%S")"
git push origin main
echo "deploy success"