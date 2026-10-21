'use strict';
// Isolated design prototype. No engine, provider, storage, analytics or network requests.
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const concepts = {a:'A / Eastern Luxury',b:'B / Modern Minimal',c:'C / AI Cosmic'};
const screenNames = {home:'Tổng quan',form:'Lập lá số',chart:'Lá số 12 cung',chat:'Đối thoại AI',library:'Quản lý lá số',premium:'Premium',admin:'Admin mẫu'};
const params = new URLSearchParams(location.search);
function setConcept(key) {
  if (!concepts[key]) return;
  document.documentElement.dataset.concept = key;
  $$('.concepts button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.concept === key)));
  $('#concept-caption').textContent = concepts[key];
}
setConcept(params.get('concept') || 'b');
$$('.concepts button').forEach(button => button.addEventListener('click', () => setConcept(button.dataset.concept)));
function route(focus = true) {
  const requested = location.hash.slice(1) || 'home';
  const page = Object.hasOwn(screenNames, requested) ? requested : 'home';
  $$('.screen').forEach(screen => { screen.hidden = screen.id !== page; });
  $$('[data-nav]').forEach(link => { if (link.dataset.nav === page) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current'); });
  $('#breadcrumb').textContent = `Không gian / ${screenNames[page]}`;
  document.title = `${screenNames[page]} — TUVI STUDIO · Prototype`;
  if (focus) $('#main').focus({preventScroll:true});
}
window.addEventListener('hashchange', () => route());
route(false);
$('.skip').addEventListener('click',e=>{e.preventDefault();$('#main').focus();});
$('#viewport').addEventListener('click', () => { const active = $('#app').classList.toggle('phone-preview'); $('#viewport').setAttribute('aria-pressed',String(active)); $('#viewport').textContent = active ? 'Khung máy tính' : 'Khung điện thoại'; });
if (params.get('viewport') === 'mobile') $('#viewport').click();
function notice(text) { const toast = $('#toast'); toast.textContent = text; toast.hidden = false; clearTimeout(notice.timer); notice.timer = setTimeout(() => {toast.hidden=true;},5000); }
$$('input[name=calendar]').forEach(input => input.addEventListener('change', () => { $('#leap-wrap').hidden = input.value !== 'lunar'; $('#form-error').hidden = true; }));
$('#unknown-time').addEventListener('change', e => { $('#time').disabled = e.target.checked; });
$('#birth-form').addEventListener('submit', e => {
  e.preventDefault();
  const day=Number($('#day').value), month=Number($('#month').value), year=Number($('#year').value);
  const solar=$('input[name=calendar]:checked').value==='solar';
  let error='';
  if (![day,month,year].every(Number.isInteger)||year<1900||year>2099||month<1||month>12||day<1||day>(solar?31:30)) error='Kiểm tra ngày, tháng và năm. Bản mẫu nhận năm 1900–2099.';
  else if (solar) { const date=new Date(Date.UTC(year,month-1,day)); if (date.getUTCMonth()!==month-1||date.getUTCDate()!==day) error='Ngày dương lịch không tồn tại. Vui lòng kiểm tra lại.'; }
  if (!error && (!$('#time').value || $('#unknown-time').checked)) error='Chưa đủ giờ sinh để lập lá số đầy đủ. Bạn vẫn có thể mở “Lá số 12 cung” trong menu để xem mẫu có sẵn.';
  if (!error && !$('#timezone').value) error='Cần xác định múi giờ trước khi lập lá số. Prototype chưa tự xác định nơi sinh.';
  $('#form-error').hidden=!error;
  $('#form-error').textContent=error;
  if (error) { $('#form-error').focus(); return; }
  location.hash='chart';
  notice('Đã mở mẫu có sẵn. Lá số này không được tính từ dữ liệu bạn nhập.');
});
// Conventional display branch positions only; role and star assignments are invented UI fixtures.
const palaces = [
  ['ty','Tỵ','Mệnh','Tử Vi · Thiên Phủ',1,1],['ngo','Ngọ','Phụ Mẫu','Thái Dương',1,2],['mui','Mùi','Phúc Đức','Thiên Đồng',1,3],['than','Thân','Điền Trạch','Vũ Khúc',1,4],
  ['thin','Thìn','Huynh Đệ','Thiên Cơ',2,1],['dau','Dậu','Quan Lộc','Thiên Tướng',2,4],['mao','Mão','Phu Thê','Thái Âm',3,1],['tuat','Tuất','Nô Bộc','Thiên Lương',3,4],
  ['dan','Dần','Tử Tức','Liêm Trinh',4,1],['suu','Sửu','Tài Bạch','Tham Lang',4,2],['ti','Tý','Tật Ách','Cự Môn',4,3],['hoi','Hợi','Thiên Di','Thất Sát',4,4]
];
const grid=$('#palace-grid');
let selected=palaces[0][0];
function selectPalace(id) {
  const palace=palaces.find(p=>p[0]===id);
  if(!palace) return;
  selected=id;
  $$('.palace').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.id===id)));
  const detail=$('#palace-detail');
  detail.replaceChildren();
  const eyebrow=document.createElement('div');eyebrow.className='eyebrow';eyebrow.textContent=`ĐỊA CHI ${palace[1].toLocaleUpperCase('vi')} · MẪU UI`;
  const heading=document.createElement('h2');heading.textContent=`Cung ${palace[2]}`;
  const stars=document.createElement('p');stars.textContent=`Tên sao minh họa: ${palace[3]}.`;
  const desc=document.createElement('p');desc.textContent='Đây là vị trí được chọn trong dữ liệu thiết kế giả. Không suy ra tính cách, vận hạn hay sự kiện từ mẫu này.';
  const note=document.createElement('p');note.className='notice';note.textContent='Trong sản phẩm chính thức, thông tin tại đây đến từ engine có phiên bản và quy tắc đã duyệt.';
  const link=document.createElement('a');link.href='#chat';link.className='primary';link.textContent='Hỏi AI về dữ kiện này →';
  link.addEventListener('click',()=>{$('#question').value=`Giải thích cung ${palace[2]}`;});
  detail.append(eyebrow,heading,stars,desc,note,link);
}
palaces.forEach(([id,branch,role,stars,row,col])=>{
  const button=document.createElement('button');button.type='button';button.className='palace';button.dataset.id=id;button.style.gridRow=String(row);button.style.gridColumn=String(col);button.setAttribute('aria-label',`${branch}, cung ${role}, sao minh họa ${stars}`);
  for(const [tag,cls,text]of[['span','',branch.toLocaleUpperCase('vi')],['strong','',role.toLocaleUpperCase('vi')],['span','stars',stars],['span','minor','Dữ liệu minh họa']]){const node=document.createElement(tag);node.className=cls;node.textContent=text;button.append(node);}
  button.addEventListener('click',()=>selectPalace(id));grid.append(button);
});
selectPalace(selected);
function listMode(active){grid.classList.toggle('list',active);$('#list-mode').setAttribute('aria-pressed',String(active));$('#grid-mode').setAttribute('aria-pressed',String(!active));$('#zoom-in').disabled=active;$('#zoom-out').disabled=active;grid.style.width='100%';zoom=100;$('#zoom-level').textContent='100%';}
$('#list-mode').addEventListener('click',()=>listMode(true));$('#grid-mode').addEventListener('click',()=>listMode(false));
let zoom=100;
function setZoom(delta){zoom=Math.max(100,Math.min(180,zoom+delta));grid.style.width=`${zoom}%`;$('#zoom-level').textContent=`${zoom}%`;}
$('#zoom-in').addEventListener('click',()=>setZoom(20));$('#zoom-out').addEventListener('click',()=>setZoom(-20));
function appendMessage(role,text){const article=document.createElement('article');article.className=`message ${role}`;const label=document.createElement('span');label.className='message-label';label.textContent=role==='user'?'BẠN':'TUVI STUDIO · PHẢN HỒI MẪU';const p=document.createElement('p');p.textContent=text;article.append(label,p);$('#messages').append(article);return article;}
function sendQuestion(){const question=$('#question').value.trim();if(!question){notice('Nhập câu hỏi hoặc chọn một gợi ý.');return;}
  appendMessage('user',question);
  const timing=/năm|vận|tương lai|hạn/i.test(question);
  const text=timing?'Mẫu này chưa có đại hạn, tiểu hạn hoặc lưu niên đã tính. Tôi không có dữ liệu để luận thời điểm. Khi có lá số hợp lệ, câu trả lời sẽ chỉ dùng các chu kỳ thực sự tồn tại.':'Trong mẫu thiết kế, cung được chọn chỉ có dữ liệu UI tổng hợp. Tôi có thể chỉ ra vị trí trên bàn, nhưng chưa thể luận giải vì không có lá số đã tính và nguồn quy tắc được duyệt.';
  const reply=appendMessage('assistant',text);const link=document.createElement('a');link.href='#chart';link.textContent='Xem lại dữ kiện minh họa →';reply.append(link);$('#question').value='';$('#messages').scrollTop=$('#messages').scrollHeight;
}
$('#chat-form').addEventListener('submit',e=>{e.preventDefault();sendQuestion();});
$$('[data-prompt]').forEach(button=>button.addEventListener('click',()=>{$('#question').value=button.dataset.prompt;sendQuestion();}));
$('#remove-demo').addEventListener('click',()=>{$('#second-profile').hidden=true;$('#library-count').textContent='1 / 3 hồ sơ mẫu';notice('Đã ẩn dữ liệu mẫu trong phiên. Tải lại trang để phục hồi.');});
$('#try-plus').addEventListener('click',()=>{$('#premium-status').textContent='Plus minh họa: 60 lượt chat, 2 báo cáo, 30 ngày; không thu tiền hoặc kích hoạt gói thật.';});
$('#pause-ai').addEventListener('click',e=>{const paused=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.textContent=paused?'Tiếp tục AI mẫu':'Tạm dừng AI mẫu';$('#admin-ai-state').textContent=paused?'PAUSED':'MOCK';});
