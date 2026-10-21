const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const python = process.env.TUVI_PYTHON || path.join(process.env.LOCALAPPDATA, 'Python/pythoncore-3.15-64/python.exe');
if (!fs.existsSync(python)) throw new Error('Set TUVI_PYTHON to an existing Python 3 interpreter.');
const out = path.join(root, 'docs/agent-checks');
fs.mkdirSync(out, { recursive: true });
const scriptDir = '.agents/skills/ui-ux-pro-max/scripts';
const cases = [
  ['ui-data', [`${scriptDir}/validate_data.py`]],
  ['ui-design-smoke', [`${scriptDir}/search.py`, 'Vietnamese astrology cultural mobile', '--design-system', '--format', 'markdown']],
  ['ui-ux-smoke', [`${scriptDir}/search.py`, 'keyboard focus modal', '--domain', 'ux', '--json']],
  ...['core', 'design_system_mode', 'design_system_stack'].map(name => [`ui-test-${name}`, ['-m', 'unittest', 'discover', '-s', `${scriptDir}/tests`, '-p', `test_${name}.py`, '-v']]),
];
const results = [];
for (const [name, args] of cases) {
  const r = spawnSync(python, args, { cwd: root, encoding: 'utf8', windowsHide: true, timeout: 60000, maxBuffer: 8 * 1024 * 1024, env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1', PYTHONUTF8: '1' } });
  const text = (r.stdout || '') + (r.stderr || '') + (r.error ? `\n${r.error.message}\n` : '');
  fs.writeFileSync(path.join(out, `${name}.txt`), text);
  const count = text.match(/Ran (\d+) tests?/);
  results.push({ name, args, exitCode: r.status, error: r.error?.message || null, tests: count ? Number(count[1]) : null });
  console.log(`${name}: exit=${r.status}${count ? `, tests=${count[1]}` : ''}`);
}
fs.writeFileSync(path.join(out, 'ui-checks.json'), JSON.stringify({ python, results }, null, 2) + '\n');
process.exitCode = results.some(r => r.exitCode !== 0) ? 1 : 0;
