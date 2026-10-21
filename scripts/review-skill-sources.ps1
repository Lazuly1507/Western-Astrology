$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
if (-not (Test-Path -LiteralPath (Join-Path $root 'scripts/review-skill-sources.ps1'))) { throw 'Run from the project root.' }
$dest = Join-Path $root 'docs/agent-sources'
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$repos = @('obra/superpowers','anthropics/skills','affaan-m/ECC','nextlevelbuilder/ui-ux-pro-max-skill','vercel-labs/skills','hung-ngm/tu-vi-dau-so','duandigi/tu-vi-dau-so-research','nngocduong92/an_sao_tu_vi')
$records = @()
foreach ($repo in $repos) {
  $info = Invoke-RestMethod "https://api.github.com/repos/$repo"
  $commit = Invoke-RestMethod "https://api.github.com/repos/$repo/commits/$($info.default_branch)"
  $tree = Invoke-RestMethod "https://api.github.com/repos/$repo/git/trees/$($commit.sha)?recursive=1"
  $dir = Join-Path $dest ($repo -replace '/', '--')
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $paths = @($tree.tree | Where-Object type -eq 'blob' | ForEach-Object path)
  $paths | Set-Content -Encoding UTF8 (Join-Path $dir 'tree.txt')
  $readPaths = @($paths | Where-Object { $_ -match '^(README\.md|LICENSE[^/]*|COPYING[^/]*|\.codex/INSTALL\.md|docs/README\.codex\.md|package\.json)$' })
  foreach ($p in $readPaths) {
    $out = Join-Path $dir ($p -replace '/', '__')
    Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/$repo/$($commit.sha)/$p" -OutFile $out
  }
  $records += [pscustomobject]@{repo=$repo;commit=$commit.sha;pushed=$info.pushed_at;archived=$info.archived;license=$info.license.spdx_id;branch=$info.default_branch;truncated=$tree.truncated}
  Write-Output "$repo $($commit.sha) license=$($info.license.spdx_id) files=$($paths.Count)"
}
$records | ConvertTo-Json -Depth 5 | Set-Content -Encoding UTF8 (Join-Path $dest 'repositories.json')
