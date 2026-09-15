#!/bin/bash
set -e

echo "🔨 Building production bundle..."
npm run build

echo "🚀 Deploying to moveai.ahammouch.me..."
scp -P 22 -r dist/* root@185.5.54.48:/var/www/moveai/

echo "✅ Deployment complete!"
echo "🌐 Visit: https://moveai.ahammouch.me"
