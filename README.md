# 🛡️ ShieldSign

**Enterprise E-Signatures Built for Security**

ShieldSign is a white-labeled fork of [Documenso](https://github.com/documenso/documenso) (v2.1.0), customized for the ShieldSign platform. It provides legally-binding electronic signatures integrated with your security documentation workflow.

[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](LICENSE)

---

## 🎯 Overview

ShieldSign is an AGPL-3.0 licensed fork of [Documenso](https://github.com/documenso/documenso), providing:

- **Custom Branding** - Configurable color scheme and branding
- **Enterprise Features** - Team management, audit logs, webhooks
- **Cloud Ready** - Optimized for cloud infrastructure deployment
- **API Access** - Full REST API and webhook integrations

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 14+
- Docker (optional, for development)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/KatalystDigital/shieldsign-core.git
cd shieldsign-core

# Copy environment template
cp .env.example .env.local

# Install dependencies
npm install

# Start development database (requires Docker)
npm run dx:up

# Run database migrations
npm run prisma:migrate-dev

# Seed the database
npm run prisma:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Environment Variables

Key environment variables to configure:

```env
# Database
NEXT_PRIVATE_DATABASE_URL=postgresql://user:password@localhost:5432/shieldsign

# App URLs
NEXT_PUBLIC_WEBAPP_URL=http://localhost:3000

# Email (SMTP)
NEXT_PRIVATE_SMTP_HOST=smtp.example.com
NEXT_PRIVATE_SMTP_PORT=587
NEXT_PRIVATE_SMTP_USERNAME=your-username
NEXT_PRIVATE_SMTP_PASSWORD=your-password
NEXT_PRIVATE_SMTP_FROM_ADDRESS=noreply@your-domain.com
NEXT_PRIVATE_SMTP_FROM_NAME=ShieldSign
```

See `.env.example` for all available options.

## 🏗️ Project Structure

```
shieldsign-core/
├── apps/
│   ├── remix/              # Main web application (React Router)
│   ├── documentation/      # Documentation site
│   └── openpage-api/       # Public API
├── packages/
│   ├── prisma/            # Database schema & migrations
│   ├── lib/               # Shared library code
│   ├── email/             # Email templates
│   ├── trpc/              # tRPC API router
│   ├── ui/                # UI components
│   └── signing/           # PDF signing logic
├── branding/              # ShieldSign branding assets
│   ├── colors.css         # Color definitions
│   ├── tailwind-colors.js # Tailwind configuration
│   └── logo/              # Logo assets (add your files here)
├── docker/                # Docker configuration
│   ├── Dockerfile
│   └── docker-compose.yml
└── scripts/
    └── rebrand.ps1        # Rebranding script
```

## 🐳 Docker Deployment

### Build the Image

```bash
docker build -t shieldsign-sign:latest -f docker/Dockerfile .
```

### Run with Docker Compose

```bash
cd docker
docker-compose up -d
```

### Azure Container Apps

See [Azure Deployment Guide](docs/azure-deployment.md) for deploying to Azure Container Apps.

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format

# Generate Prisma client
npm run prisma:generate

# Create database migration
npm run prisma:migrate-dev

# Run database migrations (production)
npm run prisma:migrate-deploy

# Seed database
npm run prisma:seed
```

## 🔗 Integration Options

ShieldSign can integrate with your applications via:

1. **Webhook Events** - Document signing events trigger webhooks
2. **REST API** - Create and manage documents programmatically
3. **OAuth/OIDC** - Support for external authentication providers

### Webhook Events

- `DOCUMENT_CREATED` - New document uploaded
- `DOCUMENT_SENT` - Document sent for signing
- `DOCUMENT_SIGNED` - Recipient signed the document
- `DOCUMENT_COMPLETED` - All signatures collected
- `DOCUMENT_CANCELLED` - Document cancelled
- `DOCUMENT_REJECTED` - Document rejected by recipient

## 📚 API Documentation

API documentation is available at `/api/v1/openapi` when running the application.

Key endpoints:

- `POST /api/v1/documents` - Create a document
- `GET /api/v1/documents/{id}` - Get document details
- `POST /api/v1/documents/{id}/send` - Send for signing
- `GET /api/v1/templates` - List templates

## 🎨 Customization

### Branding

Update files in the `branding/` directory:

1. **Colors**: Edit `branding/colors.css`
2. **Tailwind**: Edit `branding/tailwind-colors.js`
3. **Logos**: Add files to `branding/logo/`
4. **Constants**: Edit `branding/app-constants.ts`

### Legal Pages

Update legal documents:

- `branding/legal/terms.md` - Terms of Service
- `branding/legal/privacy.md` - Privacy Policy

## 🤝 Attribution

ShieldSign is based on [Documenso](https://github.com/documenso/documenso) v2.1.0, an open-source document signing platform licensed under AGPL-3.0.

We gratefully acknowledge the Documenso team for their excellent work in creating the foundation for this project. See [NOTICE.md](NOTICE.md) for full attribution details.

## 📄 License

This project is licensed under the [AGPL-3.0 License](LICENSE).

---

**ShieldSign** - Open Source E-Signature Platform

- 📦 Repository: [github.com/KatalystDigital/shieldsign-core](https://github.com/KatalystDigital/shieldsign-core)
- 📄 License: [AGPL-3.0](LICENSE)
