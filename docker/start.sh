#!/bin/sh

# 🚀 Starting ShieldSign...
printf "🚀 Starting ShieldSign...\n\n"

# 🔐 Check certificate configuration
printf "🔐 Checking certificate configuration...\n"

CERT_PATH="${NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH:-/opt/shieldsign/cert.p12}"

if [ -f "$CERT_PATH" ] && [ -r "$CERT_PATH" ]; then
    printf "✅ Certificate file found and readable - document signing is ready!\n"
else
    printf "⚠️  Certificate not found or not readable\n"
    printf "💡 Tip: ShieldSign will still start, but document signing will be unavailable\n"
    printf "🔧 Check: http://localhost:3000/api/certificate-status for detailed status\n"
fi

printf "\n📚 Useful Links:\n"
printf "📖 Documentation: https://github.com/KatalystDigital/shieldsign-core/blob/main/apps/documentation/pages/users/index.mdx\n"
printf "🐳 Self-hosting guide: https://github.com/KatalystDigital/shieldsign-core/blob/main/apps/documentation/pages/developers/self-hosting/index.mdx\n"
printf "🔐 Certificate setup: https://github.com/KatalystDigital/shieldsign-core/blob/main/apps/documentation/pages/developers/self-hosting/signing-certificate.mdx\n"
printf "🏥 Health check: http://localhost:3000/api/health\n"
printf "📊 Certificate status: http://localhost:3000/api/certificate-status\n"
printf "👥 Community: https://github.com/KatalystDigital/shieldsign-core/discussions\n\n"

printf "🗄️  Running database migrations...\n"
npx prisma migrate deploy --schema ../../packages/prisma/schema.prisma

printf "🌟 Starting ShieldSign server...\n"
HOSTNAME=0.0.0.0 node build/server/main.js
