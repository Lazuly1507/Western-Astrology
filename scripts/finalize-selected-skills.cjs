// Assemble reviewed files locally. No network, upstream code execution or global writes.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const base = path.join(root, 'docs/agent-sources');
const records = JSON.parse(fs.readFileSync(path.join(base, 'repositories.json'), 'utf8').replace(/^\uFEFF/, ''));
const skills = path.join(root, '.agents/skills');
const source = repo => path.join(base, repo.replace('/', '--'));
function copy(from, to) {
  if (fs.statSync(from).isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const name of fs.readdirSync(from)) copy(path.join(from, name), path.join(to, name));
  } else {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    if (fs.existsSync(to)) {
      if (!fs.readFileSync(from).equals(fs.readFileSync(to))) throw new Error(`Refusing to overwrite ${to}`);
    } else fs.copyFileSync(from, to, fs.constants.COPYFILE_EXCL);
  }
}
const ui = path.join(skills, 'ui-ux-pro-max');
if (fs.existsSync(path.join(ui, 'LICENSE'))) throw new Error('Refusing to overwrite completed ui-ux-pro-max installation');
const uiSource = source('nextlevelbuilder/ui-ux-pro-max-skill');
copy(path.join(uiSource, 'review/.claude/skills/ui-ux-pro-max'), ui);
copy(path.join(uiSource, 'review/src/ui-ux-pro-max/scripts'), path.join(ui, 'scripts'));
copy(path.join(uiSource, 'LICENSE'), path.join(ui, 'LICENSE'));
let uiText = fs.readFileSync(path.join(ui, 'SKILL.md'), 'utf8');
uiText = uiText.replaceAll('${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max', '.agents/skills/ui-ux-pro-max');
uiText = uiText.replace(/^description:.*$/m, 'description: "Research UI and UX design choices using a local searchable dataset for web, mobile and desktop; use alongside tuvi-ui for this project."');
uiText = uiText.replace('The search script lives inside', 'Project adaptation: resolve the `.agents/skills/ui-ux-pro-max` paths below against the project root before running. On this Windows machine use the Python executable documented in AGENTS.md. No CLAUDE_PLUGIN_ROOT is required.\n\nThe search script lives inside');
fs.writeFileSync(path.join(ui, 'SKILL.md'), uiText);
for (const name of ['writing-plans', 'test-driven-development', 'systematic-debugging', 'verification-before-completion']) {
  const dir = path.join(skills, name);
  copy(path.join(source('obra/superpowers'), 'LICENSE'), path.join(dir, 'LICENSE'));
  let text = fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8');
  text = text.replaceAll('superpowers:test-driven-development', 'test-driven-development').replaceAll('superpowers:verification-before-completion', 'verification-before-completion');
  if (name === 'writing-plans') {
    text = text.replace(/^\*\*Context:\*\*.*$/m, '**Context:** Use the current workspace unless task isolation is actually required and authorized. No additional worktree skill is required.');
    text = text.replace(/^> \*\*For agentic workers:\*\*.*$/m, '> **For Codex:** Execute the plan task by task using the native workflow and project instructions. Steps use checkbox (`- [ ]`) syntax for tracking.');
    text = text.slice(0, text.indexOf('## Execution Handoff')) + '## Execution Handoff\n\nLink the self-reviewed plan. Continue already-authorized work in the native Codex workflow; ask only for unresolved scope decisions or approvals required by the user. This skill does not authorize application implementation during agent setup. No additional orchestration skill is required.\n';
    text = text.replace('DRY. YAGNI. TDD. Frequent commits.', 'DRY. YAGNI. TDD where appropriate. Commit only when requested.');
    text = text.replace('- "Commit" - step\n', '');
    const start = text.indexOf('- [ ] **Step 5: Commit**');
    const end = text.indexOf('\n````', start);
    if (start >= 0 && end >= 0) text = text.slice(0, start) + text.slice(end);
  }
  fs.writeFileSync(path.join(dir, 'SKILL.md'), text);
}
const domain = path.join(skills, 'tuvi-domain');
copy(path.join(source('duandigi/tu-vi-dau-so-research'), 'review/references/SOURCE_POLICY.md'), path.join(domain, 'references/source-policy.md'));
copy(path.join(source('duandigi/tu-vi-dau-so-research'), 'LICENSE'), path.join(domain, 'LICENSE.upstream'));
fs.appendFileSync(path.join(domain, 'references/source-policy.md'), '\n\n---\nSource: Duan Digi, tu-vi-dau-so-research, commit 91f8a06f1bca2fb271791785937265ea78d7f858, references/SOURCE_POLICY.md. MIT; see ../LICENSE.upstream. Used as source-research methodology; books named here have not been independently inspected during setup.\n');
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]); }
const installed = fs.readdirSync(skills).map(name => {
  const repo = name === 'ui-ux-pro-max' ? 'nextlevelbuilder/ui-ux-pro-max-skill' : name.startsWith('tuvi-') ? null : 'obra/superpowers';
  return { name, path: `.agents/skills/${name}`, repository: repo, commit: repo ? records.find(r => r.repo === repo).commit : null,
    license: repo ? 'MIT' : 'Project-authored; tuvi-domain reference separately MIT',
    files: files(path.join(skills, name)).filter(p => !p.includes('__pycache__')).map(p => ({ path: path.relative(root, p).replaceAll('\\', '/'), sha256: crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex') })) };
});
fs.writeFileSync(path.join(base, 'installed-skills.json'), JSON.stringify(installed, null, 2) + '\n');
console.log(`Assembled ${installed.length} skills; generated file checksums.`);
