const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const YAML = require('../.agent-setup/validator/node_modules/yaml');
const root = path.resolve(__dirname, '..');
const base = path.join(root, '.agents/skills');
const failures = [];
const names = new Set();
const results = [];
for (const dir of fs.readdirSync(base)) {
  const file = path.join(base, dir, 'SKILL.md');
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
  if (!match) { failures.push(`${dir}: missing frontmatter/body`); continue; }
  const doc = YAML.parseDocument(match[1], { uniqueKeys: true });
  if (doc.errors.length) { failures.push(`${dir}: ${doc.errors}`); continue; }
  const data = doc.toJS();
  if (data.name !== dir || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.name) || data.name.length > 64) failures.push(`${dir}: invalid name`);
  if (names.has(data.name)) failures.push(`${dir}: duplicate name`);
  names.add(data.name);
  if (typeof data.description !== 'string' || !data.description.trim() || data.description.length > 1024) failures.push(`${dir}: invalid description`);
  if (/\$\{CLAUDE_PLUGIN_ROOT\}/.test(text)) failures.push(`${dir}: unresolved Claude path`);
  if (/TODO|\[INSERT|\[Add your instructions/.test(text)) failures.push(`${dir}: unfinished scaffold`);
  for (const link of text.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(https?:|#)/.test(link[1])) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), link[1].split('#')[0]))) failures.push(`${dir}: missing link ${link[1]}`);
  }
  results.push({ name: dir, yaml: 'valid', descriptionLength: data.description.length });
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/agent-sources/installed-skills.json'), 'utf8'));
let verifiedFiles = 0;
for (const skill of manifest) for (const file of skill.files) {
  const absolute = path.resolve(root, file.path);
  if (!absolute.startsWith(base + path.sep)) { failures.push(`Manifest path outside skills: ${file.path}`); continue; }
  const hash = crypto.createHash('sha256').update(fs.readFileSync(absolute)).digest('hex');
  if (hash !== file.sha256) failures.push(`Checksum mismatch: ${file.path}`);
  verifiedFiles++;
}
const output = { check: 'YAML parser, metadata, local entrypoint links, placeholders and installed file checksums', results, verifiedFiles, failures };
fs.mkdirSync(path.join(root, 'docs/agent-checks'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/agent-checks/validation.json'), JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify({ skills: results.length, verifiedFiles, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
