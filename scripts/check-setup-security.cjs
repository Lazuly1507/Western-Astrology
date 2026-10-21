// High-confidence local scan only; print file paths, never candidate secret values.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const patterns = {
  privateKey: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  githubToken: /\b(?:ghp_|github_pat_)[A-Za-z0-9_]{30,}\b/,
  awsAccessId: /\bAKIA[A-Z0-9]{16}\b/,
  openaiKey: /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{45,}\b/,
};
const hits = [];
let scanned = 0;
function visit(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '__pycache__'].includes(e.name)) continue;
    const file = path.join(dir, e.name);
    if (e.isDirectory()) visit(file);
    else if (/\.(md|txt|json|toml|yaml|yml|cjs|js|py|ps1|sh)$/.test(e.name)) {
      const text = fs.readFileSync(file, 'utf8');
      scanned++;
      for (const [type, pattern] of Object.entries(patterns)) if (pattern.test(text)) hits.push({ path: path.relative(root, file).replaceAll('\\', '/'), type });
    }
  }
}
visit(root);
const result = { scope: 'Workspace text artifacts, excluding node_modules, .git and Python caches; no global credential files read', scannedFiles: scanned, candidateSecrets: hits, limitations: 'Pattern scan is not an exhaustive DLP audit; synthetic inputs only in authored walkthroughs. Candidate values are never printed.' };
fs.writeFileSync(path.join(root, 'docs/agent-checks/security.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
process.exitCode = hits.length ? 1 : 0;
