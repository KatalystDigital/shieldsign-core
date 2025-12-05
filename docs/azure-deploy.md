# ShieldSign Azure Deployment Guide

This guide covers deploying ShieldSign to Microsoft Azure.

## Prerequisites

- Azure subscription
- Azure CLI installed and configured
- Docker installed locally
- PostgreSQL database (Azure Database for PostgreSQL recommended)
- Azure Blob Storage account
- SMTP service (SendGrid, Azure Communication Services, or similar)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Azure Cloud                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │ Azure Container  │  │ Azure Database   │  │ Azure Blob    │ │
│  │ Apps / AKS       │  │ for PostgreSQL   │  │ Storage       │ │
│  │                  │  │                  │  │               │ │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │ ┌───────────┐ │ │
│  │  │ ShieldSign │◄─┼──┼──┤  Database  │  │  │ │ Documents │ │ │
│  │  │    App     │  │  │  └────────────┘  │  │ └───────────┘ │ │
│  │  └────────────┘  │  │                  │  │               │ │
│  └──────────────────┘  └──────────────────┘  └───────────────┘ │
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │ Azure Key Vault  │  │ SendGrid / Azure │                    │
│  │ (Secrets)        │  │ Communication    │                    │
│  └──────────────────┘  └──────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

## Step 1: Create Azure Resources

### 1.1 Create Resource Group

```bash
az group create --name shieldsign-rg --location eastus
```

### 1.2 Create PostgreSQL Database

```bash
az postgres flexible-server create \
  --resource-group shieldsign-rg \
  --name shieldsign-db \
  --location eastus \
  --admin-user shieldsign \
  --admin-password <secure-password> \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 15

# Create database
az postgres flexible-server db create \
  --resource-group shieldsign-rg \
  --server-name shieldsign-db \
  --database-name shieldsign
```

### 1.3 Create Azure Blob Storage

```bash
az storage account create \
  --name shieldsignstorage \
  --resource-group shieldsign-rg \
  --location eastus \
  --sku Standard_LRS

az storage container create \
  --account-name shieldsignstorage \
  --name documents \
  --auth-mode login
```

### 1.4 Create Azure Container Registry

```bash
az acr create \
  --resource-group shieldsign-rg \
  --name shieldsignacr \
  --sku Basic
```

## Step 2: Build and Push Docker Image

### 2.1 Login to ACR

```bash
az acr login --name shieldsignacr
```

### 2.2 Build and Push

```bash
# Build image
docker build -t shieldsignacr.azurecr.io/shieldsign:latest -f docker/Dockerfile .

# Push to ACR
docker push shieldsignacr.azurecr.io/shieldsign:latest
```

## Step 3: Deploy to Azure Container Apps

### 3.1 Create Container Apps Environment

```bash
az containerapp env create \
  --name shieldsign-env \
  --resource-group shieldsign-rg \
  --location eastus
```

### 3.2 Deploy Container App

```bash
az containerapp create \
  --name shieldsign-app \
  --resource-group shieldsign-rg \
  --environment shieldsign-env \
  --image shieldsignacr.azurecr.io/shieldsign:latest \
  --target-port 3000 \
  --ingress external \
  --registry-server shieldsignacr.azurecr.io \
  --cpu 1 \
  --memory 2Gi \
  --min-replicas 1 \
  --max-replicas 5 \
  --env-vars \
    SHIELDSIGN_APP_URL=https://shieldsign.io \
    SHIELDSIGN_API_URL=https://api.shieldsign.io \
    NEXT_PUBLIC_WEBAPP_URL=https://shieldsign.io \
    NEXT_PRIVATE_DATABASE_URL=secretref:database-url \
    NEXT_PRIVATE_ENCRYPTION_KEY=secretref:encryption-key \
    NEXT_PUBLIC_UPLOAD_TRANSPORT=s3 \
    AZURE_STORAGE_ACCOUNT=shieldsignstorage
```

## Step 4: Environment Variables

Create a `.env.production` file with these variables:

```env
# App URLs
SHIELDSIGN_APP_URL=https://shieldsign.io
SHIELDSIGN_API_URL=https://api.shieldsign.io
NEXT_PUBLIC_WEBAPP_URL=https://shieldsign.io

# Database
SHIELDSIGN_DB_URL=postgresql://shieldsign:<password>@shieldsign-db.postgres.database.azure.com:5432/shieldsign?sslmode=require
NEXT_PRIVATE_DATABASE_URL=${SHIELDSIGN_DB_URL}
NEXT_PRIVATE_DIRECT_DATABASE_URL=${SHIELDSIGN_DB_URL}

# Authentication
NEXTAUTH_SECRET=<generate-32-char-secret>
NEXT_PRIVATE_ENCRYPTION_KEY=<generate-32-char-key>
NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY=<generate-32-char-key>

# Azure Storage
AZURE_STORAGE_ACCOUNT=shieldsignstorage
AZURE_STORAGE_ACCESS_KEY=<storage-access-key>
NEXT_PUBLIC_UPLOAD_TRANSPORT=s3
NEXT_PRIVATE_UPLOAD_ENDPOINT=https://shieldsignstorage.blob.core.windows.net
NEXT_PRIVATE_UPLOAD_BUCKET=documents
NEXT_PRIVATE_UPLOAD_REGION=eastus
NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID=${AZURE_STORAGE_ACCOUNT}
NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY=${AZURE_STORAGE_ACCESS_KEY}

# SMTP (SendGrid example)
NEXT_PRIVATE_SMTP_TRANSPORT=smtp-auth
NEXT_PRIVATE_SMTP_HOST=smtp.sendgrid.net
NEXT_PRIVATE_SMTP_PORT=587
NEXT_PRIVATE_SMTP_USERNAME=apikey
NEXT_PRIVATE_SMTP_PASSWORD=<sendgrid-api-key>
NEXT_PRIVATE_SMTP_FROM_NAME=ShieldSign
NEXT_PRIVATE_SMTP_FROM_ADDRESS=noreply@example.com

# OAuth (optional)
NEXT_PRIVATE_GOOGLE_CLIENT_ID=<google-client-id>
NEXT_PRIVATE_GOOGLE_CLIENT_SECRET=<google-client-secret>
NEXT_PRIVATE_MICROSOFT_CLIENT_ID=<microsoft-client-id>
NEXT_PRIVATE_MICROSOFT_CLIENT_SECRET=<microsoft-client-secret>

# Feature Flags
NEXT_PUBLIC_FEATURE_BILLING_ENABLED=false
NEXT_PUBLIC_SUPPORT_EMAIL=support@example.com
```

## Step 5: Database Migration

Run migrations after deployment:

```bash
# Connect to container
az containerapp exec \
  --name shieldsign-app \
  --resource-group shieldsign-rg \
  --command "npx prisma migrate deploy --schema packages/prisma/schema.prisma"
```

## Step 6: Custom Domain Setup

### 6.1 Add Custom Domain

```bash
az containerapp hostname add \
  --name shieldsign-app \
  --resource-group shieldsign-rg \
  --hostname shieldsign.io

az containerapp hostname bind \
  --name shieldsign-app \
  --resource-group shieldsign-rg \
  --hostname shieldsign.io \
  --environment shieldsign-env
```

### 6.2 Configure DNS

Add these DNS records:
- `A` record: Point `@` to Container App IP
- `TXT` record: Add verification record from Azure
- `CNAME` record: Point `www` to Container App URL

## Scaling Configuration

### Auto-scaling Rules

```bash
az containerapp update \
  --name shieldsign-app \
  --resource-group shieldsign-rg \
  --scale-rule-name cpu-scaling \
  --scale-rule-type http \
  --scale-rule-http-concurrency 100
```

## Monitoring

### Enable Application Insights

```bash
az monitor app-insights component create \
  --app shieldsign-insights \
  --location eastus \
  --resource-group shieldsign-rg

# Get instrumentation key and add to env vars
APPLICATIONINSIGHTS_CONNECTION_STRING=<connection-string>
```

## Security Checklist

- [ ] Enable Azure Key Vault for secrets
- [ ] Configure Azure DDoS Protection
- [ ] Enable Azure Firewall rules
- [ ] Set up Azure Backup for database
- [ ] Configure SSL/TLS certificates
- [ ] Enable audit logging
- [ ] Set up Azure Monitor alerts

## Troubleshooting

### View Logs

```bash
az containerapp logs show \
  --name shieldsign-app \
  --resource-group shieldsign-rg \
  --follow
```

### Restart Application

```bash
az containerapp revision restart \
  --name shieldsign-app \
  --resource-group shieldsign-rg \
  --revision <revision-name>
```

## Cost Optimization

Estimated monthly costs (Basic tier):
- Container Apps: ~$50-100/month
- PostgreSQL (B1ms): ~$30/month
- Blob Storage: ~$5-20/month
- Total: ~$85-150/month (varies by usage)

---

For support, contact: support@example.com
