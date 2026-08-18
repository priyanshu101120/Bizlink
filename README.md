<div align="center">

# 🔗 BizLink

### B2B Business Networking & Inventory Platform

**A full-stack SaaS platform connecting wholesalers and retailers — with a custom Node.js/Express backend, JWT-based authentication, and real-time inventory sync over WebSockets.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-bizlink--two.vercel.app-black?style=for-the-badge)](https://bizlink-two.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

</div>

---

## 🎬 Demo

![BizLink Demo](./screenshots/demo.gif)

## 📸 Screenshots

| Wholesaler Dashboard                                            | Retailer Dashboard                                           |
| ----------------------------------------------------------------| -------------------------------------------------------------|
| ![Wholesaler Dashboard](./screenshots/wholesaler-dashboard.png) | ![Retailer Dashboard](./screenshots/retailer-dashboard.png)  |

| Wholesaler Inventory                                            | Retailer Inventory                                           |
| ------------------------------------------------------------ ---| -------------------------------------------------------------|
| ![Wholesaler Inventory](./screenshots/wholesaler-inventory.png) | ![Retailer Inventory](./screenshots/retailer-inventory.png)  |

| Login / Sign Up                    |
| ----------------------------------- |
| ![Login](./screenshots/login.png)   |

---

## 🎯 What is BizLink?

BizLink is a **full-stack B2B inventory and networking platform** built for the supply chain — where wholesalers and retailers manage stock, connect with each other, and see inventory changes reflected live, without refreshing the page.

The entire backend — authentication, authorization, database schema, and realtime layer — was **designed and built from scratch** (no BaaS/backend-as-a-service), giving full control over the API, security model, and data flow.

> **The Problem:** Wholesalers and retailers juggle spreadsheets, WhatsApp messages, and manual reconciliation to track inventory. BizLink eliminates all of that with a connected, real-time dashboard for both sides of the relationship.

---

## ✨ Key Features

### 🔐 Custom Authentication & Authorization

- Email/password auth built on a **custom Express backend** — no third-party auth provider
- **JWT access + refresh token** pattern, stored in **httpOnly, secure cookies** (never exposed to client-side JS)
- Automatic silent token refresh via an Axios interceptor
- **Role-based route protection** (`WHOLESALER` / `RETAILER`) enforced at the middleware level on every request
- Change password and permanent account deletion, both fully wired end-to-end

### ⚡ Real-Time Inventory Sync (Socket.io)

- A **Socket.io** layer sits alongside the REST API, authenticated via the same JWT cookie
- Retailers join a room per connected wholesaler; any product create/update **broadcasts instantly** to every connected retailer
- **Low-stock alerts** are pushed live the moment a wholesaler's inventory crosses a threshold — no polling

### 🤝 Wholesaler ↔ Retailer Connections

- Retailers and wholesalers can discover and connect with each other
- Once connected, a retailer's dashboard aggregates live inventory from every wholesaler they're linked to
- Connections can be removed by either side at any time

### 📊 Inventory Management

- Full **CRUD operations** for products, scoped to the authenticated wholesaler
- Live stock-level tracking with in-stock / low-stock / out-of-stock states
- Clean dashboard with at-a-glance metrics (total products, total stock, inventory value)

### 🎨 Modern, Responsive UI

- Built with **Shadcn UI** on top of **Tailwind CSS**
- Animated login/signup panel (Framer Motion) with in-form role selection
- Fully responsive across desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer            | Technology                          | Purpose                                                   |
| ----------------- | ------------------------------------ | ---------------------------------------------------------- |
| **Frontend**       | Next.js 15 (App Router)              | Full-stack React framework, SSR                            |
| **Backend**        | Node.js + Express + TypeScript       | REST API, business logic, custom auth                      |
| **Database**       | PostgreSQL (Neon, serverless)        | Primary relational data store                              |
| **ORM**            | Prisma                               | Type-safe schema, migrations, queries                      |
| **Auth**           | JWT (access + refresh) + httpOnly cookies | Stateless, secure session management                   |
| **Realtime**       | Socket.io                            | Live product updates & low-stock notifications              |
| **Validation**     | Zod                                  | Runtime request validation on every endpoint                |
| **Styling**        | Tailwind CSS + Shadcn UI             | Utility-first CSS, accessible components                    |
| **Animation**      | Framer Motion                        | Login/signup panel transitions                               |
| **Frontend Deploy**| Vercel                               | CI/CD and hosting for the Next.js app                        |
| **Backend Deploy** | Render                               | Hosting for the Express API + Socket.io server                |

---

## 🏗️ Architecture Highlights

```
BizLink
├── Frontend (Next.js, deployed on Vercel)
│   ├── /app/login              → Animated login/signup with in-form role selection
│   ├── /app/wholesaler-dashboard → Inventory CRUD, connections, realtime updates
│   ├── /app/retailer-dashboard   → Aggregated live inventory, connections
│   ├── /hooks                    → useAuth, useWholesaler, useRetailer
│   └── /lib                      → Axios API client (with refresh interceptor), Socket.io client
│
├── Backend (Node.js/Express/TypeScript, deployed on Render)
│   ├── /controllers              → HTTP layer (auth, product, connection, user)
│   ├── /services                 → Business logic
│   ├── /repositories              → Prisma data access layer
│   ├── /middlewares               → JWT auth guard, role guard, Zod validation, error handler
│   ├── /socket                    → Socket.io server, JWT-authenticated handshake, room-based broadcast
│   └── /prisma                    → Schema (User, Product, Connection) with cascade deletes
│
└── Database
    └── PostgreSQL (Neon)          → Managed via Prisma migrations
```

### 🔐 Auth Flow

1. On login/register, the backend issues a short-lived **access token** (15 min) and a longer-lived **refresh token** (7 days), both set as httpOnly cookies.
2. Every protected route runs through a `requireAuth` middleware that verifies the access token; `requireRole` further restricts routes to `WHOLESALER` or `RETAILER`.
3. On a `401`, the frontend's Axios interceptor silently calls `/auth/refresh` and retries the original request — the user never notices a token expiring.
4. Logging out, changing password, or deleting the account clears both cookies and revokes the stored refresh token server-side.

### ⚡ Realtime Flow

1. On connect, the Socket.io server verifies the same access-token cookie used by the REST API (shared auth, no separate token issuance).
2. Wholesalers join a room keyed by their own user ID; retailers join the rooms of every wholesaler they're connected to.
3. Any product create/update on the backend emits `product:update` (and `product:low-stock` when the quantity crosses a threshold) to that room — every connected retailer's dashboard updates instantly.

---

## 🚀 Getting Started

This project has two repositories: the **frontend** (this repo) and the [**backend**](#) *(link your backend repo here)*.

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. a free [Neon](https://neon.tech) project)

### 1. Clone both repositories

```bash
git clone https://github.com/priyanshu101120/Bizlink.git
git clone https://github.com/priyanshu101120/bizlink-backend.git
```

### 2. Set up the backend

```bash
cd bizlink-backend
npm install
cp .env.example .env
```

Fill in `.env`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@host/db
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CLIENT_URL=http://localhost:3000
```

Push the schema and start the server:

```bash
npx prisma db push
npm run dev
```

### 3. Set up the frontend

```bash
cd Bizlink
npm install
```

Add to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

**Frontend**
```
bizlink/
├── app/                    # Next.js App Router
│   ├── login/               # Animated login/signup
│   ├── wholesaler-dashboard/
│   ├── retailer-dashboard/
│   └── layout.tsx
├── components/              # Reusable UI (incl. Shadcn UI)
├── hooks/                   # useAuth, useWholesaler, useRetailer
├── lib/                     # api.ts (axios), socket.ts (Socket.io client)
└── public/
```

**Backend**
```
bizlink-backend/
├── src/
│   ├── config/               # env, Prisma client
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middlewares/
│   ├── routes/
│   ├── socket/                # Socket.io server + auth
│   ├── utils/                 # JWT, cookies
│   └── validators/            # Zod schemas
└── prisma/
    └── schema.prisma
```

---

## 🧠 What I Learned

Building BizLink's backend from scratch — rather than relying on a BaaS — as a **solo developer** taught me:

- **Designing a JWT auth system** end-to-end: access/refresh token rotation, httpOnly cookie security, and handling silent token refresh on the client
- **Cookie scoping pitfalls** — `path`, `sameSite`, and `secure` attributes behave very differently across `localhost` vs. cross-domain production (Vercel ↔ Render), and getting this wrong silently breaks auth
- **Socket.io authentication** — reusing the same JWT cookie for WebSocket handshakes instead of issuing separate realtime tokens
- **Prisma schema design** — modeling relations with `onDelete: Cascade` so account deletion cleanly removes dependent data
- **Production deployment debugging** — diagnosing devDependency-stripping build failures, TypeScript version/module-resolution mismatches, and CORS origin mismatches across separate frontend/backend hosts
- **Full-stack ownership** — schema design, REST API design, realtime infrastructure, frontend UX, and production deployment — all as one person

---

## 🔮 Roadmap

- [ ] Order & reorder workflow between retailers and wholesalers
- [ ] Per-product configurable low-stock threshold
- [ ] Bulk product import/export via CSV
- [ ] Analytics dashboard (top products, retailer engagement)
- [ ] Product images
- [ ] Mobile app (React Native / Expo)

---

## 👤 Author

**Priyanshu Singh** — Built this end-to-end as a solo developer.

[![GitHub](https://img.shields.io/badge/GitHub-priyanshu101120-181717?style=for-the-badge&logo=github)](https://github.com/priyanshu101120)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Priyanshu_Singh-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/priyanshu-singh-452459360/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**⭐ If you found this project interesting, please give it a star!**

_Built with ❤️ using Next.js, Node.js/Express, Prisma, and Socket.io_

</div>