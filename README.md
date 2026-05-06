# Board Game Sales Web Application

A modern, full-stack e-commerce platform for selling board games, built with Next.js 14, TypeScript, and PostgreSQL.

## 🎯 Project Overview

This MVP enables customers to browse, search, and purchase board games online, with a complete admin dashboard for store management.

**Key Features**:
- Product catalog with advanced filtering (category, price, player count)
- Shopping cart and checkout with Stripe payment integration
- User authentication and order history
- Admin dashboard for product and order management
- Responsive design for mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe Checkout
- **Styling**: Tailwind CSS + Shadcn/ui
- **Deployment**: Vercel
- **Image Storage**: Cloudinary or Vercel Blob

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (local or Supabase/Vercel Postgres)
- Stripe account (test mode keys work for development)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd board-games-store
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and fill in the required values:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`: From your Stripe dashboard
- Other optional keys for email, image storage, etc.

### 4. Set up the database
```bash
# Run migrations
npx prisma migrate dev

# Seed the database with sample products
npx prisma db seed
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

See [PLAN.md](./PLAN.md) for detailed architecture and implementation roadmap.

```
├── prisma/              # Database schema and migrations
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable React components
│   ├── lib/            # Utility functions and clients
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
└── tests/              # Unit and E2E tests
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 Admin Access

The seed script creates a default admin user:
- **Email**: `admin@example.com`
- **Password**: `admin123`

⚠️ **Change this password in production!**

Access the admin dashboard at `/admin` after logging in.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Set up preview deployments for PRs
- Configure build and deployment settings
- Provide a production URL

### Database Setup for Production

Use Vercel Postgres or Supabase:
1. Provision a PostgreSQL database
2. Copy the connection string to `DATABASE_URL` in Vercel environment variables
3. Run migrations: `npx prisma migrate deploy`

## 📚 Documentation

- [Execution Plan](./PLAN.md) - Full roadmap, backlog, and architecture decisions
- [API Documentation](./docs/API.md) - API routes and endpoints (coming soon)
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute (coming soon)

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use Stripe test mode keys during development
- Rotate `NEXTAUTH_SECRET` for production
- Enable webhook signature verification for Stripe

## 🐛 Troubleshooting

### Database connection issues
- Ensure PostgreSQL is running locally or your cloud database is accessible
- Check `DATABASE_URL` format: `postgresql://user:password@host:port/database`

### Stripe webhook not working locally
- Use Stripe CLI to forward webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Regenerate Prisma Client: `npx prisma generate`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📞 Support

For issues or questions, please open a GitHub issue or contact the development team.

## 📄 License

[MIT License](./LICENSE) (or your preferred license)

---

**Built with ❤️ by the SprintPilot team**
