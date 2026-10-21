// Read-only local protocol check: never starts a model turn or writes config.
const fs = require('node:fs');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');
const readline = require('node:readline');
const root = path.resolve(__dirname, '..');
const cli = process.env.CODEX_CLI_JS || path.join(process.env.APPDATA, 'npm/node_modules/@openai/codex/bin/codex.js');
if (!fs.existsSync(cli)) throw new Error('Set CODEX_CLI_JS to the installed Codex CLI JS launcher.');
const version = spawnSync(process.execPath, [cli, '--version'], { encoding: 'utf8', windowsHide: true, timeout: 10000 });
if (version.status !== 0) throw new Error('Could not read installed Codex CLI version.');
const proc = spawn(process.execPath, [cli, 'app-server', '--listen', 'stdio://'], { cwd: root, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
let done = false;
let diagnostics = '';
proc.stderr.on('data', b => { diagnostics += b.toString(); });
const timer = setTimeout(() => finish(new Error('Local skills/list timed out after 45 seconds')), 45000);
function send(message) { proc.stdin.write(JSON.stringify(message) + '\n'); }
function finish(error) {
  if (done) return;
  done = true;
  clearTimeout(timer);
  proc.stdin.end();
  proc.kill();
  if (error) { console.error(error.message); process.exitCode = 1; }
}
proc.on('error', finish);
proc.on('exit', code => { if (!done) finish(new Error(`App-server exited early: ${code}; ${diagnostics.slice(0, 300)}`)); });
readline.createInterface({ input: proc.stdout }).on('line', line => {
  try {
    const msg = JSON.parse(line);
    if (msg.error) return finish(new Error(JSON.stringify(msg.error)));
    if (msg.id === 1) {
      send({ method: 'initialized', params: {} });
      send({ id: 2, method: 'skills/list', params: { cwds: [root], forceReload: true } });
    }
    if (msg.id === 2) {
      const expected = fs.readdirSync(path.join(root, '.agents/skills'));
      const entries = msg.result.data;
      const all = entries.flatMap(e => e.skills || []);
      const local = all.filter(s => path.resolve(s.path).toLowerCase().startsWith(path.join(root, '.agents/skills').toLowerCase() + path.sep));
      const missing = expected.filter(name => !local.some(s => s.name === name && s.enabled !== false));
      const duplicates = [...new Set(all.map(s => s.name))].filter(name => all.filter(s => s.name === name).length > 1);
      const errors = entries.flatMap(e => e.errors || []);
      const result = { cliVersion: version.stdout.trim(), check: 'local app-server skills/list; no model turn', cwd: root, expected, local, missing, duplicates, errors };
      fs.mkdirSync(path.join(root, 'docs/agent-checks'), { recursive: true });
      fs.writeFileSync(path.join(root, 'docs/agent-checks/codex-discovery.json'), JSON.stringify(result, null, 2) + '\n');
      console.log(JSON.stringify({ discovered: local.length, expected: expected.length, missing, duplicates, errors }, null, 2));
      finish(missing.length || errors.length ? new Error('Discovery check has missing skills or parse errors') : null);
    }
  } catch (error) { finish(error); }
});
send({ id: 1, method: 'initialize', params: { clientInfo: { name: 'tuvi_setup_check', title: 'Tu Vi local skills check', version: '1.0.0' } } });
