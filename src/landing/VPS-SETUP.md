# ✅ MOVE Landing Page Deployment Guide
> Deployed to: https://moveai.ahammouch.me
> VPS: 185.5.54.48

---

## 🚀 One-time VPS Setup

Run these commands once on your VPS to prepare for deployment:

```bash
# SSH into your VPS
ssh root@185.5.54.48 -p 22

# Create web directory
mkdir -p /var/www/moveai
chown -R www-data:www-data /var/www/moveai
chmod -R 755 /var/www/moveai

# Install nginx if not already installed
apt update && apt install -y nginx certbot python3-certbot-nginx

# Create nginx configuration
cat > /etc/nginx/sites-available/moveai << 'EOF'
server {
    listen 80;
    server_name moveai.ahammouch.me;
    root /var/www/moveai;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/moveai /etc/nginx/sites-enabled/

# Test nginx config
nginx -t

# Reload nginx
systemctl reload nginx

# Get SSL certificate
certbot --nginx -d moveai.ahammouch.me --non-interactive --agree-tos --email your-email@example.com
```

---

## 🔐 GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

| Secret Name | Value |
|---|---|
| `VPS_HOST` | `185.5.54.48` |
| `VPS_USERNAME` | `root` |
| `VPS_PASSWORD` | Your VPS root password |
| `VPS_PORT` | `22` |

---

## 📤 Manual Deployment (alternative to CI/CD)

```bash
cd src/landing

# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

---

## ✅ Deployment Workflow

1. **Push code to main branch**
2. GitHub Actions automatically:
   - Installs dependencies
   - Builds production bundle
   - Deploys `dist/` folder to `/var/www/moveai/` on your VPS
3. Site is live at `https://moveai.ahammouch.me`

---

## 🔍 Verify Deployment

```bash
# Check if site is up
curl -I https://moveai.ahammouch.me

# Check nginx status
systemctl status nginx

# View deployment logs
tail -f /var/log/nginx/access.log
```
