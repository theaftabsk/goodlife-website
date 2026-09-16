# GOOD LIFE SUTRA — ENTERPRISE DEPLOYMENT & TECHNICAL DOCUMENTATION

**Prepared for**: Good Life Sutra Pvt. Ltd.  
**Version**: 5.0.0 (Enterprise NestJS + PostgreSQL + Next.js 16)  
**Handover Guarantee**: Full source code ownership & 45-day free bug-fix support commitment (within 12 office hours).

---

## 🏛️ System Architecture Summary

The Good Life Enterprise platform consists of 3 decoupled, independent applications:

```
GOODLIFE/
├── website/     # Next.js 16 Public Website (Port 3000)
├── admin/       # Next.js 16 Standalone Admin CMS (Port 3001)
├── backend/     # NestJS Enterprise API + PostgreSQL Prisma ORM (Port 5000)
└── DEPLOYMENT.md
```

---

## 🗄️ 1. Local PostgreSQL Database Setup

### Connection Credentials
- **Host**: `localhost`
- **Port**: `5432`
- **User**: `postgres`
- **Password**: `123456`
- **Database**: `goodlife_db`
- **Connection URL**: `postgresql://postgres:123456@localhost:5432/goodlife_db?schema=public`

### Database Sync & Seeding Commands
```bash
cd backend

# 1. Push schema to local PostgreSQL
npm run db:push

# 2. Seed database with 15 Platform logos, 23 Brand logos & 7 Categories
npm run db:seed

# 3. Open visual database manager (Prisma Studio)
npm run db:studio
```

---

## 🚀 2. Running Applications in Development

### Application 1: NestJS Backend API (Port 5000)
```bash
cd backend
npm install
npm run dev        # Development server with hot-reload
npm run build      # Compile TypeScript production bundle
npm run start:prod # Start production bundle
```
- API Base URL: `http://localhost:5000`
- Operating Platforms Endpoint: `http://localhost:5000/api/v1/platforms`
- Brand Logos Endpoint: `http://localhost:5000/api/v1/brands`
- Categories Endpoint: `http://localhost:5000/api/v1/categories`

### Application 2: Standalone Admin CMS (Port 3001)
```bash
cd admin
npm install
npm run dev        # Local Dev: http://localhost:3001
npm run build      # Production build check
npm run start      # Production server
```

### Application 3: Public Website (Port 3000)
```bash
cd website
npm install
npm run dev        # Local Dev: http://localhost:3000
npm run build      # Production prerender (31 static pages)
npm run start      # Production server
```

---

## 🧭 3. Admin CMS Features Guide (`http://localhost:3001/admin`)

| Module | Feature Description |
|:---|:---|
| **🌐 Platform Logos** | Full management for "Operating across India's leading platforms" (IndiaMART, TradeIndia, Industrybuying, Amazon, Flipkart, etc.). Add, edit SVG code, toggle active/inactive, reorder. |
| **🏷️ Brand Logos** | Full management for 23+ brands (Crompton, USHA, Havells, Hindware, Kenstar, Bajaj, Livpure, Luminus, Exide, etc.). Category filtering, SVG preview, active toggle. |
| **📦 Product Categories** | Management of 7 categories including Seasonal subcategories (Fans, Air Coolers, Water Heaters, Room Heaters), TV, Washing Machine, Chimney, etc. |
| **🧭 Header & Footer** | Editable corporate phone, email, registered office address, GSTIN, WhatsApp number, and header CTA button text. |
| **🔀 301 Redirects** | Add/manage 301 permanent and 302 temporary redirects with automatic click hit counting. |
| **📥 Diagnostic Leads** | Full view of 10-step Diagnostic Tool submissions with one-click CSV export. |
| **📝 Insights & FAQs** | Create and publish articles and schema-enabled FAQ items. |

---

## 🌐 4. Production Deployment Guidelines

### Option A: Vercel (Recommended for Website & Admin)
1. Link GitHub repository to Vercel.
2. Set Root Directory to `website` for the public site.
3. Deploy a second project with Root Directory `admin` on a subdomain (e.g., `admin.goodlifesutra.com`).

### Option B: VPS / Dedicated Server (Ubuntu Linux with PM2 + Nginx)
```bash
# Install Node.js & PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Clone & Build All Apps
cd /var/www/goodlife
cd backend && npm install && npm run build && npm run db:push
cd ../admin && npm install && npm run build
cd ../website && npm install && npm run build

# Start with PM2
pm2 start backend/dist/main.js --name "goodlife-backend"
pm2 start "npm --prefix admin run start" --name "goodlife-admin"
pm2 start "npm --prefix website run start" --name "goodlife-website"
pm2 save
pm2 startup
```

---

## 🛡️ 5. Post-Launch Bug Support Terms
- **Duration**: 45 Days of complimentary post-launch bug-fix support.
- **Response Commitment**: Within **12 office hours** (outer limit).
- **Scope**: Covers fixing errors in delivered features, layout responsiveness, database syncing, and form workflows.
