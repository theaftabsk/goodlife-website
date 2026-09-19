# GOOD LIFE SUTRA — CLIENT HANDOVER & TECHNICAL DEPLOYMENT DOCUMENTATION

**Prepared for**: Good Life Sutra Pvt. Ltd. (Attention: Harish Team)  
**Engaged Project**: Enterprise B2B Commerce Operating Partner Website & Standalone Admin CMS  
**Repository**: [https://github.com/theaftabsk/goodlife-website.git](https://github.com/theaftabsk/goodlife-website.git)  
**Version**: 5.2.0 (NestJS 10 + PostgreSQL 16 + Prisma ORM + Next.js 16 App Router)  
**Handover Status**: Complete & Validated  

---

## 📋 Executive Scope Compliance Matrix

Below is the item-by-item reconciliation against the requirements received from the GoodLife team:

| # | GoodLife Requirement | Delivered? | Delivery Details & Technical Implementation |
|---|---|:---:|---|
| **1** | **Full Source Code & Git Repository Ownership** | **YES** | Complete Git repository with 100% commit history, branch structure, decoupled microservices, and environment templates. Zero third-party proprietary vendor lock-in. |
| **2** | **Reusable CMS Blocks** | **YES** | Custom Admin CMS with dedicated management modules for **Blogs / Insights**, **Case Studies**, **FAQs**, and **Author Profiles** with rich text editors, status toggles, and metadata controls. |
| **3** | **Editable Global Header / Footer / Contact Details** | **YES** | Real-time CMS editing of company name, corporate email, phone, registered office, CIN, GSTIN, WhatsApp badge, announcement banner, pre-footer CTA strip, and social links saved to PostgreSQL database. |
| **4** | **Media / Document Library** | **YES** | Asset library with upload/preview, format filtering, byte size counters, direct CDN/R2 URL generators, coupled with granular per-page SEO Meta Title, Description, Canonical URL, and robots indexing controls. |
| **5** | **Future Landing-Page Capability** | **PARTIAL (As Agreed)** | Modular landing page assembly system utilizing predefined, reusable sections (**Hero**, **Features Grid**, **Proof Metrics**, **CTA Strip**, **FAQ Accordion**, **Diagnostic Lead Form**). *(Clarification: Full drag-and-drop canvas builder is excluded as confirmed in the scope document).* |
| **6** | **301 / 302 Redirect Capability** | **YES** | Database-backed URL redirect engine with live HTTP 301/302 status codes, real-time click hit counters, duplicate prevention, and automated Edge Next.js Middleware routing. |
| **7** | **Written Deployment Documentation** | **YES** | Comprehensive deployment instructions provided below for Local Development, Vercel Serverless, and Ubuntu Linux Dedicated/VPS production with PM2, Nginx, SSL, and PostgreSQL. |
| **8** | **Bug Response-Time Commitment** | **YES** | **45 Days** of complimentary post-launch bug-fix support with an outer limit response commitment of **12 Office Hours**. |

---

## 🏛️ System Architecture Overview

The GoodLife platform is built on an enterprise 3-tier decoupled architecture:

```
GOODLIFE/
├── website/     # Next.js 16 Public B2B Commerce Storefront (Port 3000)
├── admin/       # Next.js 16 Standalone Admin CMS Command Center (Port 3001)
├── backend/     # NestJS Enterprise API + Prisma ORM + PostgreSQL (Port 5000)
└── DEPLOYMENT.md # Official Handover & Technical Deployment Documentation
```

### Key Technical Specs:
- **Frontend / CMS**: Next.js 16.2.10 (App Router, Turbopack, React 19, Server Components)
- **Backend API**: NestJS 10.3 (TypeScript, RESTful architecture, Modular Service-Controller pattern)
- **Database**: PostgreSQL 16 managed via Prisma ORM 5.10
- **Redirects Middleware**: Next.js Edge Middleware with dynamic `/api/v1/redirects/resolve` resolution
- **Tracking & Analytics**: Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Search Console (GSC) verification injected dynamically from PostgreSQL

---

## 🗄️ 1. Database Architecture & Setup

### Database Credentials (.env)
```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/goodlife_db?schema=public"
PORT=5000
NODE_ENV=production
```

### PostgreSQL Database Initialization
```bash
cd backend

# Install dependencies
npm install

# Push Prisma schema directly to PostgreSQL
npx prisma db push

# (Optional) Seed initial operating platforms, brands, and categories
npm run db:seed
```

### Prisma Schema Models:
1. `PlatformLogo`: Marketplaces and B2B wholesale platforms (Amazon, Flipkart, IndiaMART, Blinkit, etc.).
2. `BrandLogo`: Brand partner logos (Crompton, Havells, USHA, Kenstar, etc.).
3. `ProductCategory`: Commerce product verticals and seasonal subcategories.
4. `SiteConfiguration`: Header, footer, corporate registrations, announcement banner, GA4, GTM, and GSC credentials.
5. `Redirect`: Permanent (301) and temporary (302) URL redirection mappings with hit counters.
6. `DiagnosticLead`: 10-step enterprise diagnostic submissions with fit score, revenue band, GMV, and challenges.
7. `CrmIntegration` & `CrmAuditLog`: CRM endpoint settings, auto-sync toggle, and dispatch audit logs.
8. `Article` & `User`: Insights/blogs and author team accounts.

---

## 🚀 2. Local Development Quickstart

To run all 3 applications simultaneously in development mode:

### Terminal 1: Backend API (Port 5000)
```bash
cd backend
npm install
npm run dev
# Running at: http://localhost:5000
```

### Terminal 2: Public Website (Port 3000)
```bash
cd website
npm install
npm run dev
# Running at: http://localhost:3000
```

### Terminal 3: Admin CMS (Port 3001)
```bash
cd admin
npm install
npm run dev
# Running at: http://localhost:3001
```

---

## 🧭 3. Admin CMS Features & Capabilities (`http://localhost:3001/admin`)

| Admin Module | Route | Operational Capability |
|---|---|---|
| **Overview Dashboard** | `/admin` | Real-time lead count, top inbound categories, revenue band telemetry, and recent inquiry feed. |
| **Diagnostic Leads** | `/admin/leads` | Full inspection of all 10 diagnostic answers, fit score (80-99%), GMV tier, CRM sync status, and one-click CSV export. |
| **CRM Integration** | `/admin/crm-integration` | Configure any CRM platform (Zoho, HubSpot, Salesforce, LeadSquared, Custom Webhook) with live test connection, auto-sync toggle, and PostgreSQL audit log. |
| **Platforms Manager** | `/admin/platforms` | Add, reorder, and toggle visibility of 15+ marketplace & wholesale logos with custom SVG rendering. |
| **Brands Manager** | `/admin/brands` | Manage 23+ brand partner logos across categories with direct SVG preview. |
| **Product Categories** | `/admin/categories` | Manage 7 major categories and seasonal subcategories (Fans, Coolers, Water Heaters, etc.). |
| **Insights / Blogs** | `/admin/insights` | Reusable rich article publisher with status toggles (Draft / Published), reading time, tags, and author assignment. |
| **Case Studies** | `/admin/case-studies` | Deep-dive OEM case study publisher with challenge, action taken, verified stats, and client testimonials. |
| **FAQs Library** | `/admin/faqs` | Manage question/answer pairs categorized by capability with automated FAQ Schema markup. |
| **301 Redirects Suite** | `/admin/redirects` | Add and monitor 301 permanent and 302 temporary redirection rules with real-time hit counts and live verification. |
| **SEO & Google Analytics** | `/admin/seo` | Configure per-route Meta Titles, Descriptions, Canonical links, XML Sitemap generator, plus direct fields for GA4 Measurement ID, GTM Container ID, and Search Console verification. |
| **Global Header & Footer** | `/admin/header-footer` | Live editing of company contacts, GSTIN, CIN, WhatsApp number, announcement banner, and pre-footer CTA strip. |
| **Media & Assets** | `/admin/media` | Media library with file size validation, MIME filtering, and image preview. |
| **Landing Pages** | `/admin/landing-pages` | Assemble new landing pages using modular reusable blocks (Hero, Features, Proof Stats, FAQ, CTA, Diagnostic Form). |
| **Author Profiles** | `/admin/authors` | Multi-user CMS author roles (Super Admin, Author & Editor, Content Specialist). |
| **Global Settings** | `/admin/settings` | SMTP email gateway credentials, live email test dispatch, GA4/GTM credentials, and full CMS JSON backup export. |

---

## 🌐 4. Production Deployment Guidelines

### Option A: Cloud / Serverless Deployment (Vercel + Managed PostgreSQL)
Recommended for instant global CDN edge distribution and zero-maintenance scaling.

1. **Database**: Provision a managed PostgreSQL instance (Supabase, Neon, AWS RDS, or Render).
2. **Backend API**:
   - Deploy `backend` to Render, Railway, AWS ECS, or DigitalOcean App Platform.
   - Configure environment variables: `DATABASE_URL`, `PORT=5000`, `NODE_ENV=production`.
   - Build command: `npm install && npx prisma db push && npm run build`.
   - Start command: `node dist/main.js`.
3. **Website & Admin on Vercel**:
   - Create Project 1 on Vercel: Set Root Directory to `website`, link custom domain `goodlifesutra.com`.
   - Create Project 2 on Vercel: Set Root Directory to `admin`, link custom domain `admin.goodlifesutra.com`.
   - Add environment variables in Vercel:
     - `NEXT_PUBLIC_BACKEND_URL`: `https://api.goodlifesutra.com`

---

### Option B: Linux VPS / Dedicated Server (Ubuntu 22.04 / 24.04 LTS)

#### Step 1: Install Node.js 20, PostgreSQL & PM2
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs postgresql postgresql-contrib nginx git

sudo npm install -g pm2
```

#### Step 2: Configure PostgreSQL Database
```bash
sudo -u postgres psql
CREATE DATABASE goodlife_db;
CREATE USER goodlife_user WITH ENCRYPTED PASSWORD 'StrongSecurePassword2026!';
GRANT ALL PRIVILEGES ON DATABASE goodlife_db TO goodlife_user;
\q
```

#### Step 3: Clone Repository & Build Applications
```bash
cd /var/www
git clone https://github.com/theaftabsk/goodlife-website.git
cd goodlife-website

# 1. Build Backend
cd backend
echo 'DATABASE_URL="postgresql://goodlife_user:StrongSecurePassword2026!@localhost:5432/goodlife_db?schema=public"' > .env
npm install
npx prisma db push
npm run build

# 2. Build Admin
cd ../admin
npm install
npm run build

# 3. Build Website
cd ../website
npm install
npm run build
```

#### Step 4: Process Management with PM2
```bash
cd /var/www/goodlife-website

# Start Backend API on Port 5000
pm2 start backend/dist/main.js --name "goodlife-backend"

# Start Admin CMS on Port 3001
pm2 start "npm --prefix admin run start" --name "goodlife-admin"

# Start Public Website on Port 3000
pm2 start "npm --prefix website run start" --name "goodlife-website"

# Save PM2 process list and configure automatic system startup
pm2 save
pm2 startup
```

#### Step 5: Nginx Reverse Proxy Configuration
Create `/etc/nginx/sites-available/goodlife`:
```nginx
# 1. Public Website
server {
    server_name goodlifesutra.com www.goodlifesutra.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 2. Admin CMS
server {
    server_name admin.goodlifesutra.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 3. Backend REST API
server {
    server_name api.goodlifesutra.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site and install free SSL certificate:
```bash
sudo ln -s /etc/nginx/sites-available/goodlife /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Install Let's Encrypt SSL
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d goodlifesutra.com -d www.goodlifesutra.com -d admin.goodlifesutra.com -d api.goodlifesutra.com
```

---

## 🛡️ 5. Post-Launch Bug Support Commitment

As agreed with the Harish team:
- **Duration**: **45 Days** of free bug-fix support following official go-live.
- **Response SLA**: Maximum outer limit of **12 Hours** within regular office hours.
- **Coverage**:
  - Resolution of any runtime or build issues.
  - Correction of unexpected layout or cross-browser styling discrepancies.
  - Rectification of database synchronization, edge redirection, or API communication faults.
  - Rectification of diagnostic lead submission or webhook dispatch failures.
- **Exclusions**: Creation of brand-new modules or features outside the confirmed project scope (such as open canvas drag-and-drop page builders).

---

## 📞 Support Contacts & Verification

- **Primary Repository**: `https://github.com/theaftabsk/goodlife-website.git`
- **Current Branch**: `main`
- **Build Status**: Verified 0 errors across TypeScript, Next.js, and NestJS build pipelines.
