# ShieldSign - Complete Rebranding Script
# Converts from Documenso/ShieldDocs to ShieldSign

param(
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Continue"

Write-Host "ShieldSign - Complete Rebranding Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "DRY RUN MODE - No files will be modified" -ForegroundColor Yellow
    Write-Host ""
}

# File extensions to process
$Extensions = @("*.ts", "*.tsx", "*.js", "*.jsx", "*.json", "*.md", "*.html", "*.css", "*.yml", "*.yaml", "*.env*", "*.toml", "*.cjs", "*.mjs")

# Directories to skip
$SkipDirs = @("node_modules", ".git", "dist", ".next", ".turbo", "coverage", ".react-router", "build")

# Comprehensive replacements - ORDER MATTERS (more specific first)
$Replacements = @(
    # URLs and domains (most specific first)
    @{ Find = "https://docs.shielddocs.io"; Replace = "https://docs.shieldsign.io" },
    @{ Find = "https://shielddocs.io"; Replace = "https://shieldsign.io" },
    @{ Find = "https://documenso.com"; Replace = "https://shieldsign.io" },
    @{ Find = "https://documen.so"; Replace = "https://shieldsign.io" },
    @{ Find = "documenso.com"; Replace = "shieldsign.io" },
    @{ Find = "shielddocs.io"; Replace = "shieldsign.io" },
    @{ Find = "documen.so"; Replace = "shieldsign.io" },
    
    # Email addresses
    @{ Find = "support@shielddocs.io"; Replace = "support@shieldsign.io" },
    @{ Find = "support@shielddocs"; Replace = "support@shieldsign" },
    @{ Find = "support@documenso.com"; Replace = "support@shieldsign.io" },
    @{ Find = "support@documenso"; Replace = "support@shieldsign" },
    @{ Find = "hello@documenso.com"; Replace = "hello@shieldsign.io" },
    @{ Find = "hello@documenso"; Replace = "hello@shieldsign" },
    @{ Find = "noreply@shielddocs"; Replace = "noreply@shieldsign" },
    
    # Product names (specific variations first)
    @{ Find = "ShieldDocs Sign"; Replace = "ShieldSign" },
    @{ Find = "ShieldDocs Trust Center"; Replace = "ShieldSign" },
    @{ Find = "ShieldDocs"; Replace = "ShieldSign" },
    @{ Find = "shielddocs"; Replace = "shieldsign" },
    @{ Find = "SHIELDDOCS"; Replace = "SHIELDSIGN" },
    @{ Find = "Documenso"; Replace = "ShieldSign" },
    @{ Find = "documenso"; Replace = "shieldsign" },
    @{ Find = "DOCUMENSO"; Replace = "SHIELDSIGN" },
    
    # Taglines
    @{ Find = "The Open Source DocuSign Alternative"; Replace = "Enterprise E-Signatures Built for Security" },
    @{ Find = "Open Signing Infrastructure"; Replace = "Secure Signing Infrastructure" },
    @{ Find = "Enterprise E-Signatures for Trust Centers"; Replace = "Enterprise E-Signatures Built for Security" },
    
    # GitHub references (preserve for attribution)
    @{ Find = "github.com/shielddocs"; Replace = "github.com/shieldsign" },
    
    # CSS variable names
    @{ Find = "--shielddocs-"; Replace = "--shieldsign-" }
)

$TotalChanges = 0
$ModifiedFiles = @()

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
                $ModifiedFiles += $file.FullName
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

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rebranding Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total files updated: $TotalChanges" -ForegroundColor White
Write-Host ""

if ($DryRun) {
    Write-Host "This was a DRY RUN. Run without -DryRun to apply changes." -ForegroundColor Yellow
} else {
    Write-Host "Files have been modified. Review changes with: git diff" -ForegroundColor Green
}
