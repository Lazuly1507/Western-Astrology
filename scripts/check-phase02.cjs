const fs=require('node:fs'),path=require('node:path'),YAML=require('../.agent-setup/validator/node_modules/yaml');
const root=path.resolve(__dirname,'..');const failures=[];const skip=new Set(['archive','agent-sources','screenshots']);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?(skip.has(e.name)?[]:walk(path.join(dir,e.name))):[path.join(dir,e.name)]);}
const docs=walk(path.join(root,'docs')).filter(f=>f.endsWith('.md'));
let links=0;
for(const file of docs)for(const m of fs.readFileSync(file,'utf8').matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)){
 const link=m[1].replace(/^<|>$/g,'');if(/^(https?:|#|mailto:)/.test(link))continue;
 const target=path.resolve(path.dirname(file),decodeURIComponent(link.split('#')[0]));links++;
 if(!fs.existsSync(target))failures.push(path.relative(root,file)+': missing '+link);
}
const policy=[];
for(const dir of fs.readdirSync(path.join(root,'.agents/skills')).filter(s=>s.startsWith('tuvi-'))){const file=path.join(root,'.agents/skills',dir,'agents/openai.yaml');const p=YAML.parseDocument(fs.readFileSync(file,'utf8'),{uniqueKeys:true});if(p.errors.length||p.toJS()?.policy?.allow_implicit_invocation!==false)failures.push(dir+': expected explicit-only policy');policy.push(dir);}
const schema=JSON.parse(fs.readFileSync(path.join(root,'docs/architecture/chart.schema.json'),'utf8'));
if(schema.properties.systemId.const!=='western-astrology')failures.push('Active chart schema system mismatch');
const required=['product/PRD.md','product/brand-direction.md','product/decision-recommendations.md','design/constellation-experience.md','design/design-directions.md','design/design-system.md','astrology/domain-spec.md','astrology/engine-evaluation.md','astrology/calculation-rules.md','astrology/validation-plan.md','architecture/system-design.md','architecture/cost-estimates.md','research/competitor-analysis.md','roadmap.md','phase-02-report.md','western-astrology-scope-update.md'];
for(const f of required)if(!fs.existsSync(path.join(root,'docs',f)))failures.push('Missing deliverable '+f);
const output={date:'2026-10-21',check:'Local document links, deliverable presence, JSON parse/system identity and deprecated skill policies. Does not validate numerical engine or JSON schema semantics.',documents:docs.length,localLinks:links,explicitOnlyTuvi:policy,failures};
fs.writeFileSync(path.join(root,'docs/agent-checks/phase02-docs.json'),JSON.stringify(output,null,2)+'\n');console.log(JSON.stringify(output,null,2));process.exitCode=failures.length?1:0;
