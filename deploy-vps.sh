#!/usr/bin/env bash
# ==============================================================================
# BrandOrbit / GoodLife — Automated Hostinger VPS Deployment Script
# Target Server: 187.127.150.133 (Ubuntu 24.04 / 26.04 LTS)
# Domains:
#   - Website:   brandorbit.tech / www.brandorbit.tech (Port 3000)
#   - Admin CMS: admin.brandorbit.tech (Port 3001)
#   - REST API:  api.brandorbit.tech (Port 5000)
# ==============================================================================

set -e

echo "🚀 [1/7] Updating system packages and installing prerequisites..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential nginx postgresql postgresql-contrib certbot python3-certbot-nginx

# Install Node.js 20 LTS
if ! command -v node &> /dev/null; then
  echo "📦 Installing Node.js 20 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
fi

# Install PM2 globally
sudo npm install -g pm2

echo "✅ Node version: $(node -v)"
echo "✅ NPM version: $(npm -v)"

# ------------------------------------------------------------------------------
# 2. Setup PostgreSQL
# ------------------------------------------------------------------------------
echo "🗄️ [2/7] Configuring PostgreSQL Database..."
sudo systemctl enable postgresql
sudo systemctl start postgresql

DB_NAME="goodlife_db"
DB_USER="goodlife_user"
DB_PASS="GoodLifeSecure2026!"

sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"

sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname = '$DB_USER'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"

sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
sudo -u postgres psql -d $DB_NAME -c "GRANT ALL ON SCHEMA public TO $DB_USER;"

echo "✅ PostgreSQL configured successfully."

# ------------------------------------------------------------------------------
# 3. Clone or Update Repository
# ------------------------------------------------------------------------------
echo "📂 [3/7] Setting up project directory in /var/www/goodlife..."
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www

if [ -d "/var/www/goodlife/.git" ]; then
  echo "🔄 Pulling latest changes from git..."
  cd /var/www/goodlife
  git pull origin main || true
else
  echo "📥 Cloning repository..."
  rm -rf /var/www/goodlife
  git clone https://github.com/theaftabsk/goodlife-website.git /var/www/goodlife
  cd /var/www/goodlife
fi

# ------------------------------------------------------------------------------
# 4. Build Backend API
# ------------------------------------------------------------------------------
echo "⚙️ [4/7] Building Backend API (Port 5000)..."
cd /var/www/goodlife/backend

cat <<EOT > .env
PORT=5000
NODE_ENV=production
DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}?schema=public"
JWT_SECRET="goodlife-super-secret-jwt-key-min-32-chars-2026"
JWT_REFRESH_SECRET="goodlife-refresh-secret-jwt-key-min-32-chars-2026"
CORS_ORIGIN="https://brandorbit.tech,https://www.brandorbit.tech,https://admin.brandorbit.tech,http://localhost:3000,http://localhost:3001"
EOT

npm install
npx prisma db push --accept-data-loss
npm run build

# ------------------------------------------------------------------------------
# 5. Build Public Website & Admin CMS
# ------------------------------------------------------------------------------
echo "🌐 [5/7] Building Public Website (Port 3000)..."
cd /var/www/goodlife/website

cat <<EOT > .env.production
NEXT_PUBLIC_API_URL="https://api.brandorbit.tech"
EOT

npm install
npm run build

echo "🛠️ [5/7] Building Admin CMS (Port 3001)..."
cd /var/www/goodlife/admin

cat <<EOT > .env.production
NEXT_PUBLIC_API_URL="https://api.brandorbit.tech"
NEXT_PUBLIC_ADMIN_URL="https://admin.brandorbit.tech"
EOT

npm install
npm run build

# ------------------------------------------------------------------------------
# 6. Process Management with PM2
# ------------------------------------------------------------------------------
echo "🔄 [6/7] Starting services with PM2..."
cd /var/www/goodlife

# Delete existing instances if already running
pm2 delete goodlife-backend 2>/dev/null || true
pm2 delete goodlife-website 2>/dev/null || true
pm2 delete goodlife-admin 2>/dev/null || true

# Start backend
pm2 start backend/dist/main.js --name "goodlife-backend"

# Start website
pm2 start "npm --prefix website run start -- -p 3000" --name "goodlife-website"

# Start admin
pm2 start "npm --prefix admin run start -- -p 3001" --name "goodlife-admin"

pm2 save
pm2 startup systemd -u $USER --hp $HOME || true

# ------------------------------------------------------------------------------
# 7. Configure Nginx Reverse Proxy
# ------------------------------------------------------------------------------
echo "🛡️ [7/7] Configuring Nginx Reverse Proxy..."

cat <<'EOT' | sudo tee /etc/nginx/sites-available/brandorbit > /dev/null
# 1. Main Website
server {
    listen 80;
    server_name brandorbit.tech www.brandorbit.tech;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# 2. Admin CMS
server {
    listen 80;
    server_name admin.brandorbit.tech;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# 3. Backend REST API
server {
    listen 80;
    server_name api.brandorbit.tech;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOT

sudo ln -sf /etc/nginx/sites-available/brandorbit /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "=========================================================================="
echo "🎉 DEPLOYMENT COMPLETE!"
echo "Website: https://brandorbit.tech"
echo "Admin:   https://admin.brandorbit.tech"
echo "API:     https://api.brandorbit.tech"
echo ""
echo "👉 To enable FREE SSL (HTTPS), run:"
echo "sudo certbot --nginx -d brandorbit.tech -d www.brandorbit.tech -d admin.brandorbit.tech -d api.brandorbit.tech --non-interactive --agree-tos -m goodlifeweb18@gmail.com"
echo "=========================================================================="
