# Next.js Canary Test Project

A modern full-stack web application built with Next.js 15 (canary), React 19, TypeScript, Prisma, and MongoDB. This project demonstrates advanced Next.js features including experimental caching, React Compiler integration, and Material-UI 6+ components.

## 🚀 Tech Stack

### Core Framework
- **Next.js** 15.6.0-canary.51 with Turbopack
- **React** 19.2.0
- **TypeScript** 5.9.3
- **Node.js** (Windows environment)

### UI & Styling
- **Material-UI (MUI)** v6+ - Primary component library
- **Tailwind CSS** v4+ - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Framer Motion** - Animation library
- **Lucide React** & **Tabler Icons** - Icon libraries

### Database & ORM
- **Prisma** 6.16.3 - Type-safe database ORM
- **MongoDB** - NoSQL database

### State Management
- **React Query (TanStack Query)** - Server state management
- **Zustand** - Client state management
- **Redux Persist** - State persistence

### Forms & Validation
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Other Notable Libraries
- **Recharts** - Data visualization
- **AG Grid** - Advanced data tables
- **Three.js** - 3D graphics
- **Axios** - HTTP client

## 📁 Project Structure

```
canarytest/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── filter/            # Filter functionality
│   └── ...
├── components/            # Reusable React components
│   ├── ui/               # UI primitives
│   └── ...
├── constants/            # Application constants
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── models/              # TypeScript type definitions
├── prisma/              # Prisma schema and migrations
├── server/              # Server-side logic
└── validators/          # Zod validation schemas
```


## ⚙️ Installation

```bash
# Install dependencies (with legacy peer deps for compatibility)
npm install --legacy-peer-deps

# Or use the alias
npm run il
```

The `postinstall` script will automatically run `prisma generate` after installation.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_mongodb_connection_string"
NODE_ENV="development"
```

### Important Configuration Fixes

#### 1. Prisma Binary Targets

The `schema.prisma` file includes a critical configuration for deployment compatibility:

```prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}
```

**Why this is needed:**
- `native` - For local development
- `rhel-openssl-3.0.x` - For deployment on RHEL-based systems or certain cloud platforms (Vercel, AWS Lambda, etc.)

#### 2. Next.js Output File Tracing

The `next.config.ts` includes a critical fix for Prisma deployment:

```typescript
outputFileTracingIncludes: {
  '/api/**/*': ['./node_modules/.prisma/client/**/*'],
  '/*': ['./node_modules/.prisma/client/**/*'],
}
```

**Why this is needed:**
- Next.js uses output file tracing to determine which files to include in the production build
- Without this configuration, Prisma client files may not be included in the deployment bundle
- This ensures all Prisma-generated files are properly traced and included for API routes and pages
- This is especially critical for serverless deployments (Vercel, AWS Lambda, etc.)

### Next.js Experimental Features

The project uses several experimental Next.js features:

```typescript
experimental: {
  useCache: true,                  // Enable caching
  clientSegmentCache: true,        // Client-side segment caching
  cacheComponents: true,           // Component-level caching
}
reactCompiler: true,               // Enable React Compiler in production
```

## 🛠️ Development

```bash
# Development with Turbopack (recommended)
npm run dev

# Development without Turbopack
npm run dev2

# Generate Prisma Client
npm run update-prisma

# Push Prisma schema to database
npm run push-prisma

# Lint code
npm run lint

# Check code formatting
npm run prettier-check
```

## 🏗️ Build & Deployment

```bash
# Full build (includes Prisma generation and database push)
npm run build

# Build without Prisma steps
npm run build2

# Build without linting
npm run build-nl

# Build with Turbopack
npm run build-turbo

# Debug Partial Prerendering
npm run build-debug-ppr

# Start production server
npm start
```

### Build Process

The default `build` script includes:
1. `npx prisma generate` - Generate Prisma Client
2. `npx prisma db push` - Push schema changes to database
3. `next build` - Build Next.js application

## 📝 Scripts Reference

| Script | Description |
|--------|-------------|
| `dev` | Start development server with Turbopack |
| `dev2` | Start development server without Turbopack |
| `il` | Install dependencies with legacy peer deps |
| `build` | Full production build with Prisma |
| `build2` | Build without Prisma steps |
| `build-nl` | Build without linting |
| `start` | Start production server |
| `lint` | Run ESLint |
| `push-prisma` | Push Prisma schema to database |
| `update-prisma` | Regenerate Prisma Client |

## 🚨 Common Issues & Solutions

### Prisma Client Not Found in Production

If you encounter "Cannot find module '@prisma/client'" in production:

1. Ensure `outputFileTracingIncludes` is configured in `next.config.ts`
2. Verify `binaryTargets` in `schema.prisma` includes your deployment platform
3. Run `npx prisma generate` before building

### Legacy Peer Dependencies

Some packages require `--legacy-peer-deps` flag due to React 19 compatibility. Use `npm run il` instead of `npm install`.

## 🔒 Database Indexes

The schema includes optimized indexes for common queries:

- Subscriptions by approval status, signed status, and date
- Bill dues by subscription, payment status, and due date
- Favorites by entity type and date
- User profiles by email

## 📦 Key Dependencies

- **@mui/material** ^7.3.4 - Material-UI components
- **@prisma/client** ^6.16.3 - Database ORM
- **@tanstack/react-query** ^5.90.2 - Data fetching
- **next** 15.6.0-canary.51 - React framework
- **react** 19.2.0 - UI library
- **zod** ^3.25.67 - Schema validation

## 🎨 UI Component Guidelines

- Use **MUI 6+** for primary components (functional React)
- Radix UI for headless primitives
- Tailwind CSS for utility styling
- Custom components in `components/ui/`

## 📄 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a test/development project. Please follow the existing code structure and conventions when making changes.

---

**Note:** This project uses Next.js canary builds and experimental features. Be aware that APIs may change between versions.

