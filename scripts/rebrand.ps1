# ShieldDocs Sign - Rebranding Script
# Run this after cloning Documenso to apply ShieldDocs branding

param(
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Continue"

Write-Host "ShieldDocs Sign - Rebranding Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "DRY RUN MODE - No files will be modified" -ForegroundColor Yellow
    Write-Host ""
}

# File extensions to process
$Extensions = @("*.ts", "*.tsx", "*.js", "*.jsx", "*.json", "*.md", "*.html", "*.css", "*.env*")

# Directories to skip
$SkipDirs = @("node_modules", ".git", "dist", ".next", ".turbo", "coverage")

# Replacements to make
$Replacements = @(
    @{ Find = "Documenso"; Replace = "ShieldDocs Sign" },
    @{ Find = "documenso.com"; Replace = "shielddocs.io" },
    @{ Find = "support@documenso"; Replace = "support@shielddocs" },
    @{ Find = "hello@documenso"; Replace = "hello@shielddocs" },
    @{ Find = "The Open Source DocuSign Alternative"; Replace = "Enterprise E-Signatures for Trust Centers" },
    @{ Find = "Open Signing Infrastructure"; Replace = "Secure Signing Infrastructure" }
)

$TotalChanges = 0

# Process each extension
foreach ($ext in $Extensions) {
    Write-Host "Processing $ext files..." -ForegroundColor Yellow
    
    $files = Get-ChildItem -Path . -Filter $ext -Recurse -File -ErrorAction SilentlyContinue | Where-Object {
        $skip = $false
        foreach ($dir in $SkipDirs) {
            if ($_.FullName -like "*\$dir\*") {
                $skip = $true
                break
            }
        }
        -not $skip
    }
    
    foreach ($file in $files) {
        try {
            $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
            if (-not $content) { continue }
            
            $modified = $false
            $newContent = $content
            
            foreach ($r in $Replacements) {
                if ($newContent.Contains($r.Find)) {
                    $newContent = $newContent.Replace($r.Find, $r.Replace)
                    $modified = $true
                }
            }
            
            if ($modified) {
                $TotalChanges++
                Write-Host "  Updated: $($file.Name)" -ForegroundColor Gray
                
                if (-not $DryRun) {
                    Set-Content -Path $file.FullName -Value $newContent -NoNewline -ErrorAction Stop
                }
            }
        }
        catch {
            Write-Host "  Error processing $($file.Name): $_" -ForegroundColor Red
        }
    }
}

# Update package.json specifics
Write-Host ""
Write-Host "Updating package.json files..." -ForegroundColor Yellow

$packageFiles = Get-ChildItem -Path . -Filter "package.json" -Recurse -File | Where-Object {
    -not ($_.FullName -like "*\node_modules\*")
}

foreach ($pkg in $packageFiles) {
    try {
        $content = Get-Content $pkg.FullName -Raw
        $modified = $false
        
        # Update author and repository
        if ($content -like '*"author"*documenso*' -or $content -like '*"repository"*documenso*') {
            $content = $content -replace '"author":\s*"[^"]*documenso[^"]*"', '"author": "ShieldDocs <support@shielddocs.io>"'
            $content = $content -replace 'github.com/documenso', 'github.com/shielddocs'
            $modified = $true
        }
        
        if ($modified -and -not $DryRun) {
            Set-Content -Path $pkg.FullName -Value $content -NoNewline
            Write-Host "  Updated: $($pkg.Name) in $($pkg.DirectoryName)" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "  Error: $_" -ForegroundColor Red
    }
}

# Summary
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Rebranding Complete!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total files updated: $TotalChanges" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Add logo files to apps/remix/public/"
Write-Host "  2. Update favicon.ico"
Write-Host "  3. Review and update legal pages"
Write-Host "  4. Run: npm install"
Write-Host "  5. Run: npm run build"
Write-Host ""

if ($DryRun) {
    Write-Host "This was a DRY RUN. Run without -DryRun to apply changes." -ForegroundColor Yellow
}
