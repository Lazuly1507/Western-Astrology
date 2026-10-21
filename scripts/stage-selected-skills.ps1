$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$records = Get-Content -Raw 'docs/agent-sources/repositories.json' | ConvertFrom-Json
foreach ($rec in $records) {
  $dir = Join-Path $root ('docs/agent-sources/' + ($rec.repo -replace '/', '--'))
  $paths = Get-Content (Join-Path $dir 'tree.txt')
  $selected = @()
  switch ($rec.repo) {
    'obra/superpowers' { $selected = @($paths | Where-Object { $_ -match '^skills/(writing-plans|test-driven-development|systematic-debugging|verification-before-completion)/' -and $_ -notmatch 'CREATION-LOG|test-pressure|test-academic|\.sh$' }) }
    'nextlevelbuilder/ui-ux-pro-max-skill' { $selected = @($paths | Where-Object { $_ -match '^\.claude/skills/ui-ux-pro-max/(SKILL\.md|references/|scripts/[^/]+\.py$|data/)' }) }
    'duandigi/tu-vi-dau-so-research' { $selected = @($paths | Where-Object { $_ -match '(SKILL\.md$|references/.*\.md$|requirements.*txt$|scripts/validate_skill.py$)' }) }
    'hung-ngm/tu-vi-dau-so' { $selected = @($paths | Where-Object { $_ -match 'SKILL\.md$|references/computation.md$' }) }
    'nngocduong92/an_sao_tu_vi' { $selected = @($paths | Where-Object { $_ -match 'requirements.txt$|am_lich.py$|an_sao.py$' }) }
    'anthropics/skills' { $selected = @($paths | Where-Object { $_ -match '^skills/(webapp-testing|skill-creator)/(SKILL.md|LICENSE.txt)$' }) }
    'affaan-m/ECC' { $selected = @($paths | Where-Object { $_ -match '^(\.codex/README.md|\.codex/config.toml|skills/security-review/SKILL.md)$' }) }
    'vercel-labs/skills' { $selected = @($paths | Where-Object { $_ -match '^skills/find-skills/SKILL.md$' }) }
  }
  foreach ($p in $selected) {
    $out = Join-Path $dir ('review/' + $p)
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $out) | Out-Null
    Invoke-WebRequest -UseBasicParsing "https://raw.githubusercontent.com/$($rec.repo)/$($rec.commit)/$p" -OutFile $out
  }
  Write-Output "$($rec.repo) staged $($selected.Count) files; no upstream code executed"
}
