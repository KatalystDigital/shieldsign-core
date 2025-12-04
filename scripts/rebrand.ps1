# ShieldDocs Sign - Rebranding Script
# Run this after cloning Documenso to apply ShieldDocs branding

param(
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

$ErrorActionPreference = "Stop"

# Configuration
$OldBrand = @{
    Name = "Documenso"
    NameLower = "documenso"
    Domain = "documenso.com"
    Email = "support@documenso.com"
    TagLine = "The Open Source DocuSign Alternative"
}

$NewBrand = @{
    Name = "ShieldDocs Sign"
    NameShort = "ShieldDocs"
    NameLower = "shielddocs"
    Domain = "shielddocs.io"
    SignDomain = "sign.shielddocs.io"
    Email = "support@shielddocs.io"
    TagLine = "Enterprise E-Signatures for Trust Centers"
    PrimaryColor = "#14b8a6"  # Teal-500
    PrimaryColorDark = "#0d9488"  # Teal-600
}

Write-Host "🛡️  ShieldDocs Sign - Rebranding Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "⚠️  DRY RUN MODE - No files will be modified" -ForegroundColor Yellow
    Write-Host ""
}

# Function to replace text in files
function Update-FileContent {
    param(
        [string]$Path,
        [string]$Find,
        [string]$Replace
    )
    
    if (Test-Path $Path) {
        $content = Get-Content $Path -Raw -ErrorAction SilentlyContinue
        if ($content -and $content.Contains($Find)) {
            if ($Verbose) {
                Write-Host "  📝 Updating: $Path" -ForegroundColor Gray
            }
            if (-not $DryRun) {
                $content = $content.Replace($Find, $Replace)
                Set-Content $Path $content -NoNewline
            }
            return $true
        }
    }
    return $false
}

# Function to process multiple files with pattern
function Update-FilesInDirectory {
    param(
        [string]$Directory,
        [string]$Filter,
        [string]$Find,
        [string]$Replace
    )
    
    $count = 0
    if (Test-Path $Directory) {
        Get-ChildItem -Path $Directory -Filter $Filter -Recurse -File | ForEach-Object {
            if (Update-FileContent -Path $_.FullName -Find $Find -Replace $Replace) {
                $count++
            }
        }
    }
    return $count
}

# ============================================
# Step 1: Update App Constants
# ============================================
Write-Host "📦 Step 1: Updating app constants..." -ForegroundColor Green

$appConstantsPath = "apps/remix/src/constants/app.ts"
if (Test-Path $appConstantsPath) {
    $constantsContent = @"
export const APP_NAME = 'ShieldDocs Sign';
export const APP_DESCRIPTION = 'Enterprise E-Signatures for Trust Centers';
export const APP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || 'https://sign.shielddocs.io';
export const MARKETING_URL = process.env.NEXT_PUBLIC_MARKETING_URL || 'https://shielddocs.io';
export const SUPPORT_EMAIL = 'support@shielddocs.io';
export const IS_SHIELDDOCS = true;
"@
    if (-not $DryRun) {
        Set-Content $appConstantsPath $constantsContent
    }
    Write-Host "  ✅ Updated app constants" -ForegroundColor Gray
}

# ============================================
# Step 2: Update Package Names
# ============================================
Write-Host "📦 Step 2: Updating package.json files..." -ForegroundColor Green

$packageJsonFiles = @(
    "package.json",
    "apps/remix/package.json",
    "packages/ui/package.json",
    "packages/email/package.json",
    "packages/lib/package.json",
    "packages/prisma/package.json"
)

foreach ($pkg in $packageJsonFiles) {
    if (Test-Path $pkg) {
        $count = 0
        $count += [int](Update-FileContent -Path $pkg -Find '"documenso"' -Replace '"shielddocs-sign"')
        $count += [int](Update-FileContent -Path $pkg -Find '"@documenso/' -Replace '"@shielddocs/')
        $count += [int](Update-FileContent -Path $pkg -Find '"Documenso"' -Replace '"ShieldDocs Sign"')
        if ($count -gt 0) {
            Write-Host "  ✅ Updated: $pkg" -ForegroundColor Gray
        }
    }
}

# ============================================
# Step 3: Update Tailwind Colors
# ============================================
Write-Host "🎨 Step 3: Updating brand colors..." -ForegroundColor Green

$tailwindConfigPath = "packages/ui/tailwind.config.ts"
if (Test-Path $tailwindConfigPath) {
    # Add ShieldDocs teal color as primary
    Update-FileContent -Path $tailwindConfigPath -Find "documenso:" -Replace "shielddocs:"
    Write-Host "  ✅ Updated Tailwind config" -ForegroundColor Gray
}

# ============================================
# Step 4: Update Email Templates
# ============================================
Write-Host "📧 Step 4: Updating email templates..." -ForegroundColor Green

$emailDir = "packages/email"
if (Test-Path $emailDir) {
    $emailCount = 0
    $emailCount += Update-FilesInDirectory -Directory $emailDir -Filter "*.tsx" -Find "Documenso" -Replace "ShieldDocs Sign"
    $emailCount += Update-FilesInDirectory -Directory $emailDir -Filter "*.tsx" -Find "documenso.com" -Replace "shielddocs.io"
    $emailCount += Update-FilesInDirectory -Directory $emailDir -Filter "*.tsx" -Find "support@documenso.com" -Replace "support@shielddocs.io"
    Write-Host "  ✅ Updated $emailCount email template files" -ForegroundColor Gray
}

# ============================================
# Step 5: Update UI Components
# ============================================
Write-Host "🖼️  Step 5: Updating UI components..." -ForegroundColor Green

$uiDirs = @("apps/remix/src", "packages/ui/src")
foreach ($dir in $uiDirs) {
    if (Test-Path $dir) {
        $uiCount = 0
        $uiCount += Update-FilesInDirectory -Directory $dir -Filter "*.tsx" -Find "Documenso" -Replace "ShieldDocs Sign"
        $uiCount += Update-FilesInDirectory -Directory $dir -Filter "*.tsx" -Find "documenso" -Replace "shielddocs"
        $uiCount += Update-FilesInDirectory -Directory $dir -Filter "*.ts" -Find "Documenso" -Replace "ShieldDocs Sign"
        Write-Host "  ✅ Updated $uiCount UI files in $dir" -ForegroundColor Gray
    }
}

# ============================================
# Step 6: Update Metadata & SEO
# ============================================
Write-Host "🔍 Step 6: Updating metadata and SEO..." -ForegroundColor Green

$metaFiles = @(
    "apps/remix/src/app/layout.tsx",
    "apps/remix/src/app/(dashboard)/layout.tsx",
    "apps/remix/src/app/(unauthenticated)/layout.tsx"
)

foreach ($meta in $metaFiles) {
    if (Test-Path $meta) {
        Update-FileContent -Path $meta -Find "Documenso" -Replace "ShieldDocs Sign"
        Update-FileContent -Path $meta -Find "The Open Source DocuSign Alternative" -Replace "Enterprise E-Signatures for Trust Centers"
        Write-Host "  ✅ Updated: $meta" -ForegroundColor Gray
    }
}

# ============================================
# Step 7: Update Environment Example
# ============================================
Write-Host "⚙️  Step 7: Updating environment example..." -ForegroundColor Green

$envExamplePath = ".env.example"
if (Test-Path $envExamplePath) {
    Update-FileContent -Path $envExamplePath -Find "documenso.com" -Replace "sign.shielddocs.io"
    Update-FileContent -Path $envExamplePath -Find "Documenso" -Replace "ShieldDocs Sign"
    Write-Host "  ✅ Updated .env.example" -ForegroundColor Gray
}

# ============================================
# Step 8: Update Docker Configuration
# ============================================
Write-Host "🐳 Step 8: Updating Docker configuration..." -ForegroundColor Green

$dockerFiles = @("docker/Dockerfile", "docker/docker-compose.yml", "docker/docker-compose.dev.yml")
foreach ($docker in $dockerFiles) {
    if (Test-Path $docker) {
        Update-FileContent -Path $docker -Find "documenso/documenso" -Replace "shielddocs/shielddocs-sign"
        Update-FileContent -Path $docker -Find "documenso:" -Replace "shielddocs-sign:"
        Write-Host "  ✅ Updated: $docker" -ForegroundColor Gray
    }
}

# ============================================
# Summary
# ============================================
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Rebranding Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Copy logo files to apps/remix/public/"
Write-Host "  2. Update favicon.ico"
Write-Host "  3. Review and update legal pages (Terms, Privacy)"
Write-Host "  4. Run 'npm install' to update dependencies"
Write-Host "  5. Run 'npm run build' to verify build"
Write-Host ""
Write-Host "Manual Review Recommended:" -ForegroundColor Yellow
Write-Host "  - apps/remix/public/ (logos, icons)"
Write-Host "  - packages/email/templates/ (email styling)"
Write-Host "  - apps/remix/src/app/(unauthenticated)/ (legal pages)"
Write-Host ""

if ($DryRun) {
    Write-Host "⚠️  This was a DRY RUN. Run without -DryRun to apply changes." -ForegroundColor Yellow
}
